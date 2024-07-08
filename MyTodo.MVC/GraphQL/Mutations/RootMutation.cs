using GraphQL;
using GraphQL.Types;
using MyTodo.MVC.Data.Models;
using MyTodo.MVC.GraphQL.Types;
using MyTodo.MVC.Repositories.Abstract;

namespace MyTodo.MVC.GraphQL.Mutations;

public sealed class RootMutation : ObjectGraphType
{
    public RootMutation(
        IRepositorySwitcher<Job, int> job,
        IRepositorySwitcher<Category, int> category)
    {
        Field<StringGraphType>("createJob")
            .Arguments(new QueryArguments(
                new QueryArgument<JobInputType> { Name = "job" }))
            .ResolveAsync(async context =>
            {
                var newJob = context.GetArgument<Job>("job");
                await job.CurrentStorage.CreateAsync(newJob);
                return $"{newJob.Name} successfully created";
            });

        Field<StringGraphType>("changeProgress")
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

                return $"Progress of job with id {id} successfully changed";
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

        Field<StringGraphType>("createCategory")
            .Arguments(new QueryArguments(
                new QueryArgument<CategoryInputType> { Name = "category" }))
            .ResolveAsync(async context =>
            {
                var newCategory = context.GetArgument<Category>("category");
                await category.CurrentStorage.CreateAsync(newCategory);
                return $"{newCategory.Name} successfully created";
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