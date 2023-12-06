using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class BonSortie
    {
        public BonSortie()
        {
            BonSortieDetails = new HashSet<BonSortieDetail>();
        }

        public int Id { get; set; }
        public DateOnly? DateSortie { get; set; }
        public int? IdDemande { get; set; }
        public int? IdRemis { get; set; }
        public int? IdMagasin { get; set; }

        public virtual Account? IdDemandeNavigation { get; set; }
        public virtual Magasin? IdMagasinNavigation { get; set; }
        public virtual Account? IdRemisNavigation { get; set; }
        public virtual ICollection<BonSortieDetail> BonSortieDetails { get; set; }
    }
}
