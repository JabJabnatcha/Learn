public class Employee_Contractor : Employee
{
    public decimal HourlyRate { get; set; }
    public int HoursWorked { get; set; }

    public Employee_Contractor(string name, int id, decimal hourlyRate, int hoursWorked) : base(name, id)
    {
        HourlyRate = hourlyRate;
        HoursWorked = hoursWorked;
    }

    public override decimal CalculateSalary()
    {
        return HourlyRate * HoursWorked;
    }
}