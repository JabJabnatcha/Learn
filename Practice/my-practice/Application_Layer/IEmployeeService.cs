public interface IEmployeeService
{
    IEnumerable<Employee> GetALLEmployee();
    Employee GetEmployeeById(int id);
    void AddEmployee(Employee employee);
}