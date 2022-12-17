namespace Infrastructure.Interface;

public interface IJwtService
{
    public string  GenerateToken(Guid userId);
}