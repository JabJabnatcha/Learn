public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _employeeRepository;

    public EmployeeService(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }

    public IEnumerable<Employee> GetALLEmployee()
    {
        return _employeeRepository.GetALL();
    }

    public Employee GetEmployeeById(int id)
    {
        var employee = _employeeRepository.GetById(id);
        if (employee == null)
        {
            throw new ArgumentException("Invalid employee ID.");
        }
        return employee;
    }

    public void AddEmployee(Employee employee)
    {
        if (employee == null)
        {
            throw new ArgumentNullException(nameof(employee), "Employee cannot be null.");
        }
        if (string.IsNullOrWhiteSpace(employee.Name))
        {
            throw new ArgumentException("Employee name cannot be empty.");
        }
        _employeeRepository.add(employee);
    }
}