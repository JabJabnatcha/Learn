using Microsoft.AspNetCore.Mvc;
using J_Messenger.Models;

namespace J_Messenger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private static List<User> users = new List<User>
        {
            new User { Id = 1, Username = "Alice" },
            new User { Id = 2, Username = "Bob" }
        };

        [HttpGet]
        public IActionResult GetAll() => Ok(users);
    }
}
