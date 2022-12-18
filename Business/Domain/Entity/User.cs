namespace Domain.Entity;

public class User
{
    public Guid id { get; set; } = new Guid();
    public string handle { get; set; } = string.Empty;
    public string name { get; set; } = string.Empty;
    public string lastName { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
    public string phone { get; set; } = string.Empty;
    public string roleId { get; set; } = string.Empty;
    public string ip { get; set; } = string.Empty;
}