using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class ProformaSendDetail
    {
        public int Id { get; set; }
        public int IdArticle { get; set; }
        public double Quantity { get; set; }
        public int IdProformaSend { get; set; }
        public int IdNeedGroup { get; set; }

        public virtual NeedGroup IdNeedGroupNavigation { get; set; } = null!;
        public virtual ProformaSend IdProformaSendNavigation { get; set; } = null!;
    }
}
