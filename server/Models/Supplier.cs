﻿using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Supplier
    {
        public Supplier()
        {
            ArticleSuppliers = new HashSet<ArticleSupplier>();
            BonEntrees = new HashSet<BonEntree>();
            ProformaSends = new HashSet<ProformaSend>();
            PurchaseOrders = new HashSet<PurchaseOrder>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;

        public virtual ICollection<ArticleSupplier> ArticleSuppliers { get; set; }
        public virtual ICollection<BonEntree> BonEntrees { get; set; }
        public virtual ICollection<ProformaSend> ProformaSends { get; set; }
        public virtual ICollection<PurchaseOrder> PurchaseOrders { get; set; }
    }
}
