using Domain.Entity;
using Infrastructure.Interface.User;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace Infrastructure.Repository;

public class UserRepository : IUserRepository
{
    private readonly IConfiguration Configuration;
    private readonly MySqlConnectionStringBuilder connectionString;

    public UserRepository(IConfiguration configuration)
    {
        Configuration = configuration;
        connectionString = new MySqlConnectionStringBuilder()
        {
            Server = Configuration["ConnectionStrings:Server"],
            Database = Configuration["ConnectionStrings:Database"],
            UserID = Configuration["ConnectionStrings:UserID"],
            Password = Configuration["ConnectionStrings:Password"],
        };
    }

    public async Task<User> GetUserByEmail(string email, string password)
    {
        try
        {
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
                if (!BCrypt.Net.BCrypt.Verify(password, reader.GetString(5))) return null;
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

    public async Task<User> GetUserByUserId(string userId, string ip)
    {
        try
        {
            await using var connection = new MySqlConnection(connectionString.ToString());
            await connection.OpenAsync();
            var query = $"SELECT Count(*), * FROM users WHERE id = '{userId}'";
            await using var command = new MySqlCommand(query, connection);
            await using var reader = await command.ExecuteReaderAsync();
            if (!reader.HasRows) return null;
            if (reader.GetInt32(0) != 1) return null;
            while (await reader.ReadAsync())
            {
                return new User()
                {
                    id = Guid.Parse(reader.GetString(1)),
                    handle = reader.GetString(2),
                    name = reader.GetString(3),
                    lastName = reader.GetString(4),
                    email = reader.GetString(5),
                    phone = reader.GetString(7),
                    roleId = reader.GetString(8)
                };
            }

            return null;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<User> GetUserByHandle(string handle)
    {
        try
        {
            await using var connection = new MySqlConnection(connectionString.ToString());
            await connection.OpenAsync();
            const string query = $"SELECT Count(U.id), U.id, U.name, U.lastName, U.email, U.phone FROM users as U;";
            await using var command = new MySqlCommand(query, connection);
            await using var reader = await command.ExecuteReaderAsync();
            if (!reader.HasRows) return null;
            if (reader.GetInt32(0) != 1) return null;
            while (await reader.ReadAsync())
            {
                return new User()
                {
                    id = Guid.Parse(reader.GetString(1)),
                    name = reader.GetString(2),
                    lastName = reader.GetString(3),
                    email = reader.GetString(4),
                    phone = reader.GetString(5)
                };
            }

            return null;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<User> AddUser(string handle, string name, string lastName, string email, string password,
        string phone, string ip)
    {
        try
        {
            await using var connection = new MySqlConnection(connectionString.ToString());
            await connection.OpenAsync();

            #region ID RUOLO UTENTE

            var query = "SELECT id FROM role WHERE name = 'utente'";
            var userRoleId = string.Empty;
            await using (var cmd = new MySqlCommand(query, connection))
            {
                await using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        userRoleId = reader.GetString(0);
                    }
                }
            }

            #endregion

            #region INSERISCO L'UTENTE

            query =
                $"INSERT INTO users(handle, name, lastName, email, password, phone, roleId, ip) VALUE('{handle}','{name}','{lastName}','{email}','{BCrypt.Net.BCrypt.HashPassword(password)}','{phone}','{userRoleId}','{ip}')";
            await using (var cmd2 = new MySqlCommand(query, connection))
            {
                await using (var reader = await cmd2.ExecuteReaderAsync())
                {
                    if (reader.RecordsAffected != 1) return null;
                }
            }

            #endregion

            #region Prendo dati dell'utente

            query = $"SELECT * FROM Users WHERE handle = '{handle}'";
            await using (var cmd3 = new MySqlCommand(query, connection))
            {
                await using (var reader = await cmd3.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        return new User()
                        {
                            id = Guid.Parse(reader.GetString(0)),
                            handle = reader.GetString(1),
                            name = reader.GetString(2),
                            lastName = reader.GetString(3),
                            email = reader.GetString(4),
                            password = reader.GetString(5),
                            phone = reader.GetString(6),
                            roleId = reader.GetString(7),
                            ip = reader.GetString(8),
                        };
                    }
                }
            }

            #endregion

            return null;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<User> ChangeEmail(string userId, string oldEmail, string newEmail)
    {
        try
        {
            await using var connection = new MySqlConnection(connectionString.ToString());
            await connection.OpenAsync();
            string query = $"SELECT * FROM users WHERE id = '${oldEmail}'";
            await using var command = new MySqlCommand(query, connection);
            await using var reader = await command.ExecuteReaderAsync();
            User user = new User();
            if (!reader.HasRows) return null;
            while (await reader.ReadAsync())
            {
                user = new User
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
            }

            query = $"UPDATE users SET email = '${newEmail}' WHERE id = '${user.id}'";
            await using var command2 = new MySqlCommand(query, connection);
            await using var reader2 = await command2.ExecuteReaderAsync();
            if (reader.RecordsAffected != 1) return null;
            user.email = newEmail;
            return user;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}