using System.ComponentModel.DataAnnotations;

namespace Api.DTO.Auth;

public class LoginDto
{
    [Required]
    [MinLength(6, ErrorMessage = "L'email è troppo corta, min 6 caratteri!")]
    [MaxLength(50, ErrorMessage = "la mail è troppo lunga, max 50 caratteri!")]
    [EmailAddress] //TODO: Aggiungi il regex per la mail! 
    public string email { get; set; }
    [Required]
    [MinLength(8, ErrorMessage = "La password è troppo corta! Minimo 8 caratteri")]
    [MaxLength(50,ErrorMessage = "Lunghezza massima superata! Massimo 50 caratteri")]
    //TODO: Aggiungi il regex per la password
    public string password { get; set; }
}