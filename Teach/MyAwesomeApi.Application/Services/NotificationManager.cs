using MyAwesomeApi.Application.Interfaces;

namespace MyAwesomeApi.Application.Services;

public class NotificationManager
{
    private readonly INotificationSender _sender;
    public NotificationManager(INotificationSender sender) { _sender = sender; }
    public void Alert(string user, string text) => _sender.Send(user, text);
}
