using MyAwesomeApi.Domain.Entities;
using MyAwesomeApi.Application.Interfaces;

namespace MyAwesomeApi.Infrastructure.Persistence;

public class InMemoryProductRepository : IProductRepository
{
    private readonly List<DomainProduct> _db = new()
    {
        new DomainProduct { Id = 1, Name = "Playground Laptop", Price = 35000.00 },
        new DomainProduct { Id = 2, Name = "Architect Mouse", Price = 1200.00 }
    };

    public IEnumerable<DomainProduct> GetAll() => _db;
    public void Add(DomainProduct product) => _db.Add(product);
}
