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
            if (userId == null) return BadRequest("UserId nullo!");
            var ip = HttpContext.Connection.RemoteIpAddress!.ToString();
            var user = await _userService.GetUserByUserId(userId, ip);
            if (user == null) return NotFound("Utente non trovato!");
            return Ok(user);
        }

        [HttpGet("handle/{handle}")]
        public async Task<IActionResult> GetUserByHandle(string handle)
        {
            if (!handle.StartsWith('@')) return BadRequest("L'Handle deve iniziare sempre con la @");
            var user = await _userService.GetUserByHandle(handle);
            return Ok(user);
        }
        
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangeEmail([FromBody] string oldEmail, [FromBody] string newEmail)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type.Equals("UserId"))?.ToString();
            if (userId == null) return BadRequest("jwt non valido, UserId non trovato");
            var user = await _userService.ChangeEmail(userId, oldEmail, newEmail);
            if (user == null) return BadRequest("Qualcosa è andato storto!");
            return Ok(user);
        }
        
    }
}
