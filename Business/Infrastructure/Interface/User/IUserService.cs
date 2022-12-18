namespace Infrastructure.Interface.User;

public interface IUserService
{
    public Task<Domain.Entity.User> GetUserWithEmail(string email, string password);
}