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
        public double SumHt { get; set; }
        public double SumVat { get; set; }
        public double SumTtc { get; set; }
        public double ParcelCharges { get; set; }
        public double Discount { get; set; }
        public int Payment { get; set; }
        public string Reference { get; set; } = null!;

        public virtual Supplier? IdSupplierNavigation { get; set; } = null!;
        public virtual ICollection<PurchaseOrderDetail>? PurchaseOrderDetails { get; set; }
    }
}
