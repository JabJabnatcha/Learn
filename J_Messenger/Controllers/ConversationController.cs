using Microsoft.AspNetCore.Mvc;
using J_Messenger.Models;

namespace J_Messenger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConversationController : ControllerBase
    {
        // Mock ข้อมูลตัวอย่าง (ในอนาคตค่อยเชื่อม DB)
        private static List<Conversation> conversations = new List<Conversation>
        {
            new Conversation { Id = 1, Name = "General" },
            new Conversation { Id = 2, Name = "Project X" }
        };

        // GET: api/conversation
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(conversations);
        }

        // GET: api/conversation/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var convo = conversations.FirstOrDefault(c => c.Id == id);
            if (convo == null)
                return NotFound();

            return Ok(convo);
        }

        // POST: api/conversation
        [HttpPost]
        public IActionResult Create([FromBody] Conversation conversation)
        {
            if (conversation == null || string.IsNullOrWhiteSpace(conversation.Name))
                return BadRequest("Invalid conversation data");

            conversation.Id = conversations.Max(c => c.Id) + 1;
            conversations.Add(conversation);
            return CreatedAtAction(nameof(GetById), new { id = conversation.Id }, conversation);
        }

        // DELETE: api/conversation/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var convo = conversations.FirstOrDefault(c => c.Id == id);
            if (convo == null)
                return NotFound();

            conversations.Remove(convo);
            return NoContent();
        }
    }
}
