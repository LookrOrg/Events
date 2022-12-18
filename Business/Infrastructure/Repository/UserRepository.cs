using Domain.Entity;
using Infrastructure.Interface.User;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace Infrastructure.Repository;

public class UserRepository : IUserRepository
{
    private readonly IConfiguration Configuration;


    public UserRepository(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public async Task<User> GetUserByEmail(string email, string password)
    {
        try
        {
            var connectionString = new MySqlConnectionStringBuilder()
            {
                Server = Configuration["ConnectionStrings:Server"],
                Database = Configuration["ConnectionStrings:Database"],
                UserID = Configuration["ConnectionStrings:UserID"],
                Password = Configuration["ConnectionStrings:Password"],
            };

            await using var connection = new MySqlConnection(connectionString.ToString());
            await connection.OpenAsync();
            var query = $"SELECT *, count(*) FROM users WHERE email = '{email}'";
            await using var command = new MySqlCommand(query, connection);
            await using var reader = await command.ExecuteReaderAsync();
            if (!reader.HasRows)
            {
                await connection.CloseAsync();
                return null;
            }

            while (await reader.ReadAsync())
            {
                if (reader.GetInt32(9) != 1) return null;
                //if (!BCrypt.Net.BCrypt.EnhancedVerify(password, reader.GetString(5))) return null;
                var user = new User
                {
                    id = Guid.Parse(reader.GetString(0)),
                    handle = reader.GetString(1),
                    name = reader.GetString(2),
                    lastName = reader.GetString(3),
                    email = reader.GetString(4),
                    password = reader.GetString(5),
                    phone = reader.GetString(6),
                    roleId = reader.GetString(7),
                    ip = reader.GetString(8)
                };
                await connection.CloseAsync();
                return user;
            }

            await connection.CloseAsync();
            return null;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
            throw;
        }
    }

    public Task<User> GetUserByHandle(string handle, string password)
    {
        throw new NotImplementedException();
    }

    public Task<User> GetUser(Guid id)
    {
        throw new NotImplementedException();
    }
}