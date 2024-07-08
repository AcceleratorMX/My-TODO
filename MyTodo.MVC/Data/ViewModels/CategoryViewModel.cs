using MyTodo.MVC.Data.Models;
using MyTodo.MVC.Repositories.Abstract;

namespace MyTodo.MVC.Data.ViewModels;

public class CategoryViewModel
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int JobId { get; set; }
    public Job? Job { get; set; }
    public StorageTypes CurrentStorageType { get; set; }
    public IEnumerable<Category> Categories { get; set; } = new List<Category>();
}