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
}