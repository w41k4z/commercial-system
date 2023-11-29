using System;
using System.Collections.Generic;

namespace server.Models;

public partial class VProformaDetail
{
    public int? Id { get; set; }

    public double? Quantity { get; set; }

    public double? Tva { get; set; }

    public double? UnitPrice { get; set; }

    public double? TotalHt { get; set; }

    public int? IdProforma { get; set; }

    public int? IdArticle { get; set; }

    public int? IdNeedGroup { get; set; }

    public string? ArticleName { get; set; }

    public string? Unit { get; set; }

    public string? Numero { get; set; }
}
