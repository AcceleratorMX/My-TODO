using MyTodo.Core.Data.Models;
using MyTodo.Core.Data.Services.DataLoader.Abstract;
using MyTodo.Core.Repositories.Abstract;

namespace MyTodo.Core.Data.Services.DataLoader;

public class CategoryDataLoader(IRepositorySwitcher<Category, int> categoryRepository)
    : ICustomDataLoader<int, Category>
{
    public async Task<IDictionary<int, Category>> LoadAsync(IEnumerable<int> keys)
    {
        return (await categoryRepository.CurrentStorage.GetAllAsync())
            .Where(c => keys.Contains(c.Id)).ToDictionary(c => c.Id);
    }
}