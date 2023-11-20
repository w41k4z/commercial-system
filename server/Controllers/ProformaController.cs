
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("api/proforma")]
public class ProformaController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public ProformaController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetEntities()
    {
        var entities = _dbContext.VBesoins.ToList();
        return Ok(entities);
    }
}