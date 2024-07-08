using MyTodo.MVC.Data.Models;
using MyTodo.MVC.Repositories.Abstract;

namespace MyTodo.MVC.Data.ViewModels;

public class TodoViewModel
{
    public Job Job { get; set; } = null!;
    public IEnumerable<Job> Jobs { get; set; } = new List<Job>();
    public RepositoryTypes CurrentRepositoryType { get; set; }
}