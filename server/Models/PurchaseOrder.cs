using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class PurchaseOrder
    {
        public PurchaseOrder()
        {
            PurchaseOrderDetails = new HashSet<PurchaseOrderDetail>();
        }

        public int Id { get; set; }
        public DateOnly DateSend { get; set; }
        public int Validation { get; set; }
        public int IdSupplier { get; set; }

        public virtual Supplier IdSupplierNavigation { get; set; } = null!;
        public virtual ICollection<PurchaseOrderDetail> PurchaseOrderDetails { get; set; }
    }
}
