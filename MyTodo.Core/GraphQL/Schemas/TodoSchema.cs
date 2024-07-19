using GraphQL.Types;
using MyTodo.Core.GraphQL.Mutations;
using MyTodo.Core.GraphQL.Queries;

namespace MyTodo.Core.GraphQL.Schemas;

public class TodoSchema : Schema
{
    public TodoSchema(IServiceProvider provider) : base(provider)
    {
        Query = provider.GetRequiredService<RootQuery>();
        Mutation = provider.GetRequiredService<RootMutation>();
    }
}