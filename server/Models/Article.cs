using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Article
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Unit { get; set; } = null!;

    public virtual ICollection<ArticleSupplier> ArticleSuppliers { get; } = new List<ArticleSupplier>();

    public virtual ICollection<NeedDetail> NeedDetails { get; } = new List<NeedDetail>();

    public virtual ICollection<NeedGroup> NeedGroups { get; } = new List<NeedGroup>();

    public virtual ICollection<ProformaDetail> ProformaDetails { get; } = new List<ProformaDetail>();

    public virtual PurchaseOrderDetail? PurchaseOrderDetail { get; set; }
}
