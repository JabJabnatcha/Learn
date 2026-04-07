namespace myApi.Models
{
    public class User
    {
        public int Id { get; set; } // Primary key อยากให้ runing number ต้องทำไง
        public string Name { get; set; } = "";
        public string LastName { get; set; } = "";
        public required int Age { get; set; }
    }
}