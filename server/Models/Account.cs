using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Account
    {
        public Account()
        {
            BonEntreeIdRecuParNavigations = new HashSet<BonEntree>();
            BonEntreeIdRemisParNavigations = new HashSet<BonEntree>();
            BonSortieIdDemandeNavigations = new HashSet<BonSortie>();
            BonSortieIdRemisNavigations = new HashSet<BonSortie>();
        }

        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Profil { get; set; } = null!;
        public int IdDepartment { get; set; }
        public string? Fullname { get; set; }

        public virtual Department IdDepartmentNavigation { get; set; } = null!;
        public virtual ICollection<BonEntree> BonEntreeIdRecuParNavigations { get; set; }
        public virtual ICollection<BonEntree> BonEntreeIdRemisParNavigations { get; set; }
        public virtual ICollection<BonSortie> BonSortieIdDemandeNavigations { get; set; }
        public virtual ICollection<BonSortie> BonSortieIdRemisNavigations { get; set; }
    }
}
