using Microsoft.AspNetCore.Mvc;
using server.Context;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("api/articles")]
public class ArticleController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public ArticleController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetEntities()
    {
        var entities = _dbContext.Articles.ToList();
        return Ok(entities);
    }

    [HttpGet("{id}")]
    public IActionResult GetEntity(int id)
    {
        var entity = _dbContext.Articles.FirstOrDefault(e => e.Id == id);
        return Ok(entity);
    }

    [HttpPost]
    public IActionResult CreateEntity(Article entity)
    {
        _dbContext.Articles.Add(entity);
        _dbContext.SaveChanges();
        return Ok(entity);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateEntity(int id, Article entity)
    {
        var entityToUpdate = _dbContext.Articles.FirstOrDefault(e => e.Id == id);
        if (entityToUpdate == null)
        {
            return NotFound();
        }

        entityToUpdate.Name = entity.Name;
        entityToUpdate.Unit = entity.Unit;

        _dbContext.SaveChanges();
        return Ok(entityToUpdate);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEntity(int id)
    {
        var entity = _dbContext.Articles.FirstOrDefault(e => e.Id == id);
        if (entity == null)
        {
            return NotFound();
        }

        _dbContext.Articles.Remove(entity);
        _dbContext.SaveChanges();
        return Ok();
    }
}