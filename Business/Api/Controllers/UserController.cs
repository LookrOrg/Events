using Infrastructure.Interface.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId")?.ToString();
            var ip = HttpContext.Connection.RemoteIpAddress!.ToString();
            if (userId == null) return BadRequest("UserId nullo!");
            var user = _userService.GetUserWithUserId(userId, ip);
            return Ok(userId);
        }
    }
}
