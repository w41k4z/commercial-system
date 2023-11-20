using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class ProformaSendDetail
    {
        public int Id { get; set; }
        public int IdArticle { get; set; }
        public double Quantity { get; set; }
        public DateOnly DateNeed { get; set; }
        public int IdProformaSend { get; set; }

        public virtual ProformaSend IdProformaSendNavigation { get; set; } = null!;
    }
}
