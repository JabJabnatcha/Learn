using Microsoft.AspNetCore.Mvc;
using J_Messenger.Models;
using System.Threading.Tasks;
using System.Linq;

namespace J_Messenger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/user
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }

        // POST: api/user
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User newUser)
        {
            if (string.IsNullOrEmpty(newUser.Username))
            {
                return BadRequest("Username is required.");
            }

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = newUser.Id }, newUser);
        }
    }
}
