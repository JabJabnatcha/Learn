namespace MyAwesomeApi.Domain.Entities;

public class Product
{
    private double _price;
    public double Price
    {
        get => _price;
        set => _price = value >= 0 ? value : 0;
    }
}
