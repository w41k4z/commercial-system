using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class BonEntreeDetail
    {
        public int Id { get; set; }
        public int? IdBonEntree { get; set; }
        public int? IdArticle { get; set; }
        public double? Quantite { get; set; }
        public string? Observation { get; set; }

        public virtual Article? IdArticleNavigation { get; set; }
        public virtual BonEntree? IdBonEntreeNavigation { get; set; }
    }
}
