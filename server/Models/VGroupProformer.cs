using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class VGroupProformer
    {
        public int? Id { get; set; }
        public string? Numero { get; set; }
        public int? IdArticle { get; set; }
        public double? Quantity { get; set; }
        public DateOnly? FinalDateNeed { get; set; }
        public string? Article { get; set; }
    }
}
