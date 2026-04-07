var builder = WebApplication.CreateBuilder(args);

// 🔥 register service (Dependency Injection)
builder.Services.AddSingleton<myApi.Services.UserService>();

// 🔥 controller
builder.Services.AddControllers();

// 🔥 swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 🔥 swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// (optional แต่ควรมี)
app.UseHttpsRedirection();

app.UseAuthorization();

// 🔥 map controller
app.MapControllers();

app.Run();