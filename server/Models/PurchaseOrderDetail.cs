using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class PurchaseOrderDetail
    {
        public int Id { get; set; }
        public int IdPurchaseOrder { get; set; }
        public int IdArticle { get; set; }
        public double Quantity { get; set; }
        public DateOnly DateNeed { get; set; }

        public virtual PurchaseOrder IdPurchaseOrderNavigation { get; set; } = null!;
        public virtual Article Article { get; set; } = null!;
    }
}
