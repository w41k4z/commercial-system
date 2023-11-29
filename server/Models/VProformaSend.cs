using System;
using System.Collections.Generic;

namespace server.Models;

public partial class VProformaSend
{
    public int? Id { get; set; }

    public DateOnly? DateSend { get; set; }

    public int? IdSupplier { get; set; }

    public string? Numero { get; set; }

    public string? Name { get; set; }

    public string? Address { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }
}
