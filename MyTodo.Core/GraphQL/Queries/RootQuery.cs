using GraphQL;
using GraphQL.Types;
using MyTodo.Core.Data.Models;
using MyTodo.Core.GraphQL.Types;
using MyTodo.Core.Repositories.Abstract;

namespace MyTodo.Core.GraphQL.Queries;

public sealed class RootQuery : ObjectGraphType
{
    public RootQuery(
        IRepositorySwitcher<Job, int> jobRepository,
        IRepositorySwitcher<Category, int> categoryRepository)
    {
        Field<ListGraphType<JobType>>("jobs")
            .ResolveAsync(async context => await jobRepository.CurrentStorage.GetAllAsync());

        Field<JobType>("job")
            .Arguments(new QueryArguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }))
            .ResolveAsync(async context =>
            {
                var id = context.GetArgument<int>("id");
                return await jobRepository.CurrentStorage.GetByIdAsync(id);
            });

        Field<ListGraphType<CategoryType>>("categories")
            .ResolveAsync(async context => await categoryRepository.CurrentStorage.GetAllAsync());

        Field<CategoryType>("category")
            .Arguments(new QueryArguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }))
            .ResolveAsync(async context =>
            {
                var id = context.GetArgument<int>("id");
                return await categoryRepository.CurrentStorage.GetByIdAsync(id);
            });
    }
}