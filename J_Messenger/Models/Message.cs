// File: Models/Message.cs
namespace J_Messenger.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int ConversationId { get; set; }
        public string Sender { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
