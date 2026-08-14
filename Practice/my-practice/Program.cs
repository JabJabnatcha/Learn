var employee = new Employee_Fulltime("john doe", 1, 75000);
Console.WriteLine($"Employee Name: {employee.Name}");
Console.WriteLine($"Employee Salary: {employee.CalculateSalary()}");

var parttimeEmployee = new Employee_Parttime("jane doe", 2, 20, 30);
Console.WriteLine($"Parttime Employee Name: {parttimeEmployee.Name}");
Console.WriteLine($"Parttime Employee Salary: {parttimeEmployee.CalculateSalary()}");

var contractorEmployee = new Employee_Contractor("jack doe", 3, 25, 40);
Console.WriteLine($"Contractor Employee Name: {contractorEmployee.Name}");
Console.WriteLine($"Contractor Employee Salary: {contractorEmployee.CalculateSalary()}");
