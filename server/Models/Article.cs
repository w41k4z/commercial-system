using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Article
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Unit { get; set; } = null!;

        public virtual NeedDetail Id1 { get; set; } = null!;
        public virtual ProformaDetail Id2 { get; set; } = null!;
        public virtual PurchaseOrderDetail Id3 { get; set; } = null!;
        public virtual ArticleSupplier IdNavigation { get; set; } = null!;
    }
}
