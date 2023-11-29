using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class NeedGroup
    {
        public NeedGroup()
        {
            NeedGroupNeeds = new HashSet<NeedGroupNeed>();
            ProformaDetails = new HashSet<ProformaDetail>();
            ProformaSendNeedGroups = new HashSet<ProformaSendNeedGroup>();
        }

        public int Id { get; set; }
        public string Numero { get; set; } = null!;
        public int IdArticle { get; set; }
        public double Quantity { get; set; }
        public DateOnly FinalDateNeed { get; set; }

        public virtual Article IdArticleNavigation { get; set; } = null!;
        public virtual ICollection<NeedGroupNeed> NeedGroupNeeds { get; set; }
        public virtual ICollection<ProformaDetail> ProformaDetails { get; set; }
        public virtual ICollection<ProformaSendNeedGroup> ProformaSendNeedGroups { get; set; }
    }
}
