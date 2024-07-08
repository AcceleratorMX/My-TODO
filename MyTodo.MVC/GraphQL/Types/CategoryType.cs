using GraphQL.Types;
using MyTodo.MVC.Data.Models;

namespace MyTodo.MVC.GraphQL.Types;

public sealed class CategoryType : ObjectGraphType<Category>
{
    public CategoryType()
    {
        Field(c => c.Id);
        Field(c => c.Name);
    }
}
