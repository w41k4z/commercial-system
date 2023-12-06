using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class BonEntree
    {
        public BonEntree()
        {
            BonEntreeDetails = new HashSet<BonEntreeDetail>();
        }

        public int Id { get; set; }
        public int? IdMagasin { get; set; }
        public DateOnly? DateEntree { get; set; }
        public int? IdSupplier { get; set; }
        public int? IdRemisPar { get; set; }
        public int? IdRecuPar { get; set; }

        public virtual Magasin? IdMagasinNavigation { get; set; }
        public virtual Account? IdRecuParNavigation { get; set; }
        public virtual Account? IdRemisParNavigation { get; set; }
        public virtual Supplier? IdSupplierNavigation { get; set; }
        public virtual ICollection<BonEntreeDetail> BonEntreeDetails { get; set; }
    }
}
