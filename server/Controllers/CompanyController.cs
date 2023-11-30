using Microsoft.AspNetCore.Mvc;
using server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace server.Controllers;

[ApiController]
[Route("api/company")]
public class CompanyController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public CompanyController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    [HttpGet("")]
    public IActionResult GetCompany()
    {
        var company = _dbContext.Companies
            .FirstOrDefault();

        if (company == null)
        {
            return NotFound(); // Retourne un statut 404 si l'achat n'est pas trouvé
        }

        return Ok(company);
    }
}