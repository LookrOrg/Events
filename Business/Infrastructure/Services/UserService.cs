using Domain.Entity;
using Infrastructure.Interface.User;

namespace Infrastructure.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> GetUserByEmail(string email, string password)
    {
        return await _userRepository.GetUserByEmail(email, password);
    }

    public async Task<User> GetUserByUserId(string userId, string ip)
    {
        var user = await _userRepository.GetUserByUserId(userId, ip);
        return user;
    }

    public async Task<User> GetUserByHandle(string handle)
    {
        var user = await _userRepository.GetUserByHandle(handle);
        return user;
    }

    public async Task<User> CreateUser(string name, string lastName, string email, string password, string phone,
        string ip, string? handle = null)
    {
        if (handle == null) handle = "@" + name[0] + lastName[0];
        else if (!handle.StartsWith("@")) return null;
        var user = await _userRepository.AddUser(handle, name, lastName, email, password, phone, ip);
        return user;
    }

    public async Task<User> ChangeEmail(string userId, string oldEmail, string newEmail)
    {
        if (!string.IsNullOrEmpty(userId) || !string.IsNullOrEmpty(oldEmail) || !string.IsNullOrEmpty(newEmail))
        {
            if (!oldEmail.Equals(newEmail, StringComparison.CurrentCultureIgnoreCase))
            {
                var user = await _userRepository.ChangeEmail(userId, oldEmail, newEmail);
                return user;
            }
            return null;
        }
        return null;
    }
}