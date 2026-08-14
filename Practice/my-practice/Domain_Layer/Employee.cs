// ==========================================
// 1. THE ABSTRACT CLASS (The container / blueprint)
public abstract class Employee
{
// ==========================================
// 2. THE PROPERTIES (The variables/data inside the object)
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Salary { get; set; }
    public string Department { get; set; }
    public DateTime HireDate { get; set; }
// ==========================================
// 3. THE CONSTRUCTOR (The setup block)
    public Employee(string name, int id)
    {
        Name = name;
        Id = id;
        Salary = 0;
    }
// ==========================================
// 4. THE ABSTRACT METHOD (The behavior contract)
    public abstract decimal CalculateSalary();
}
// ==========================================