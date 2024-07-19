using GraphQL.Types;
using MyTodo.Core.Data.Models;

namespace MyTodo.Core.GraphQL.Types;

public sealed class CategoryType : ObjectGraphType<Category>
{
    public CategoryType()
    {
        Field(c => c.Id);
        Field(c => c.Name);
    }
}
