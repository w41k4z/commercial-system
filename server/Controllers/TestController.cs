
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("api/test")]
public class TestController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public TestController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetEntities()
    {
        var entities = _dbContext.Tests.ToList();
        return Ok(entities);
    }
}