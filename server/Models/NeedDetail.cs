using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class NeedDetail
    {
        public int Id { get; set; }
        public int IdDepartmentNeeds { get; set; }
        public int IdArticle { get; set; }
        public double Quantity { get; set; }
        public string Motif { get; set; } = null!;

        public virtual Article Article { get; set; } = null!;
        public virtual DepartmentNeed DepartmentNeed { get; set; } = null!;
    }
}
