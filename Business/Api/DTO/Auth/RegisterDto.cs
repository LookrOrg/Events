using System.ComponentModel.DataAnnotations;
using Domain.Entity;
using Infrastructure.ValidValue;

namespace Api.DTO.Auth;

public class RegisterDto
{
    public string? handle { get; set; }

    [Required] public string name { get; set; } = string.Empty;
    [Required] public string lastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress(ErrorMessage = "La mail inserita deve essere valida!")]
    [MinLength(ValidValueUser.MinLengthEmail)]
    [MaxLength(ValidValueUser.MaxLenghtEmail)]
    public string email { get; set; } = string.Empty;

    [Required]
    [MinLength(ValidValueUser.MinLengthPassword)]
    [MaxLength(ValidValueUser.MaxLengthPassword)]
    public string password { get; set; } = string.Empty;

    [Required]
    [Phone]
    [MinLength(ValidValueUser.MinLengthPhone)]
    [MaxLength(ValidValueUser.MaxLengthPhone)]
    public string phone { get; set; } = string.Empty;
}