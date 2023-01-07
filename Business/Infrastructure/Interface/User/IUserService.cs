namespace Infrastructure.Interface.User;

public interface IUserService
{
    public Task<Domain.Entity.User> GetUserByEmail(string email, string password);
    public Task<Domain.Entity.User> GetUserByUserId(string userId, string ip);
    public Task<Domain.Entity.User> GetUserByHandle(string handle);
    public Task<Domain.Entity.User> CreateUser(string name, string lastName, string email,
        string password, string phone, string ip, string? handle = null);
    public Task<Domain.Entity.User> ChangeEmail(string userId, string oldEmail, string newEmail);
}