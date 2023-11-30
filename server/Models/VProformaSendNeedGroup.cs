using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class VProformaSendNeedGroup
    {
        public int? Id { get; set; }
        public int? IdProformaSend { get; set; }
        public int? IdNeedGroup { get; set; }
        public string? Numero { get; set; }
        public int? IdArticle { get; set; }
        public double? Quantity { get; set; }
        public DateOnly? FinalDateNeed { get; set; }
        public string? ArticleName { get; set; }
        public string? ArticleUnit { get; set; }
    }
}
