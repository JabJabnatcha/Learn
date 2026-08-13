using Microsoft.Extensions.DependencyInjection;
using MyAwesomeApi.Application.Interfaces;
using MyAwesomeApi.Application.Services;
using MyAwesomeApi.Infrastructure.Persistence;
using MyAwesomeApi.Infrastructure.Payments;
using MyAwesomeApi.Infrastructure.Notifications;
using MyAwesomeApi.Infrastructure.Services;

namespace MyAwesomeApi.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddTransient<INotificationSender, EmailSender>();
        
        // Lesson 6 (SRP)
        services.AddTransient<TaxCalculator>();
        services.AddTransient<OrderRepository>();
        services.AddTransient<EmailService>();

        // Lesson 6 (OCP) & Lesson 7 (DIP)
        services.AddTransient<IPaymentGateway, StripeGateway>();

        // Lesson 9 & 10: Lifetimes
        services.AddTransient<ITransientService, TransientService>();
        services.AddScoped<IScopedService, ScopedService>();
        services.AddSingleton<ISingletonService, SingletonService>();

        // Lesson 12: Repository Pattern
        services.AddSingleton<IProductRepository, InMemoryProductRepository>();

        return services;
    }
}
