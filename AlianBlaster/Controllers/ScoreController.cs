using Microsoft.AspNetCore.Mvc;
using AlianBlaster.Data;
using AlianBlaster.Models;

namespace AlianBlaster.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScoresController : ControllerBase
    {
        private readonly ScoreDbContext _context;

        public ScoresController(ScoreDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostScore([FromBody] ScoreEntry entry)
        {
            _context.Scores.Add(entry);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        public IActionResult GetTopScores()
        {
            var top = _context.Scores
                .OrderByDescending(s => s.Points)
                .Take(10)
                .ToList();
            return Ok(top);
        }
    }
}
