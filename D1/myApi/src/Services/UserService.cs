using myApi.Models;

namespace myApi.Services
{
    public class UserService
    {
        private static List<User> users = new List<User>();
        private static int currentId = 1;

        public List<User> GetAll()
        {
            return users;
        }

        public User Add(User newUser)
        {
            newUser.Id = currentId++;
            users.Add(newUser);
            return newUser;
        }
    }
}