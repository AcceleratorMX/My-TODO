using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using MyTodo.MVC.Data.Models;
using MyTodo.MVC.Data.ViewModels;
using MyTodo.MVC.Repositories.Abstract;

namespace MyTodo.MVC.Controllers;

public class TodoController(
    IRepositorySwitcher<Job, int> jobRepository,
    IRepositorySwitcher<Category, int> categoryRepository)
    : Controller
{
    public async Task<IActionResult> Todo()
    {
        var model = new TodoViewModel
        {
            CurrentStorageType = jobRepository.GetStorageType(),
            Jobs = (await jobRepository.CurrentStorage.GetAllAsync())
                .OrderByDescending(job => job.IsDone)
                .ThenByDescending(job => job.Id)
        };

        ViewBag.Categories = await GetCategoriesSelectList();
        
        return View(model);
    }

    private async Task<SelectList> GetCategoriesSelectList()
    {
        var categories = (await categoryRepository.CurrentStorage.GetAllAsync())
            .Where(c => c.Id != 1);
        return new SelectList(categories, "Id", "Name");
    }
    
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Todo(TodoViewModel model)
    {
        var job = model.Job;

        if (string.IsNullOrEmpty(job.Name) || job.CategoryId == 0)
        {
            ViewBag.Categories = await GetCategoriesSelectList();
            model.Jobs = await jobRepository.CurrentStorage.GetAllAsync();
            return View(model);
        }

        await jobRepository.CurrentStorage.CreateAsync(job);

        return RedirectToAction("Todo");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ChangeProgress(int id)
    {
        var job = await jobRepository.CurrentStorage.GetByIdAsync(id);
        if (job.IsDone) return RedirectToAction("Todo");
        job.IsDone = true;
        await jobRepository.CurrentStorage.UpdateAsync(job);
        return RedirectToAction("Todo");
    }

    [HttpPost]
    public async Task<IActionResult> Delete(int id)
    {
        await jobRepository.CurrentStorage.DeleteAsync(id);
        return RedirectToAction("Todo");
    }

    [HttpPost]
    [Route("todo/switch")]
    public IActionResult Switch(string storageType, string? returnUrl)
    {
        switch (storageType.ToLower())
        {
            case "sql":
                jobRepository.SwitchToSql();
                categoryRepository.SwitchToSql();
                break;
            case "xml":
                jobRepository.SwitchToXml();
                categoryRepository.SwitchToXml();
                break;
        }
        
        return Redirect(returnUrl!);
    }
}