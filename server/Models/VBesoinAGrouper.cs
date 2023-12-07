using System;
using System.Collections.Generic;

namespace server.Models;

public partial class VBesoinAGrouper
{
    public string? Department { get; set; }

    public string? Article { get; set; }

    public double? Quantity { get; set; }

    public DateOnly? DateSend { get; set; }

    public DateOnly? DateNeed { get; set; }

    public int? IdDepartmentNeeds { get; set; }

    public int? IdNeedDetails { get; set; }

    public int? Validation { get; set; }

    public int? IdArticle { get; set; }
}
