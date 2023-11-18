using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Article
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Unit { get; set; } = null!;

        public virtual NeedDetail IdNavigation { get; set; } = null!;
        public virtual ArticleSupplier ArticleSupplier { get; set; } = null!;
        public virtual ProformaDetail ProformaDetail { get; set; } = null!;
        public virtual PurchaseOrderDetail PurchaseOrderDetail { get; set; } = null!;
    }
}
