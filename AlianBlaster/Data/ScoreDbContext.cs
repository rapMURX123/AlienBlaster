using System.Collections.Generic;
using AlianBlaster.Models;
using Microsoft.EntityFrameworkCore;

namespace AlianBlaster.Data
{
    public class ScoreDbContext : DbContext
    {
        public ScoreDbContext(DbContextOptions<ScoreDbContext> options) : base(options) { }

        public DbSet<ScoreEntry> Scores { get; set; }
    }
}
