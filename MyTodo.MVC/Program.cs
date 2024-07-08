using GraphQL;
using GraphQL.DataLoader;
using GraphQL.MicrosoftDI;
using GraphQL.Server.Ui.Altair;
using GraphQL.Types;
using MyTodo.MVC.Data.Models;
using MyTodo.MVC.Data.Services;
using MyTodo.MVC.Data.Services.DataLoader;
using MyTodo.MVC.Data.Services.DataLoader.Abstract;
using MyTodo.MVC.GraphQL.Mutations;
using MyTodo.MVC.GraphQL.Queries;
using MyTodo.MVC.GraphQL.Schemas;
using MyTodo.MVC.Repositories;
using MyTodo.MVC.Repositories.Abstract;
using MyTodo.MVC.Repositories.Sql;
using MyTodo.MVC.Repositories.Xml;
using Path = System.IO.Path;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
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

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseWebSockets();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Todo}/{action=Todo}/{id?}");

app.UseGraphQL<ISchema>();
app.UseGraphQLAltair(new AltairOptions().GraphQLEndPoint = "/altair");

app.Run();