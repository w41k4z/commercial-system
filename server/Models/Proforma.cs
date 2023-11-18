using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Proforma
    {
        public int Id { get; set; }
        public int IdSupplier { get; set; }
        public DateOnly DateReceived { get; set; }
        public double? TotalPrice { get; set; }
        public int IdProformaSend { get; set; }

        public virtual ProformaDetail IdNavigation { get; set; } = null!;
        public virtual ProformaSend IdProformaSendNavigation { get; set; } = null!;
        public virtual Supplier Supplier { get; set; } = null!;
    }
}
