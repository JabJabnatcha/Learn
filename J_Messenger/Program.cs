using Microsoft.EntityFrameworkCore;
using J_Messenger.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

// เพิ่มบรรทัดนี้ เพื่อบอกโปรเจกต์ว่ามี DbContext และจะเชื่อมกับฐานข้อมูลยังไง
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
