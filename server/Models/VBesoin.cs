using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class VBesoin
    {
        public string? Department { get; set; }
        public string? Article { get; set; }
        public double? Quantity { get; set; }
        public DateOnly? DateSend { get; set; }
        public DateOnly? DateNeed { get; set; }
    }
}
