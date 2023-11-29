
using Microsoft.AspNetCore.Mvc;
using server.Models;
using System.Text.Json;

namespace server.Controllers;

[ApiController]
[Route("api/enattenteproforma")]
public class EnAttenteProformaController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public EnAttenteProformaController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var v_proforma_sends = _dbContext.VProformaSends.ToList();
        var proformaEnAttentes = new List<ProformaEnAttente>();
        foreach (var v_proforma_send in v_proforma_sends)
        {
            var proformaEnAttente = new ProformaEnAttente();
            proformaEnAttente.vProformaSend = v_proforma_send;
            proformaEnAttente.vProformaSendNeedGroups = _dbContext.VProformaSendNeedGroups.Where(v => v.IdProformaSend == v_proforma_send.Id).ToList();
            proformaEnAttentes.Add(proformaEnAttente);
        }
        var combinedLists = new
        {
            proformaEnAttentes = proformaEnAttentes
        };
        return Ok(combinedLists);
    }


    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var v_proforma_send = _dbContext.VProformaSends.Where(v => v.Id == id).First();
        var proformaEnAttente = new ProformaEnAttente();
        proformaEnAttente.vProformaSend = v_proforma_send;
        proformaEnAttente.vProformaSendNeedGroups = _dbContext.VProformaSendNeedGroups.Where(v => v.IdProformaSend == v_proforma_send.Id).ToList();
        var combinedLists = new
        {
            proformaEnAttente = proformaEnAttente
        };
        return Ok(combinedLists);
    }


    [HttpPost]
    public IActionResult CreateProforma([FromBody] JsonElement data)
    {
        if (data.TryGetProperty("date_received", out JsonElement dateReceivedElement) &&
            data.TryGetProperty("total_ht", out JsonElement totalHtElement) &&
            data.TryGetProperty("id_proforma_send", out JsonElement idProformaSendElement) &&
            data.TryGetProperty("total_tva", out JsonElement totalTvaElement) &&
            data.TryGetProperty("total_ttc", out JsonElement totalTtcElement) &&
            data.TryGetProperty("details", out JsonElement detailsElement))
        {
            var date_received = DateOnly.Parse(dateReceivedElement.GetString());
            var id_proforma_send = Int32.Parse(idProformaSendElement.GetString());
            var total_ht = Double.Parse(totalHtElement.GetString());
            var total_tva = Double.Parse(totalTvaElement.GetString());
            var total_ttc = Double.Parse(totalTtcElement.GetString());
            var p = new Proforma();
            p.DateReceived = date_received;
            p.IdProformaSend = id_proforma_send;
            p.TotalHt = total_ht;
            p.TotalTva = total_tva;
            p.TotalTtc = total_ttc;
            _dbContext.Add(p);
            _dbContext.SaveChanges();
            var details = detailsElement.EnumerateArray();
            foreach (var detail in details)
            {
                if (detail.TryGetProperty("id_article", out JsonElement idArticleElement) &&
                    detail.TryGetProperty("id_need_group", out JsonElement idNeedGroupElement) &&
                    detail.TryGetProperty("quantity", out JsonElement quantityElement) &&
                    detail.TryGetProperty("unit_price", out JsonElement unitPriceElement) &&
                    detail.TryGetProperty("tva", out JsonElement tvaElement) &&
                    detail.TryGetProperty("montan_ht", out JsonElement montanHtElement))
                {
                    var id_article = Int32.Parse(idArticleElement.GetString());
                    var id_need_group = Int32.Parse(idNeedGroupElement.GetString());
                    var quantity = Double.Parse(quantityElement.GetString());
                    var unit_price = Double.Parse(unitPriceElement.GetString());
                    var tva = Double.Parse(tvaElement.GetString());
                    var montan_ht = Double.Parse(montanHtElement.GetString());
                    var pd = new ProformaDetail();
                    pd.IdArticle = id_article;
                    pd.IdProforma = p.Id;
                    pd.Quantity = quantity;
                    pd.UnitPrice = unit_price;
                    pd.Tva = tva;
                    pd.TotalHt = montan_ht;
                    pd.IdNeedGroup = id_need_group;
                    _dbContext.Add(pd);
                    _dbContext.SaveChanges();
                }
            }
            p.Numero = "PRF" + p.Id;
            _dbContext.Update(p);
            _dbContext.SaveChanges();
        }
        return Ok("Invalid data received");
    }
}