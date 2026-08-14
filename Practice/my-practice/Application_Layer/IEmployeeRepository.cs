public interface IEmployeeRepository
{
    IEnumerable<Employee> GetALL();
    Employee GetById(int id);
    void add(Employee employee);
}