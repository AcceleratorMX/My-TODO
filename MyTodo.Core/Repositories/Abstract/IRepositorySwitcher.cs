namespace MyTodo.Core.Repositories.Abstract;

public interface IRepositorySwitcher<T, TId> where T : class
{
    IRepository<T, TId> CurrentStorage { get; }
    void SwitchToSql();
    void SwitchToXml();
    StorageTypes GetStorageType();
}