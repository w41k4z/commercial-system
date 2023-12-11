using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Article
    {
        public Article()
        {
            ArticleSuppliers = new HashSet<ArticleSupplier>();
            BonEntreeDetails = new HashSet<BonEntreeDetail>();
            BonSortieDetails = new HashSet<BonSortieDetail>();
            NeedDetails = new HashSet<NeedDetail>();
            NeedGroups = new HashSet<NeedGroup>();
            ProformaDetails = new HashSet<ProformaDetail>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Unit { get; set; } = null!;

        public virtual PurchaseOrderDetail PurchaseOrderDetail { get; set; } = null!;
        public virtual ICollection<ArticleSupplier> ArticleSuppliers { get; set; }
        public virtual ICollection<BonEntreeDetail> BonEntreeDetails { get; set; }
        public virtual ICollection<BonSortieDetail> BonSortieDetails { get; set; }
        public virtual ICollection<NeedDetail> NeedDetails { get; set; }
        public virtual ICollection<NeedGroup> NeedGroups { get; set; }
        public virtual ICollection<ProformaDetail> ProformaDetails { get; set; }
    }
}
