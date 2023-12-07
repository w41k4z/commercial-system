using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("api/departments")]
public class DepartmentController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public DepartmentController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetEntities()
    {
        var entities = _dbContext.Departments.ToList();
        return Ok(entities);
    }

    [HttpGet("{id}")]
    public IActionResult GetEntity(int id)
    {
        var entity = _dbContext.Departments.FirstOrDefault(e => e.Id == id);
        return Ok(entity);
    }

    [HttpPost]
    public IActionResult CreateEntity(Department entity)
    {
        _dbContext.Departments.Add(entity);
        _dbContext.SaveChanges();
        return Ok(entity);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateEntity(int id, Department entity)
    {
        var entityToUpdate = _dbContext.Departments.FirstOrDefault(e => e.Id == id);
        if (entityToUpdate == null)
        {
            return NotFound();
        }

        entityToUpdate.Name = entity.Name;

        _dbContext.SaveChanges();
        return Ok(entityToUpdate);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEntity(int id)
    {
        var entity = _dbContext.Departments.FirstOrDefault(e => e.Id == id);
        if (entity == null)
        {
            return NotFound();
        }

        _dbContext.Departments.Remove(entity);
        _dbContext.SaveChanges();
        return Ok();
    }
}