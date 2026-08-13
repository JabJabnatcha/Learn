using MyAwesomeApi.Application;
using MyAwesomeApi.Infrastructure;
using MyAwesomeApi.Middlewares;
using MyAwesomeApi.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// =========================================================================
// 1. SERVICES REGISTRATION (IOC CONTAINER)
// =========================================================================
builder.Services.AddOpenApi();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

// Clean registers using Clean Architecture DI extension methods
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices();

var app = builder.Build();

// =========================================================================
// 2. HTTP REQUEST PIPELINE & MIDDLEWARE CONFIGURATION
// =========================================================================
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseStaticFiles(); // Serve frontend assets

// Custom Middleware registration
app.UseMiddleware<ApiKeyMiddleware>();

// =========================================================================
// 3. MINIMAL API ENDPOINTS (PRESENTATION LAYER)
// =========================================================================
app.MapLessons();

app.Run();
