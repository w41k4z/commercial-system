using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("api/department-needs")]
public class DepartmentNeedController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public DepartmentNeedController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetEntities()
    {
        var entities = _dbContext.DepartmentNeeds.ToList();
        return Ok(entities);
    }

    [HttpGet("{id}")]
    public IActionResult GetEntity(int id)
    {
        var entity = _dbContext.DepartmentNeeds.Include(d => d.NeedDetails).FirstOrDefault(e => e.Id == id);
        return Ok(entity);
    }

    [HttpPost]
    public IActionResult CreateEntity(DepartmentNeed entity)
    {
        entity.DateSend = entity.DateNeed.ToUniversalTime();
        entity.DateNeed = entity.DateNeed.ToUniversalTime();
        entity.Validation = 0;
        _dbContext.DepartmentNeeds.Add(entity);
        _dbContext.SaveChanges();
        return Ok(entity);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateEntity(int id, DepartmentNeed entity)
    {
        var entityToUpdate = _dbContext.DepartmentNeeds.FirstOrDefault(e => e.Id == id);
        if (entityToUpdate == null)
        {
            return NotFound();
        }

        entityToUpdate.IdDepartment = entity.IdDepartment;
        entityToUpdate.DateSend = entity.DateSend.ToUniversalTime();
        entityToUpdate.DateNeed = entity.DateNeed.ToUniversalTime();
        entityToUpdate.Validation = entity.Validation;

        _dbContext.SaveChanges();
        return Ok(entityToUpdate);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEntity(int id)
    {
        var entity = _dbContext.DepartmentNeeds.FirstOrDefault(e => e.Id == id);
        if (entity == null)
        {
            return NotFound();
        }

        _dbContext.DepartmentNeeds.Remove(entity);
        _dbContext.SaveChanges();
        return Ok();
    }
}