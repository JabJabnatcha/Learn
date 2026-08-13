namespace MyAwesomeApi.Domain.Entities;

public class Customer
{
    public string Name { get; set; }
    public Customer(string name) { Name = name; }
    public virtual double GetDiscountRate() => 0.0;
}

public class VipCustomer : Customer
{
    public VipCustomer(string name) : base(name) {}
    public override double GetDiscountRate() => 0.10;
}

public class GoldCustomer : Customer
{
    public GoldCustomer(string name) : base(name) {}
    public override double GetDiscountRate() => 0.05;
}
