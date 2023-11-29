using System;
using System.Collections.Generic;

namespace server.Models;

public partial class ProformaSend
{
    public int Id { get; set; }

    public DateOnly DateSend { get; set; }

    public int IdSupplier { get; set; }

    public string? Numero { get; set; }

    public virtual Supplier IdSupplierNavigation { get; set; } = null!;

    public virtual ICollection<ProformaSendNeedGroup> ProformaSendNeedGroups { get; } = new List<ProformaSendNeedGroup>();

    public virtual ICollection<Proforma> Proformas { get; } = new List<Proforma>();
}
