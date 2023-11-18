using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Account
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int Profil { get; set; }
        public int IdDepartment { get; set; }

        public virtual Department IdDepartmentNavigation { get; set; } = null!;
    }
}
