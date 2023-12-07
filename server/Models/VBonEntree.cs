using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class VBonEntree
    {
        public int? Id { get; set; }
        public int? IdMagasin { get; set; }
        public DateOnly? DateEntree { get; set; }
        public int? IdSupplier { get; set; }
        public int? IdRemisPar { get; set; }
        public int? IdRecuPar { get; set; }
        public string? MagasinName { get; set; }
        public string? SupplierName { get; set; }
        public string? RemisParName { get; set; }
        public string? RecuParName { get; set; }
    }
}
