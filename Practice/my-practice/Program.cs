using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);
//==========================================
// 1. register services
// 1.1 Register repository
builder.Services.AddSingleton<IEmployeeRepository, InMemoryEmployeeRepository>();

// 1.2 Register service
builder.Services.AddScoped<IEmployeeService ,EmployeeService>();

builder.Services.AddControllers();
builder.Services.AddAuthorization();
//==========================================

//==========================================
// 2. Configue CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();
//==========================================

//==========================================
// 3. Configure Middleware pipeline

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();

//==========================================