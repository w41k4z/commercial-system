using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class ProformaDetail
    {
        public int Id { get; set; }
        public int IdProforma { get; set; }
        public int IdArticle { get; set; }
        public double Quantity { get; set; }
        public double Tva { get; set; }
        public double SalePrice { get; set; }
        public double TotalPrice { get; set; }

        public virtual Article IdArticleNavigation { get; set; } = null!;
        public virtual Proforma IdProformaNavigation { get; set; } = null!;
    }
}
