using MyAwesomeApi.Application.Interfaces;

namespace MyAwesomeApi.Infrastructure.Notifications;

public class EmailSender : INotificationSender
{
    public void Send(string r, string m) => Console.WriteLine($"[EMAIL SENT] To {r}: {m}");
}

public class SmsSender : INotificationSender
{
    public void Send(string r, string m) => Console.WriteLine($"[SMS SENT] To {r}: {m}");
}
