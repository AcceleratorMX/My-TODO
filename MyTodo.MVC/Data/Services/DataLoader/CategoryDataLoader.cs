using MyTodo.MVC.Data.Models;
using MyTodo.MVC.Data.Services.DataLoader.Abstract;
using MyTodo.MVC.Repositories.Abstract;

namespace MyTodo.MVC.Data.Services.DataLoader;

public class CategoryDataLoader(IRepositorySwitcher<Category, int> categoryRepository)
    : ICustomDataLoader<int, Category>
{
    public async Task<IDictionary<int, Category>> LoadAsync(IEnumerable<int> keys)
    {
        return (await categoryRepository.CurrentStorage.GetAllAsync())
            .Where(c => keys.Contains(c.Id)).ToDictionary(c => c.Id);
    }
}