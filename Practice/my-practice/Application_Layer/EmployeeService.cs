public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _employeeRepository;
    public EmployeeService(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }

    public IEnumerable<Employee> GetALL()
    {
        return _employeeRepository.GetALL();
    }

    public Employee GetById(int id)
    {
        if (id <= 0)
        {
            throw new ArgumentException("Invalid employee ID.");
        }
        return _employeeRepository.GetById(id);
    }

    public void add(Employee employee)
    {
        if (employee == null)
        {
            throw new ArgumentNullException(nameof(employee), "Employee cannot be null.");
        }
        _employeeRepository.add(employee);
    }
}