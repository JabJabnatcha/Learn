using Microsoft.AspNetCore.Mvc;
using J_Messenger.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace J_Messenger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : Controller
    {
        // Mock data จำลองฐานข้อมูล
        private static List<Message> messages = new List<Message>
        {
            new Message { Id = 1, ConversationId = 1, Sender = "Alice", Content = "Hello!", Timestamp = DateTime.UtcNow },
            new Message { Id = 2, ConversationId = 1, Sender = "Bob", Content = "Hi Alice!", Timestamp = DateTime.UtcNow }
        };

        // GET: api/message?conversationId=1
        [HttpGet]
        public IActionResult GetByConversation([FromQuery] int conversationId)
        {
            var result = messages.Where(m => m.ConversationId == conversationId).ToList();
            return Ok(result);
        }

        // GET: api/message/1
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var message = messages.FirstOrDefault(m => m.Id == id);
            if (message == null) return NotFound();
            return Ok(message);
        }

        // POST: api/message
        [HttpPost]
        public IActionResult Create([FromBody] Message message)
        {
            if (message == null || string.IsNullOrWhiteSpace(message.Content))
                return BadRequest("Invalid message data");

            message.Id = messages.Any() ? messages.Max(m => m.Id) + 1 : 1;
            message.Timestamp = DateTime.UtcNow;
            messages.Add(message);

            return CreatedAtAction(nameof(GetById), new { id = message.Id }, message);
        }

        // DELETE: api/message/1
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var message = messages.FirstOrDefault(m => m.Id == id);
            if (message == null) return NotFound();

            messages.Remove(message);
            return NoContent();
        }

        // Action สำหรับเรียก View ที่ /Message/Index
        [HttpGet]
        [Route("/Message")] // หรือจะไม่ใส่ก็ได้ ถ้าใช้ Default Routing
        public IActionResult Index()
        {
            return View();
        }
    }
}
