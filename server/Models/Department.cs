using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Department
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Account> Accounts { get; } = new List<Account>();

    public virtual ICollection<DepartmentNeed> DepartmentNeeds { get; } = new List<DepartmentNeed>();
}
