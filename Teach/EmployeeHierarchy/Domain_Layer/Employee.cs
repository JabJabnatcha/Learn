public abstract class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Salary { get; set; }
    public string Department { get; set; }
    public DateTime HireDate { get; set; }
    public Employee(string name, int id)
    {
        Name = name;
        Id = id;
        Salary = 0;
    }
    public abstract decimal CalculateSalary();
}