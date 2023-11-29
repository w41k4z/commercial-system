using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Company
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Tel { get; set; } = null!;

    public string Email { get; set; } = null!;
}
