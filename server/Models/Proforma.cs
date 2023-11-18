using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Proforma
    {
        public int Id { get; set; }
        public DateOnly DateReceived { get; set; }
        public double? TotalPrice { get; set; }
        public int IdProformaSend { get; set; }

        public virtual ProformaSend IdProformaSendNavigation { get; set; } = null!;
        public virtual ProformaDetail ProformaDetail { get; set; } = null!;
    }
}
