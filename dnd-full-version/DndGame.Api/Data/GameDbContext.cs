using Microsoft.EntityFrameworkCore;
using DndGame.Api.Entities;

namespace DndGame.Api.Database;

public class GameDbContext : DbContext
{
    public GameDbContext(DbContextOptions<GameDbContext> options)
        : base(options)
    {
    }

    public DbSet<Character> Characters { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Character>(entity =>
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(x => x.Race)
                .HasMaxLength(50);

            entity.Property(x => x.CharacterClass)
                .HasMaxLength(50);
        });
    }
}