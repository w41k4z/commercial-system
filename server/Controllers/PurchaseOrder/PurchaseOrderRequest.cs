using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

public class PurchaseOrderRequest
{
    public PurchaseOrder PurchaseOrder { get; set; }
    public List<PurchaseOrderDetail> PurchaseOrderDetails { get; set; }
}