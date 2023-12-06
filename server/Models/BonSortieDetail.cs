using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class BonSortieDetail
    {
        public int Id { get; set; }
        public int? IdBonSortie { get; set; }
        public int? IdArticle { get; set; }
        public double? QuantiteDemande { get; set; }
        public double? QuantiteLivre { get; set; }
        public double? PrixUnitaire { get; set; }
        public double? Total { get; set; }

        public virtual Article? IdArticleNavigation { get; set; }
        public virtual BonSortie? IdBonSortieNavigation { get; set; }
    }
}
