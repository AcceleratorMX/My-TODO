using GraphQL.Types;

namespace MyTodo.MVC.GraphQL.Types;

public sealed class JobInputType : InputObjectGraphType
{
    public JobInputType()
    {
        Field<IntGraphType>("id");
        Field<StringGraphType>("name");
        Field<IntGraphType>("categoryId");
        Field<DateTimeGraphType>("deadline");
        Field<BooleanGraphType>("isDone");
    }
}