﻿namespace MyTodo.Core.Data.Models;

using System.ComponentModel.DataAnnotations;

public class Job
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Це поле обов'язкове!")]
    public string Name { get; set; } = null!;

    [Range(1, int.MaxValue, ErrorMessage = "Оберіть категорію!")]
    public int CategoryId { get; set; }

    public DateTime? Deadline { get; set; }

    public bool IsDone { get; set; }

    public Category Category { get; set; } = null!;
}