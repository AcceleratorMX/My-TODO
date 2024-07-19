using Dapper;
using MyTodo.Core.Data.Models;
using MyTodo.Core.Data.Services;
using MyTodo.Core.Repositories.Abstract;

namespace MyTodo.Core.Repositories.Sql;

public class CategoryRepositorySql(DatabaseService databaseService) : IRepository<Category, int>
{
    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        using var db = databaseService.OpenConnection();
        return await db.QueryAsync<Category>("SELECT Id, Name FROM Categories");
    }

    public async Task<Category> GetByIdAsync(int id)
    {
        using var db = databaseService.OpenConnection();
        return await db.QueryFirstOrDefaultAsync("SELECT Id, Name FROM Categories WHERE Id = @Id", new { Id = id }) 
               ?? throw new NullReferenceException($"Category with id {id} not found!");
    }

    public async Task CreateAsync(Category category)
    {
        using var db = databaseService.OpenConnection();
        const string query = """
                                INSERT INTO Categories (Name) 
                                VALUES (@Name)
                                SELECT SCOPE_IDENTITY()
                             """;
        var newId = await db.ExecuteScalarAsync<int>(query, category);
        category.Id = newId;
    }

    public async Task UpdateAsync(Category category)
    {
        using var db = databaseService.OpenConnection();
        await db.ExecuteAsync("UPDATE Categories SET Name = @Name WHERE Id = @Id", category);
    }

    public async Task DeleteAsync(int id)
    {
        using var db = databaseService.OpenConnection();
        await db.ExecuteAsync("DELETE FROM Categories WHERE Id = @Id", new { Id = id });
    }
}