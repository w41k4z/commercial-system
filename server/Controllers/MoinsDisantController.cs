
using Microsoft.AspNetCore.Mvc;
using server.Models;
using System.Text.Json;

namespace server.Controllers;

[ApiController]
[Route("api/moinsdisant")]
public class MoinsdisantController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public MoinsdisantController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var list = _dbContext.MoinsDisants.ToList();   
        var combinedLists = new
        {
            moinsdisant = list
        };
        return Ok(combinedLists);
    }
}