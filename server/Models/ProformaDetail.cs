using System;
using System.Collections.Generic;

namespace server.Models;

public partial class ProformaDetail
{
    public int Id { get; set; }

    public double Quantity { get; set; }

    public double Tva { get; set; }

    public double UnitPrice { get; set; }

    public double TotalHt { get; set; }

    public int IdProforma { get; set; }

    public int IdArticle { get; set; }

    public int? IdNeedGroup { get; set; }

    public virtual Article IdArticleNavigation { get; set; } = null!;

    public virtual NeedGroup? IdNeedGroupNavigation { get; set; }

    public virtual Proforma IdProformaNavigation { get; set; } = null!;
}
