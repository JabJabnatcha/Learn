using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace J_Messenger.Models
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            // แก้ตามการเชื่อมต่อ MSSQL ของคุณเอง เช่น SQL Server บนเครื่อง
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=J_MessengerDb;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
