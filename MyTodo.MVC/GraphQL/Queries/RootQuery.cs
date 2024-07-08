using GraphQL;
using GraphQL.Types;
using MyTodo.MVC.Data.Models;
using MyTodo.MVC.GraphQL.Types;
using MyTodo.MVC.Repositories.Abstract;

namespace MyTodo.MVC.GraphQL.Queries;

public sealed class RootQuery : ObjectGraphType
{
    public RootQuery(
        IRepositorySwitcher<Job, int> jobRepository,
        IRepositorySwitcher<Category, int> categoryRepository)
    {
        Field<ListGraphType<JobType>>("jobs")
            .ResolveAsync(async context => await jobRepository.CurrentRepository.GetAllAsync());

        Field<JobType>("job")
            .Arguments(new QueryArguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }))
            .ResolveAsync(async context =>
            {
                var id = context.GetArgument<int>("id");
                return await jobRepository.CurrentRepository.GetByIdAsync(id);
            });

        Field<ListGraphType<CategoryType>>("categories")
            .ResolveAsync(async context => await categoryRepository.CurrentRepository.GetAllAsync());

        Field<CategoryType>("category")
            .Arguments(new QueryArguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }))
            .ResolveAsync(async context =>
            {
                var id = context.GetArgument<int>("id");
                return await categoryRepository.CurrentRepository.GetByIdAsync(id);
            });
    }
}