using Domain.Entity;
using Infrastructure.Interface.User;

namespace Infrastructure.Services;

public class UserService: IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> GetUserWithEmail(string email, string password)
    {
        return await _userRepository.GetUserByEmail(email, password);
    }

    public async Task<User> CreateUser(string name, string lastName, string email, string password, string phone, string ip, string? handle = null)
    {
        if (handle == null) handle = "@" + name[0] + lastName[0];
        else if (!handle.StartsWith("@")) return null;
        var user = await _userRepository.AddUser(handle, name,lastName, email, password, phone, ip);
        return user;
    }
}