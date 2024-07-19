using GraphQL;
using GraphQL.DataLoader;
using GraphQL.MicrosoftDI;
using GraphQL.Server.Ui.Altair;
using GraphQL.Types;
using MyTodo.Core.Data.Models;
using MyTodo.Core.Data.Services;
using MyTodo.Core.Data.Services.DataLoader;
using MyTodo.Core.Data.Services.DataLoader.Abstract;
using MyTodo.Core.GraphQL.Mutations;
using MyTodo.Core.GraphQL.Queries;
using MyTodo.Core.GraphQL.Schemas;
using MyTodo.Core.Repositories;
using MyTodo.Core.Repositories.Abstract;
using MyTodo.Core.Repositories.Sql;
using MyTodo.Core.Repositories.Xml;
using Path = System.IO.Path;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();

builder.Services.AddTransient<JobRepositorySql>();
builder.Services.AddTransient<JobRepositoryXml>();
builder.Services.AddTransient<CategoryRepositorySql>();
builder.Services.AddTransient<CategoryRepositoryXml>();


builder.Services.AddSingleton<IRepositorySwitcher<Job, int>>(s => new StorageSwitcher<Job, int>(
    s.GetRequiredService<JobRepositorySql>(),
    s.GetRequiredService<JobRepositoryXml>(),
    s.GetRequiredService<IHttpContextAccessor>()
));

builder.Services.AddSingleton<IRepositorySwitcher<Category, int>>(s => new StorageSwitcher<Category, int>(
    s.GetRequiredService<CategoryRepositorySql>(),
    s.GetRequiredService<CategoryRepositoryXml>(),
    s.GetRequiredService<IHttpContextAccessor>()
));

builder.Services.AddSingleton<ICustomDataLoader<int, Category>, CategoryDataLoader>();
builder.Services.AddSingleton<IDataLoaderContextAccessor, DataLoaderContextAccessor>();
builder.Services.AddSingleton<DataLoaderDocumentListener>();

builder.Services.AddSingleton<ISchema, TodoSchema>(services =>
    new TodoSchema(new SelfActivatingServiceProvider(services)));
builder.Services.AddTransient<RootQuery>();
builder.Services.AddTransient<RootMutation>();

builder.Services.AddGraphQL(options =>
{
    options.AddAutoSchema<ISchema>()
        .AddSystemTextJson()
        .AddDataLoader();
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                       throw new Exception("Connection string is not valid!");
var databaseService = new DatabaseService(connectionString);
builder.Services.AddSingleton(databaseService);

var xmlFilesDirectory = Path.Combine(
    Directory.GetCurrentDirectory(), builder.Configuration.GetValue<string>("XmlFilesDirectory") ??
                                     throw new Exception("XmlFilesDirectory is not valid!"));
builder.Services.AddSingleton(new XmlStorageService(xmlFilesDirectory));

builder.Services.AddLogging(config =>
{
    config.ClearProviders();
    config.AddConsole();
    config.AddDebug();
});

var reactClientApi = builder.Configuration["AllowedOrigins"] 
                     ?? throw new Exception("AllowedOrigins is not valid!");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", conf =>
    {
        conf.WithOrigins(reactClientApi)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseWebSockets();

app.UseGraphQL<ISchema>();
app.UseGraphQLAltair(new AltairOptions().GraphQLEndPoint = "/altair");

app.Run();