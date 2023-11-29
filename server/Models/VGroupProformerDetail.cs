using System;
using System.Collections.Generic;

namespace server.Models;

public partial class VGroupProformerDetail
{
    public int? Id { get; set; }

    public int? IdSupplier { get; set; }

    public string? Supplier { get; set; }

    public DateOnly? DateSend { get; set; }

    public string? Numero { get; set; }
}
