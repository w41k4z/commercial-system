
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace server.Controllers;

[ApiController]
[Route("api/testemail")]
public class TeatEmailController : ControllerBase
{

    [HttpGet]
    public IActionResult GetAll()
    {
        try
        {
            // Sender's email address and credentials
            string senderEmail = "kelydoda758@gmail.com";
            string password = "vbue urgy bohg kemq";
            
            // Recipient's email address
            string recipientEmail = "kelydoda724@gmail.com";

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(senderEmail);
            mail.To.Add(new MailAddress(recipientEmail));
            mail.Subject = "Demande de Proforma";

            // Email content with product/service details
            mail.Body = @"
                Cher/Chère [Nom du destinataire],

                J'espère que vous allez bien.

                Nous sommes intéressés par vos produits/services et souhaiterions recevoir une proforma pour les articles suivants :

                1. Papier A4, 350 unités
                2. [Nom du produit/service], [quantité]

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

            // Create an SMTP client
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Port = 587; // Use the appropriate port for your SMTP server
            smtpClient.Credentials = new NetworkCredential(senderEmail, password);
            smtpClient.EnableSsl = true; // Enable SSL/TLS
            
            // Send the email
            smtpClient.Send(mail);
           return Ok("Email sent successfully.");
        }
        catch (Exception ex)
        {
            return Ok($"Failed to send email: {ex.Message}");
        }
    }
}