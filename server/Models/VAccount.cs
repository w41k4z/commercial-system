using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class VAccount
    {
        public int? Id { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Profil { get; set; }
        public int? IdDepartment { get; set; }
        public string? Fullname { get; set; }
        public string? DepartmentName { get; set; }
    }
}
