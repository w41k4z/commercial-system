using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class VBonEntreeDetail
    {
        public int? Id { get; set; }
        public int? IdBonEntree { get; set; }
        public int? IdArticle { get; set; }
        public double? Quantite { get; set; }
        public string? Observation { get; set; }
        public string? ArticleName { get; set; }
    }
}
