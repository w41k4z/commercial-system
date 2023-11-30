using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class MoinsDisant
    {
        public string? NeedNumero { get; set; }
        public string? ArticleName { get; set; }
        public double? Quantity { get; set; }
        public double? UnitPrice { get; set; }
        public double? Tva { get; set; }
        public double? TotalHt { get; set; }
        public string? SupplierName { get; set; }
        public string? ProformaNumero { get; set; }
        public DateOnly? DateReceived { get; set; }
    }
}
