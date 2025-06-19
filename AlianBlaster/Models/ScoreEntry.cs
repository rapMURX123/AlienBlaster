namespace AlianBlaster.Models
{
    public class ScoreEntry
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public int Points { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
