using GraphQL.Types;

namespace MyTodo.MVC.GraphQL.Types;

public sealed class CategoryInputType : InputObjectGraphType
{
    public CategoryInputType()
    {
        Field<IntGraphType>("id");
        Field<StringGraphType>("name");
    }
}