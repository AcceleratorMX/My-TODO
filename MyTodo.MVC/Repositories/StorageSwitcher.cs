using MyTodo.MVC.Repositories.Abstract;

namespace MyTodo.MVC.Repositories;

public class StorageSwitcher<T, TId>(
    IRepository<T, TId> sql,
    IRepository<T, TId> xml,
    IHttpContextAccessor httpContextAccessor)
    : IRepositorySwitcher<T, TId>
    where T : class
{
    private const string StorageTypeHeaderName = "Repository-Type";
    private StorageTypes _currentStorageType = StorageTypes.Sql;
    public IRepository<T, TId> CurrentStorage
    {
        get
        {
            UpdateCurrentStorageType();
            return _currentStorageType == StorageTypes.Xml ? xml : sql;
        }
    }

    private void UpdateCurrentStorageType()
    {
        var httpContext = httpContextAccessor.HttpContext;
        if (httpContext != null && httpContext.Request.Headers.TryGetValue(StorageTypeHeaderName, out var storageTypeHeader))
        {
            _currentStorageType = storageTypeHeader.ToString().ToUpperInvariant() switch
            {
                "SQL" => StorageTypes.Sql,
                "XML" => StorageTypes.Xml,
                _ => _currentStorageType
            };
        }
    }

    public StorageTypes GetStorageType() => _currentStorageType;
    public void SwitchToSql() => SetHeader(StorageTypes.Sql);
    public void SwitchToXml() => SetHeader(StorageTypes.Xml);
    private void SetHeader(StorageTypes storageType)
    {
        var httpContext = httpContextAccessor.HttpContext;
        if (httpContext != null)
        {
            httpContext.Request.Headers[StorageTypeHeaderName] = storageType.ToString().ToLowerInvariant();
            _currentStorageType = storageType;
        }
    }
}