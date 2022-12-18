namespace Infrastructure.Interface.User;

public interface IUserRepository
{
    public Task<Domain.Entity.User> GetUserByEmail(string email, string password);
    public Task<Domain.Entity.User> GetUserByHandle(string handle, string password);
    public Task<Domain.Entity.User> GetUser(Guid id);
}