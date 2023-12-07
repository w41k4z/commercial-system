using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class ProformaSend
    {
        public ProformaSend()
        {
            ProformaSendNeedGroups = new HashSet<ProformaSendNeedGroup>();
            Proformas = new HashSet<Proforma>();
        }

        public int Id { get; set; }
        public DateOnly DateSend { get; set; }
        public int IdSupplier { get; set; }
        public string? Numero { get; set; }

        public virtual Supplier IdSupplierNavigation { get; set; } = null!;
        public virtual ICollection<ProformaSendNeedGroup> ProformaSendNeedGroups { get; set; }
        public virtual ICollection<Proforma> Proformas { get; set; }
    }
}
