using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Magasin
    {
        public Magasin()
        {
            BonEntrees = new HashSet<BonEntree>();
            BonSorties = new HashSet<BonSortie>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<BonEntree> BonEntrees { get; set; }
        public virtual ICollection<BonSortie> BonSorties { get; set; }
    }
}
