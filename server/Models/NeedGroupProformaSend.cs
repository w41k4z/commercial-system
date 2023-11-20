using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class NeedGroupProformaSend
    {
        public int Id { get; set; }
        public int IdNeedGroup { get; set; }
        public int IdProformaSend { get; set; }

        public virtual NeedGroup IdNeedGroupNavigation { get; set; } = null!;
        public virtual ProformaSend IdProformaSendNavigation { get; set; } = null!;
    }
}
