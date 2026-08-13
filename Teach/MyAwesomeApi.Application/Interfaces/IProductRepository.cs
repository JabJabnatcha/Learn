using MyAwesomeApi.Domain.Entities;

namespace MyAwesomeApi.Application.Interfaces;

public interface IProductRepository
{
    IEnumerable<DomainProduct> GetAll();
    void Add(DomainProduct product);
}
