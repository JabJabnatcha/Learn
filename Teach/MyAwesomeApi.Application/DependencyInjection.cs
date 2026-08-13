using Microsoft.Extensions.DependencyInjection;
using MyAwesomeApi.Application.Services;

namespace MyAwesomeApi.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddTransient<NotificationManager>();
        services.AddTransient<CheckoutService>();
        services.AddTransient<GoodOrderService>();
        services.AddTransient<BadOrderService>();
        
        return services;
    }
}
