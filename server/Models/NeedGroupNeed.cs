using System;
using System.Collections.Generic;

namespace server.Models;

public partial class NeedGroupNeed
{
    public int Id { get; set; }

    public int IdNeedDetails { get; set; }

    public int IdNeedGroup { get; set; }

    public virtual NeedDetail IdNeedDetailsNavigation { get; set; } = null!;

    public virtual NeedGroup IdNeedGroupNavigation { get; set; } = null!;
}
