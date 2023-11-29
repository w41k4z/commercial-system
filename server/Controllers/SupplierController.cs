using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("api/suppliers")]
public class SupplierController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public SupplierController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetEntities()
    {
        var entities = _dbContext.Suppliers.ToList();
        return Ok(entities);
    }

    [HttpGet("{id}")]
    public IActionResult GetEntity(int id)
    {
        var entity = _dbContext.Suppliers.FirstOrDefault(e => e.Id == id);
        return Ok(entity);
    }

    [HttpPost]
    public IActionResult CreateEntity(Supplier entity)
    {
        _dbContext.Suppliers.Add(entity);
        _dbContext.SaveChanges();
        return Ok(entity);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateEntity(int id, Supplier entity)
    {
        var entityToUpdate = _dbContext.Suppliers.FirstOrDefault(e => e.Id == id);
        if (entityToUpdate == null)
        {
            return NotFound();
        }

        entityToUpdate.PhoneNumber = entity.PhoneNumber;
        entityToUpdate.Email = entity.Email;
        entityToUpdate.Address = entity.Address;
        entityToUpdate.Name = entity.Name;

        _dbContext.SaveChanges();
        return Ok(entityToUpdate);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEntity(int id)
    {
        var entity = _dbContext.Suppliers.FirstOrDefault(e => e.Id == id);
        if (entity == null)
        {
            return NotFound();
        }

        _dbContext.Suppliers.Remove(entity);
        _dbContext.SaveChanges();
        return Ok();
    }
}