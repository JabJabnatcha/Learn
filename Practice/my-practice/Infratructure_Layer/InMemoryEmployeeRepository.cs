public class InMemoryEmployeeRepository : IEmployeeRepository
{
    private readonly InMemoryEmployeeRepository _employees = new InMemoryEmployeeRepository();
    public InMemoryEmployeeRepository()
    {
        _employees.add(new Employee("John Doe", 1) { Salary = 50000, Department = "IT", HireDate = new DateTime(2020, 1, 15) });

    }
}