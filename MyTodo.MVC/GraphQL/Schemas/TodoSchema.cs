using GraphQL.Types;
using MyTodo.MVC.GraphQL.Mutations;
using MyTodo.MVC.GraphQL.Queries;

namespace MyTodo.MVC.GraphQL.Schemas;

public class TodoSchema : Schema
{
    public TodoSchema(IServiceProvider provider) : base(provider)
    {
        Query = provider.GetRequiredService<RootQuery>();
        Mutation = provider.GetRequiredService<RootMutation>();
    }
}