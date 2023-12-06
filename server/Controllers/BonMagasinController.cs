
using Microsoft.AspNetCore.Mvc;
using server.Models;
using System.Text.Json;

namespace server.Controllers;

[ApiController]
[Route("api/bonmagasin")]
public class BonMagasinController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public BonMagasinController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("entree/data")]
    public IActionResult GetDataEntree()
    {
        var fournisseurs = _dbContext.Suppliers.ToList();
        var articles = _dbContext.Articles.ToList();
        var personnels = _dbContext.VAccounts.ToList();
        var magasins = _dbContext.Magasins.ToList();
        var bonentrees = _dbContext.BonEntrees.ToList();
        var combinedLists = new
        {
            fournisseurs = fournisseurs,
            articles = articles,
            personnels = personnels,
            magasins = magasins,
            bonentrees = bonentrees
        };
        return Ok(combinedLists);
    }

    [HttpGet("sortie/data")]
    public IActionResult GetDataSortie()
    {
        var articles = _dbContext.Articles.ToList();
        var personnels = _dbContext.VAccounts.ToList();
        var magasins = _dbContext.Magasins.ToList();
        var bonsorties = _dbContext.BonSorties.ToList();
        var combinedLists = new
        {
            articles = articles,
            personnels = personnels,
            magasins = magasins,
            bonsorties = bonsorties
        };
        return Ok(combinedLists);
    }

    [HttpPost("entree")]
    public IActionResult InsertEntree([FromBody] JsonElement data)
    {
        if (data.TryGetProperty("idmagasin", out JsonElement idmagasinE) &&
            data.TryGetProperty("dateentree", out JsonElement dateentreeE) &&
            data.TryGetProperty("idfournisseur", out JsonElement idfournisseurE) &&
            data.TryGetProperty("idremis", out JsonElement idremisE) &&
            data.TryGetProperty("idrecu", out JsonElement idrecuE) &&
            data.TryGetProperty("details", out JsonElement detailsE)) 
        {
            var idmagasin = Int32.Parse(idmagasinE.GetString());
            var dateentree = DateOnly.Parse(dateentreeE.GetString());
            var idfournisseur = Int32.Parse(idfournisseurE.GetString());
            var idremis = Int32.Parse(idremisE.GetString());
            var idrecu = Int32.Parse(idrecuE.GetString());
            var details = detailsE.EnumerateArray();
            var be = new BonEntree();
            be.IdMagasin = idmagasin;
            be.DateEntree = dateentree;
            be.IdSupplier = idfournisseur;
            be.IdRemisPar = idremis;
            be.IdRecuPar = idrecu;
            _dbContext.Add(be);
            _dbContext.SaveChanges();
            foreach (var detail in details)
            {
                if (detail.TryGetProperty("idarticle", out JsonElement idarticleE) &&
                    detail.TryGetProperty("quantite", out JsonElement quantiteE) &&
                    detail.TryGetProperty("observation", out JsonElement observationE))
                {
                    var idarticle = Int32.Parse(idarticleE.GetString());
                    var quantite = Double.Parse(quantiteE.GetString());
                    var observation = observationE.GetString();
                    var bed = new BonEntreeDetail();
                    bed.IdBonEntree = be.Id;
                    bed.IdArticle = idarticle;
                    bed.Quantite = quantite;
                    bed.Observation = observation;
                    _dbContext.Add(bed);
                    _dbContext.SaveChanges();
                }
            }
            return Ok("OK");
        }
        return BadRequest("Invalid data received");
    }

    [HttpPost("sortie")]
    public IActionResult InsertSortie([FromBody] JsonElement data)
    {
        if (data.TryGetProperty("idmagasin", out JsonElement idmagasinE) &&
            data.TryGetProperty("datesortie", out JsonElement datesortieE) &&
            data.TryGetProperty("idremis", out JsonElement idremisE) &&
            data.TryGetProperty("iddemande", out JsonElement iddemandeE) &&
            data.TryGetProperty("details", out JsonElement detailsE)) 
        {
            var idmagasin = Int32.Parse(idmagasinE.GetString());
            var datesortie = DateOnly.Parse(datesortieE.GetString());
            var idremis = Int32.Parse(idremisE.GetString());
            var iddemande = Int32.Parse(iddemandeE.GetString());
            var details = detailsE.EnumerateArray();
            var bs = new BonSortie();
            bs.IdMagasin = idmagasin;
            bs.DateSortie = datesortie;
            bs.IdDemande = iddemande;
            bs.IdRemis = idremis;
            _dbContext.Add(bs);
            _dbContext.SaveChanges();
            foreach (var detail in details)
            {
                if (detail.TryGetProperty("idarticle", out JsonElement idarticleE) &&
                    detail.TryGetProperty("quantitedemande", out JsonElement quantitedemandeE) &&
                    detail.TryGetProperty("quantitelivre", out JsonElement quantitelivreE) &&
                    detail.TryGetProperty("prixunitaire", out JsonElement prixunitaireE))
                {
                    var idarticle = Int32.Parse(idarticleE.GetString());
                    var quantitedemande = Double.Parse(quantitedemandeE.GetString());
                    var quantitelivre = Double.Parse(quantitelivreE.GetString());
                    var prixunitaire = Double.Parse(prixunitaireE.GetString());
                    var bsd = new BonSortieDetail();
                    bsd.IdArticle = idarticle;
                    bsd.IdBonSortie = bs.Id;
                    bsd.QuantiteDemande = quantitedemande;
                    bsd.QuantiteLivre = quantitelivre;
                    bsd.PrixUnitaire = prixunitaire;
                    bsd.Total = bsd.PrixUnitaire*bsd.QuantiteLivre;
                    _dbContext.Add(bsd);
                    _dbContext.SaveChanges();
                }
            }
            return Ok("OK");
        }
        return BadRequest("Invalid data received");
    }

    [HttpPost("entree/voir")]
    public IActionResult GetEntree([FromQuery] string id){
        var bonentree = _dbContext.VBonEntrees.Where(v => v.Id==Int32.Parse(id)).First();
        var details = _dbContext.VBonEntreeDetails.Where(v => v.IdBonEntree==bonentree.Id).ToList();
        var combinedLists = new
        {
            bonentree = bonentree,
            details = details
        };
        return Ok(combinedLists);
    }

    [HttpPost("sortie/voir")]
    public IActionResult GetSortie([FromQuery] string id){
        var bonsortie = _dbContext.VBonSorties.Where(v => v.Id==Int32.Parse(id)).First();
        var details = _dbContext.VBonSortieDetials.Where(v => v.IdBonSortie==bonsortie.Id).ToList();
        var combinedLists = new
        {
            bonsortie = bonsortie,
            details = details
        };
        return Ok(combinedLists);
    }



}