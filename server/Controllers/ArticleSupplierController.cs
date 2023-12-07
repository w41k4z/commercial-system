using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("api/article-suppliers")]
public class ArticleSupplierController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public ArticleSupplierController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetEntities()
    {
        var entities = _dbContext.ArticleSuppliers.ToList();
        return Ok(entities);
    }

    [HttpGet("{id}")]
    public IActionResult GetEntity(int id)
    {
        var entity = _dbContext.ArticleSuppliers.FirstOrDefault(e => e.Id == id);
        return Ok(entity);
    }

    [HttpPost]
    public IActionResult CreateEntity(ArticleSupplier entity)
    {
        _dbContext.ArticleSuppliers.Add(entity);
        _dbContext.SaveChanges();
        return Ok(entity);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateEntity(int id, ArticleSupplier entity)
    {
        var entityToUpdate = _dbContext.ArticleSuppliers.FirstOrDefault(e => e.Id == id);
        if (entityToUpdate == null)
        {
            return NotFound();
        }

        entityToUpdate.Status = entity.Status;
        entityToUpdate.IdArticle = entity.IdArticle;
        entityToUpdate.IdSupplier = entity.IdSupplier;

        _dbContext.SaveChanges();
        return Ok(entityToUpdate);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEntity(int id)
    {
        var entity = _dbContext.ArticleSuppliers.FirstOrDefault(e => e.Id == id);
        if (entity == null)
        {
            return NotFound();
        }

        _dbContext.ArticleSuppliers.Remove(entity);
        _dbContext.SaveChanges();
        return Ok();
    }
}