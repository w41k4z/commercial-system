using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class ProformaSend
    {
        public ProformaSend()
        {
            NeedGroupProformaSends = new HashSet<NeedGroupProformaSend>();
            ProformaSendDetails = new HashSet<ProformaSendDetail>();
            Proformas = new HashSet<Proforma>();
        }

        public int Id { get; set; }
        public DateOnly DateSend { get; set; }
        public int IdSupplier { get; set; }

        public virtual Supplier IdSupplierNavigation { get; set; } = null!;
        public virtual ICollection<NeedGroupProformaSend> NeedGroupProformaSends { get; set; }
        public virtual ICollection<ProformaSendDetail> ProformaSendDetails { get; set; }
        public virtual ICollection<Proforma> Proformas { get; set; }
    }
}
