public class Employee_Fulltime : Employee
{
    public Employee_Fulltime(string name, int id, decimal salary) : base(name, id)
    {
        Salary = salary;
    }

    public override decimal CalculateSalary()
    {
        return Salary;
    }
}