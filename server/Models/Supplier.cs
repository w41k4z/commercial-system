using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Supplier
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public virtual ICollection<ArticleSupplier> ArticleSuppliers { get; } = new List<ArticleSupplier>();

    public virtual ICollection<ProformaSend> ProformaSends { get; } = new List<ProformaSend>();

    public virtual ICollection<PurchaseOrder> PurchaseOrders { get; } = new List<PurchaseOrder>();
}
