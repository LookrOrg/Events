using Api.DTO.Auth;
using Infrastructure.Interface;
using Infrastructure.Interface.User;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IJwtService _jwtService;
        private readonly IUserService _userService;
        public AuthController(IJwtService jwtService, IUserService userService)
        {
            _jwtService = jwtService;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto userDto)
        {
            var result = CheckEmailAndPassword(userDto.email, userDto.password);
            if (!result) return BadRequest("Email o Password mancanti!");
            var user = await _userService.GetUserWithEmail(userDto.email, userDto.password);
            if (user == null) return NotFound("Errore nel prendere i dati dell'utente");
            var token = _jwtService.GenerateToken(user.id);
            return Ok(new {token, user});
        }

        /// <summary>
        /// Questo metodo permette di controllare se email e password sono presenti
        /// </summary>
        /// <param name="email">Email dell'utente</param>
        /// <param name="password">Password dell'utente</param>
        /// <return>true: email e password corrette</return>
        /// <return>false: email o password mancanti </return>
        private static bool CheckEmailAndPassword(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrWhiteSpace(email))
                return false;
            return !string.IsNullOrEmpty(password) && !string.IsNullOrWhiteSpace(password);
        }
    }
}
