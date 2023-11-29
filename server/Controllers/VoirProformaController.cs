
using Microsoft.AspNetCore.Mvc;
using server.Models;
using System.Text.Json;

namespace server.Controllers;

[ApiController]
[Route("api/voirproforma")]
public class VoirProformaController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public VoirProformaController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var list = _dbContext.Proformas.ToList();   
        var combinedLists = new
        {
            proformas = list
        };
        return Ok(combinedLists);
    }


    [HttpPost]
    public IActionResult GetProforma([FromQuery] string id)
    {
        var proforma = _dbContext.VProformas.Where(v => v.Id==Int32.Parse(id)).First();
        var details = _dbContext.VProformaDetails.Where(v => v.IdProforma==proforma.Id).ToList();
        var combinedLists = new
        {
            proforma = proforma,
            details = details
        };
        return Ok(combinedLists);
    }
}