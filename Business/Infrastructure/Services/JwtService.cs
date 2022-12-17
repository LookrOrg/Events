using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Infrastructure.Interface;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services;

public class JwtService: IJwtService
{
    public string GenerateToken(Guid userId)
    {
        var signInCredential = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes("6A0598F5-4545-4F47-9587-E04900F51419")),
            SecurityAlgorithms.HmacSha256
            );
        
        var claims = new Claim[]
        {
            new Claim("UserId", userId.ToString())
        };

        var securityToken = new JwtSecurityToken(
            issuer: "backend-dev-events",
            audience: "http://localhost/",
            claims: claims,
            signingCredentials: signInCredential,
            expires: DateTime.Now.AddDays(1)
        );
        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
}