using Microsoft.AspNetCore.Mvc;
using server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace server.Controllers;

[ApiController]
[Route("api/purchase_order_details")]
public class PurchaseOrderDetailController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public PurchaseOrderDetailController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    [HttpGet("{id_purchase_order}")]
    public IActionResult GetDetailsByOrderId(int id_purchase_order)
    {
        var details = _dbContext.PurchaseOrderDetails
            .Where(detail => detail.IdPurchaseOrder == id_purchase_order)
            .Include(detail => detail.IdArticleNavigation)
            .ToList();
        return Ok(details);
    }


}