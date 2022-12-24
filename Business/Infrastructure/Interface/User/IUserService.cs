namespace Infrastructure.Interface.User;

public interface IUserService
{
    public Task<Domain.Entity.User> GetUserWithEmail(string email, string password);
    public Task<Domain.Entity.User> GetUserWithUserId(string userId, string ip);
    public Task<Domain.Entity.User> CreateUser(string name, string lastName, string email,
        string password, string phone, string ip, string? handle = null);
}