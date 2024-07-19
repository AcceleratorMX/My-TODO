using GraphQL;
using GraphQL.Types;
using MyTodo.Core.Data.Models;
using MyTodo.Core.GraphQL.Types;
using MyTodo.Core.Repositories.Abstract;

namespace MyTodo.Core.GraphQL.Mutations;

public sealed class RootMutation : ObjectGraphType
{
    public RootMutation(
        IRepositorySwitcher<Job, int> job,
        IRepositorySwitcher<Category, int> category)
    {
        Field<JobType>("createJob")
            .Arguments(new QueryArguments(
                new QueryArgument<NonNullGraphType<JobInputType>> { Name = "job" }))
            .ResolveAsync(async context =>
            {
                var newJob = context.GetArgument<Job>("job");
                await job.CurrentStorage.CreateAsync(newJob);
                return newJob;
            });

        Field<JobType>("changeProgress")
            .Arguments(new QueryArguments(
                new QueryArgument<IntGraphType> { Name = "id" },
                new QueryArgument<BooleanGraphType> { Name = "isDone" }))
            .ResolveAsync(async context =>
            {
                var id = context.GetArgument<int>("id");
                var isDone = context.GetArgument<bool>("isDone");

                var jobToUpdate = await job.CurrentStorage.GetByIdAsync(id);
                jobToUpdate.IsDone = isDone;
                await job.CurrentStorage.UpdateAsync(jobToUpdate);

                return jobToUpdate;
            });

        Field<StringGraphType>("deleteJob")
            .Arguments(new QueryArguments(
                new QueryArgument<IntGraphType> { Name = "id" }))
            .ResolveAsync(async context =>
            {
                var id = context.GetArgument<int>("id");
                await job.CurrentStorage.DeleteAsync(id);
                return $"Job with id {id} successfully deleted";
            });

        Field<CategoryType>("createCategory")
            .Arguments(new QueryArguments(
                new QueryArgument<CategoryInputType> { Name = "category" }))
            .ResolveAsync(async context =>
            {
                var newCategory = context.GetArgument<Category>("category");
                await category.CurrentStorage.CreateAsync(newCategory);
                return newCategory;
            });

        Field<StringGraphType>("deleteCategory")
            .Arguments(new QueryArguments(
                new QueryArgument<IntGraphType> { Name = "id" }))
            .ResolveAsync(async context =>
            {
                var id = context.GetArgument<int>("id");
                await category.CurrentStorage.DeleteAsync(id);
                return $"Category with id {id} successfully deleted";
            });
    }
}