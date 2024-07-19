using GraphQL.Types;

namespace MyTodo.Core.GraphQL.Types;

public sealed class CategoryInputType : InputObjectGraphType
{
    public CategoryInputType()
    {
        Field<IntGraphType>("id");
        Field<StringGraphType>("name");
    }
}