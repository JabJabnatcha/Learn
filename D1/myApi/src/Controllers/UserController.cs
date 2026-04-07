using Microsoft.AspNetCore.Mvc;
using myApi.Models;
using myApi.Services;

namespace myApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        // 🔥 Dependency Injection
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        // ✅ GET: api/user
        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        // ✅ POST: api/user
        [HttpPost]
        public ActionResult<User> CreateUser(User user)
        {
            var created = _userService.Add(user);
            return Ok(created);
        }
    }
}