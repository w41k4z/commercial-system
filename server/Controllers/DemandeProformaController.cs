
using Microsoft.AspNetCore.Mvc;
using server.Models;
using System.Text.Json;
using System.Net;
using System.Net.Mail;

namespace server.Controllers;

[ApiController]
[Route("api/demandeproforma")]
public class DemandeProformaController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public DemandeProformaController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetEntities()
    {
        var besoinAGrouper = _dbContext.VBesoinAGroupers.ToList();
        foreach (var bag in besoinAGrouper)
        {
            var groupeNonProformer = _dbContext.NeedGroups
                .Where(v => !_dbContext.ProformaSendNeedGroups.Select(n => n.IdNeedGroup).Contains(v.Id) && v.IdArticle == bag.IdArticle)
                .FirstOrDefault();
            if (groupeNonProformer != null)
            {
                groupeNonProformer.Quantity += (long)bag.Quantity;
                if (groupeNonProformer.FinalDateNeed.CompareTo(bag.DateNeed) > 0)
                {
                    groupeNonProformer.FinalDateNeed = (DateOnly)bag.DateNeed;
                }
                _dbContext.Update(groupeNonProformer);
                var ngn = new NeedGroupNeed();
                ngn.IdNeedDetails = (int)bag.IdNeedDetails;
                ngn.IdNeedGroup = groupeNonProformer.Id;
                _dbContext.Add(ngn);
                _dbContext.SaveChanges();
            }
            else
            {
                groupeNonProformer = new NeedGroup();
                groupeNonProformer.Numero = "NG" + bag.IdNeedDetails;
                groupeNonProformer.IdArticle = (int)bag.IdArticle;
                groupeNonProformer.Quantity = (double)bag.Quantity;
                groupeNonProformer.FinalDateNeed = (DateOnly)bag.DateNeed;
                _dbContext.Add(groupeNonProformer);
                _dbContext.SaveChanges();
                var ngn = new NeedGroupNeed();
                ngn.IdNeedDetails = (int)bag.IdNeedDetails;
                ngn.IdNeedGroup = groupeNonProformer.Id;
                _dbContext.Add(ngn);
            }
        }
        var besoinaafficher = _dbContext.VBesoinAAffichers.ToList();
        var groupebesoinaafficher = _dbContext.VGroupNonProformers.ToList();
        var fournisseurs = _dbContext.Suppliers.ToList();
        var groupebesoinproformer = _dbContext.VGroupProformers.ToList();
        var besoinProformers = new List<BesoinProformer>();
        foreach (var gbp in groupebesoinproformer)
        {
            var bp = new BesoinProformer();
            bp.vGroupProformer = gbp;
            var bpdetails = _dbContext.VGroupProformerDetails.Where(v => v.Id == gbp.Id).ToList();
            bp.vGroupProformerDetails = bpdetails;
            besoinProformers.Add(bp);
        }
        var combinedLists = new
        {
            BesoinAAfficher = besoinaafficher,
            GroupNonProformers = groupebesoinaafficher,
            Fournisseurs = fournisseurs,
            BesoinProformers = besoinProformers
        };
        return Ok(combinedLists);
    }

    [HttpPost]
    public IActionResult CreateProformaSend([FromBody] JsonElement data)
    {
        if (data.ValueKind == JsonValueKind.Object &&
            data.TryGetProperty("dateenvoie", out JsonElement dateenvoieElement) &&
            data.TryGetProperty("idfournisseur", out JsonElement idfournisseurElement) &&
            data.TryGetProperty("besoins", out JsonElement besoinsElement) &&
            dateenvoieElement.ValueKind == JsonValueKind.String &&
            idfournisseurElement.ValueKind == JsonValueKind.String &&
            besoinsElement.ValueKind == JsonValueKind.Array)
        {
            var dateenvoie = dateenvoieElement.GetString();
            var idfournisseur = idfournisseurElement.GetString();
            var besoins = besoinsElement.EnumerateArray().Select(x => x.GetInt32()).ToList();
            if (besoins.Count != 0 && besoins.Distinct().Count() == besoins.Count)
            {
                var ps = new ProformaSend();
                ps.DateSend = DateOnly.Parse(dateenvoie);
                ps.IdSupplier = Int32.Parse(idfournisseur);
                _dbContext.Add(ps);
                _dbContext.SaveChanges();
                foreach (var item in besoins)
                {
                    var psd = new ProformaSendNeedGroup();
                    psd.IdProformaSend = ps.Id;
                    psd.IdNeedGroup = item;
                    _dbContext.Add(psd);
                    _dbContext.SaveChanges();
                }
                ps.Numero = "ENV" + ps.Id;
                _dbContext.Update(ps);
                _dbContext.SaveChanges();

                // Email
                var supplier = _dbContext.Suppliers.Where(x => x.Id == ps.IdSupplier).First();
                var details = _dbContext.VArticleEmails.Where(x => x.Id == ps.Id).ToList();
                var pdetails = "";
                var i = 1;
                foreach (var detail in details)
                {
                    pdetails += i + ". " + detail.Name + ", "+ detail.Quantity + " "+ detail.Unit + "\n";
                    i++;
                }
                try
                {
                    string senderEmail = "kelydoda758@gmail.com";
                    string password = "vbue urgy bohg kemq";
                    string recipientEmail = "kelydoda724@gmail.com";

                    MailMessage mail = new MailMessage();
                    mail.From = new MailAddress(senderEmail);
                    mail.To.Add(new MailAddress(recipientEmail));
                    mail.Subject = "Demande de Proforma";

                    mail.Body = $@"
Cher/Chère {supplier.Name},

J'espère que vous allez bien.

Nous sommes intéressés par vos produits/services et souhaiterions recevoir une proforma pour les articles suivants :

{pdetails}

Veuillez nous fournir une proforma détaillée comprenant les informations suivantes pour chaque article :
- Description détaillée des produits/services
- Quantité
- Prix unitaire
- Total hors taxes (HT)
- TVA applicable, le cas échéant
- Total toutes taxes comprises (TTC)
- Conditions de paiement et de livraison

Si possible, nous aimerions également connaître les délais de livraison estimés.

Merci d'avance pour votre attention à cette demande. Nous attendons votre proforma avec impatience.

Cordialement,

[Votre nom]
[Votre poste ou fonction]
[Nom de votre entreprise]
[Coordonnées de contact]
";

                    SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Port = 587; 
                    smtpClient.Credentials = new NetworkCredential(senderEmail, password);
                    smtpClient.EnableSsl = true;

                    smtpClient.Send(mail);
                    return Ok("OK");
                }
                catch (Exception ex)
                {
                    return Ok($"Failed to send email: {ex.Message}");
                }
                //
            }
            else
            {
                return Ok("Invalid data received");
            }
        }
        return Ok("Invalid data received");
    }

}