
using Microsoft.AspNetCore.Mvc;
using server.Models;

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

    // [HttpGet]
    // public IActionResult GetEntities()
    // {
    //     var besoinAGrouper = _dbContext.VBesoinAGroupers.ToList();
    //     foreach (var bag in besoinAGrouper)
    //     {
    //         var groupeNonProformer = _dbContext.NeedGroups
    //             .Where(v => !_dbContext.NeedGroupProformaSends.Select(n => n.IdNeedGroup).Contains(v.Id))
    //             .FirstOrDefault();
    //         if (groupeNonProformer != null)
    //         {
    //             groupeNonProformer.Quantity += (long)bag.Quantity;
    //             if(groupeNonProformer.FinalDateNeed.CompareTo(bag.DateNeed)>0){
    //                 groupeNonProformer.FinalDateNeed = (DateOnly)bag.DateNeed;
    //             }
    //             _dbContext.Update(groupeNonProformer);
    //         }
    //         else
    //         {
    //             groupeNonProformer = new NeedGroup();
    //             groupeNonProformer.Numero = "NG" + bag.IdNeedDetails;
    //             groupeNonProformer.IdArticle = (int)bag.IdArticle;
    //             groupeNonProformer.Quantity = (double)bag.Quantity;
    //             groupeNonProformer.FinalDateNeed = (DateOnly)bag.DateNeed;
    //             _dbContext.Add(groupeNonProformer);
    //         }
    //     }
    //     _dbContext.SaveChanges();
        
    //     return Ok("entities");
    // }
}