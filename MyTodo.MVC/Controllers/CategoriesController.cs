using Microsoft.AspNetCore.Mvc;
using MyTodo.MVC.Data.Models;
using MyTodo.MVC.Data.ViewModels;
using MyTodo.MVC.Repositories.Abstract;

namespace MyTodo.MVC.Controllers;

public class CategoriesController(
    IRepositorySwitcher<Job, int> jobRepository,
    IRepositorySwitcher<Category, int> categoryRepository)
    : Controller
{
    [Route("editor")]
    public async Task<IActionResult> CategoriesEditor()
    {
        var model = new CategoryViewModel
        {
            Categories = await GetCategoriesWhereIdIsNotDefaultAsync(),
            CurrentStorageType = categoryRepository.GetStorageType()
        };

        return View(model);
    }
    
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CreateCategoryAsync(CategoryViewModel model)
    {
        if (!ModelState.IsValid)
        {
            var categories = await GetCategoriesWhereIdIsNotDefaultAsync();
            model.Categories = categories;
            return View("CategoriesEditor", model);
        }
        
        var categoriesList = await GetCategoriesWhereIdIsNotDefaultAsync();
        var existingCategory = categoriesList
            .FirstOrDefault(c => c.Name.Equals(model.Name, StringComparison.OrdinalIgnoreCase));

        if (existingCategory != null)
        {
            ModelState.AddModelError("Title", "Категорія з таким ім'ям вже існує.");
            var categories = await GetCategoriesWhereIdIsNotDefaultAsync();
            model.Categories = categories;
            return View("CategoriesEditor", model);
        }

        var category = new Category
        {
            Name = model.Name.Trim()
        };

        await categoryRepository.CurrentStorage.CreateAsync(category);
        return RedirectToAction("CategoriesEditor");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        var defaultCategoryId = GetDefaultCategoryId();
        var jobs = await jobRepository.CurrentStorage.GetAllAsync();
        foreach (var job in jobs)
        {
            if (job.CategoryId == id)
            {
                job.CategoryId = defaultCategoryId;
                await jobRepository.CurrentStorage.UpdateAsync(job);
            }
        }

        await categoryRepository.CurrentStorage.DeleteAsync(id);
        return RedirectToAction("CategoriesEditor");
    }

    
    private async Task<IEnumerable<Category>> GetCategoriesWhereIdIsNotDefaultAsync()
    {
        var categories = await categoryRepository.CurrentStorage.GetAllAsync();
        return categories.Where(c => c.Id != GetDefaultCategoryId());
    }
    
    private int GetDefaultCategoryId()
    {
        var defaultCategory = categoryRepository.CurrentStorage.GetAllAsync().Result.FirstOrDefault(c => c.Id == 1);
        return defaultCategory?.Id ?? throw new InvalidOperationException("Default category not found");
    }
}