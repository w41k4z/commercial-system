using System;
using System.Collections.Generic;

namespace server.Models;

public partial class NeedGroup
{
    public int Id { get; set; }

    public string Numero { get; set; } = null!;

    public int IdArticle { get; set; }

    public double Quantity { get; set; }

    public DateOnly FinalDateNeed { get; set; }

    public virtual Article IdArticleNavigation { get; set; } = null!;

    public virtual ICollection<NeedGroupNeed> NeedGroupNeeds { get; } = new List<NeedGroupNeed>();

    public virtual ICollection<ProformaDetail> ProformaDetails { get; } = new List<ProformaDetail>();

    public virtual ICollection<ProformaSendNeedGroup> ProformaSendNeedGroups { get; } = new List<ProformaSendNeedGroup>();
}
