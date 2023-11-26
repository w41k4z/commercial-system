using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class NeedDetail
    {
        public NeedDetail()
        {
            NeedGroupNeeds = new HashSet<NeedGroupNeed>();
        }

        public int Id { get; set; }
        public double Quantity { get; set; }
        public string Motif { get; set; } = null!;
        public DateOnly DateNeed { get; set; }
        public int IdArticle { get; set; }
        public int IdDepartmentNeeds { get; set; }

        public virtual Article IdArticleNavigation { get; set; } = null!;
        public virtual DepartmentNeed IdDepartmentNeedsNavigation { get; set; } = null!;
        public virtual ICollection<NeedGroupNeed> NeedGroupNeeds { get; set; }
    }
}
