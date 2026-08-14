public class Employee_Parttime : Employee
{
    public decimal ParttimeRate { get; set; } 
    public int WorktimeHours { get; set; }

    public Employee_Parttime(string name, int id, decimal parttimeRate, int worktimeHours): base(name, id)
    {
        ParttimeRate = parttimeRate;
        WorktimeHours = worktimeHours;      
    }

    public override decimal CalculateSalary()
    {

        return ParttimeRate * WorktimeHours;
    }
}