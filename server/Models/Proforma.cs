using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Proforma
{
    public int Id { get; set; }

    public DateOnly DateReceived { get; set; }

    public double? TotalHt { get; set; }

    public int IdProformaSend { get; set; }

    public double? TotalTva { get; set; }

    public double? TotalTtc { get; set; }

    public string? Numero { get; set; }

    public virtual ProformaSend IdProformaSendNavigation { get; set; } = null!;

    public virtual ICollection<ProformaDetail> ProformaDetails { get; } = new List<ProformaDetail>();
}
