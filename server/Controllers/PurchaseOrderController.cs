using Microsoft.AspNetCore.Mvc;
using server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace server.Controllers;

[ApiController]
[Route("api/purchase_order")]
public class PurchaseOrderController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public PurchaseOrderController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var purchase_order = _dbContext.PurchaseOrders
            .Include(p => p.IdSupplierNavigation)
            .FirstOrDefault(p => p.Id == id);

        if (purchase_order == null)
        {
            return NotFound(); // Retourne un statut 404 si l'achat n'est pas trouvé
        }

        return Ok(purchase_order);
    }


    [HttpGet("")]
    public IActionResult GetAll()
    {
        var purchase_orders = _dbContext.PurchaseOrders.ToList();
        return Ok(purchase_orders);
    }

    [HttpGet("suppliers")]
    public IActionResult GetSuppliers()
    {
        var suppliers = _dbContext.Suppliers.ToList();
        return Ok(suppliers);
    }

    [HttpGet("articles")]
    public IActionResult GetArticles()
    {
        var articles = _dbContext.Articles.ToList();
        return Ok(articles);
    }

    [HttpPost("save")]
    public IActionResult SavePurchaseOrder([FromBody] PurchaseOrderRequest purchaseOrderRequest)
    {
        PurchaseOrder newPurchaseOrder = purchaseOrderRequest.PurchaseOrder;
        List<PurchaseOrderDetail> purchaseOrderDetailsList = purchaseOrderRequest.PurchaseOrderDetails;

        if (newPurchaseOrder == null || purchaseOrderDetailsList == null)
        {
            return BadRequest("Invalid purchase order data");
        }

        using (var transaction = _dbContext.Database.BeginTransaction())
        {
            try
            {
                // Ajoutez la nouvelle commande d'achat
                _dbContext.PurchaseOrders.Add(newPurchaseOrder);
                _dbContext.SaveChanges(); // Vous pouvez également utiliser SaveChangesAsync si vous préférez l'asynchrone

                // Affectez l'ID de la nouvelle commande d'achat aux détails
                foreach (var detail in purchaseOrderDetailsList)
                {
                    Console.WriteLine("-------------------------------------");
                    Console.WriteLine(detail.IdArticle);
                    Console.WriteLine("-------------------------------------");
                    detail.IdPurchaseOrder = newPurchaseOrder.Id;
                }

                // Ajoutez les détails de la commande d'achat
                _dbContext.PurchaseOrderDetails.AddRange(purchaseOrderDetailsList);
                _dbContext.SaveChanges(); // Encore une fois, SaveChangesAsync est une option

                // Validez la transaction
                transaction.Commit();

                return Ok("Purchase order and details saved successfully");
            }
            catch (Exception ex)
            {
                // En cas d'erreur, annulez la transaction
                transaction.Rollback();
                Console.WriteLine(ex.Message);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}