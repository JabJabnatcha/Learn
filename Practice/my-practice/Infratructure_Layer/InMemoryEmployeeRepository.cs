public class InMemoryEmployeeRepository : IEmployeeRepository
{
    private readonly List<Employee> _employees;

    public InMemoryEmployeeRepository()
    {
        _employees = new List<Employee>();
        _employees.Add(new Employee_Fulltime("Harry Potter", 1, 50000));
        _employees.Add(new Employee_Parttime("Hermione Granger", 2, 20, 30));
        _employees.Add(new Employee_Contractor("Ron Weasley", 3, 25, 40));
        _employees.Add(new Employee_Fulltime("Draco Malfoy", 4, 60000));
        _employees.Add(new Employee_Parttime("Luna Lovegood", 5, 15, 25));
        _employees.Add(new Employee_Contractor("Neville Longbottom", 6, 30, 35));

    }
    

    public IEnumerable<Employee> GetALL()
    {
        return _employees;
    }

    public Employee GetById(int id)
    {
        foreach (var employee in _employees)
        {
            if (employee.Id == id)
            {
                return employee;
            }
        }
        return null;
    }

    public void add(Employee employee)
    {
        _employees.Add(employee);
    }
}