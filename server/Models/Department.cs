using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Department
    {
        public Department()
        {
            Accounts = new HashSet<Account>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual DepartmentNeed IdNavigation { get; set; } = null!;
        public virtual ICollection<Account> Accounts { get; set; }
    }
}
