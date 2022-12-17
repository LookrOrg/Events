using Api.DTO.Auth;
using Infrastructure.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IJwtService _jwtService;

        public AuthController(IJwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto user)
        {
            var token = _jwtService.GenerateToken(new Guid());
            return Ok(token);
        }
    }
}
