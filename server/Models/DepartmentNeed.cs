using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class DepartmentNeed
    {
        public int Id { get; set; }
        public int IdDepartment { get; set; }
        public DateOnly DateSend { get; set; }
        public DateOnly DateNeed { get; set; }
        public int Validation { get; set; }

        public virtual Department IdDepartmentNavigation { get; set; } = null!;
        public virtual ICollection<NeedDetail> NeedDetails { get; set; } = null!;
    }
}
