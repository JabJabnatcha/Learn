using System.Text.Json;

namespace MyAwesomeApi.Middlewares;

public class ApiKeyMiddleware
{
    private readonly RequestDelegate _next;

    public ApiKeyMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path.StartsWithSegments("/lesson5/secure-data"))
        {
            if (!context.Request.Headers.TryGetValue("X-Api-Key", out var apiKey) || apiKey != "Secret_123")
            {
                context.Response.StatusCode = 401; // Unauthorized
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(JsonSerializer.Serialize(new { Error = "API Key is missing or invalid. Set header X-Api-Key: Secret_123" }));
                return; // Short-circuit
            }
        }
        await _next(context);
    }
}
