using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class ArticleSupplier
    {
        public int Id { get; set; }
        public int IdArticle { get; set; }
        public int IdSupplier { get; set; }
        public int Status { get; set; }

        public virtual Article? IdArticleNavigation { get; set; } = null!;
        public virtual Supplier? IdSupplierNavigation { get; set; } = null!;
    }
}
