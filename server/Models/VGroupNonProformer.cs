using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class VGroupNonProformer
    {
        public int? Id { get; set; }
        public string? Numero { get; set; }
        public int? IdArticle { get; set; }
        public double? Quantity { get; set; }
        public DateOnly? FinalDateNeed { get; set; }
    }
}
