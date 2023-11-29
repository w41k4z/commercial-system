using System;
using System.Collections.Generic;

namespace server.Models;

public partial class VProforma
{
    public int? Id { get; set; }

    public DateOnly? DateReceived { get; set; }

    public double? TotalHt { get; set; }

    public int? IdProformaSend { get; set; }

    public double? TotalTva { get; set; }

    public double? TotalTtc { get; set; }

    public string? Numero { get; set; }

    public DateOnly? DateSend { get; set; }

    public string? NumeroSend { get; set; }

    public string? Supplier { get; set; }
}
