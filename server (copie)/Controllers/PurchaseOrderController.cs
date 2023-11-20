
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("api/purchase_order")]
public class PurchaseOrderController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public DemandeProformaController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("/suppliers")]
    public IActionResult GetSuppliers()
    {
        var suppliers = _dbContext.Supplier.ToList();
        return Ok(suppliers)
    }
}