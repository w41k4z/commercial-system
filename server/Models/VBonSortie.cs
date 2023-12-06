using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class VBonSortie
    {
        public int? Id { get; set; }
        public DateOnly? DateSortie { get; set; }
        public int? IdDemande { get; set; }
        public int? IdRemis { get; set; }
        public int? IdMagasin { get; set; }
        public string? DemandeName { get; set; }
        public string? RemisName { get; set; }
        public string? MagasinName { get; set; }
    }
}
