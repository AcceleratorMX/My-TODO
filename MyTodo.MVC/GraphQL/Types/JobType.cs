using GraphQL.DataLoader;
using GraphQL.Types;
using MyTodo.MVC.Data.Models;
using MyTodo.MVC.Data.Services.DataLoader.Abstract;

namespace MyTodo.MVC.GraphQL.Types;

public sealed class JobType : ObjectGraphType<Job>
{
    public JobType(IDataLoaderContextAccessor accessor,
        ICustomDataLoader<int, Category> dataLoader)
    {
        Field(j => j.Id);
        Field(j => j.Name);
        Field(j => j.Deadline, nullable: true);
        Field(j => j.IsDone);
        Field(j => j.CategoryId, nullable: true);

        Field<CategoryType, Category>("category")
            .ResolveAsync(context => accessor.Context!
                .GetOrAddBatchLoader<int, Category>("GetCategoriesById", async keys => 
                    await dataLoader.LoadAsync(keys)).LoadAsync(context.Source.CategoryId));
    }
}