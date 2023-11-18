using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Supplier
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;

        public virtual Proforma Id1 { get; set; } = null!;
        public virtual ArticleSupplier IdNavigation { get; set; } = null!;
    }
}
