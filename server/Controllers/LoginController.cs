
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("api/login")]
public class LoginController : ControllerBase
{
    private readonly CommercialSystemContext _dbContext;

    public LoginController(CommercialSystemContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public IActionResult Login([FromQuery] string email, [FromQuery] string password)
    {
        var account = _dbContext.VAccounts.FirstOrDefault(x => x.Email == email && x.Password == password);
        if (account != null)
        {
            account.Password = "";
            var combinedLists = new
            {
                Status = "OK",
                Account = account
            };
            return Ok(combinedLists);
        }
        var combinedList = new
        {
            Status = "Bad Informations Given",
        };
        return Ok(combinedList);
    }
}