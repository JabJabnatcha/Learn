namespace MyAwesomeApi.Application.Services;

public interface ITransientService { string InstanceId { get; } }
public interface IScopedService { string InstanceId { get; } }
public interface ISingletonService { string InstanceId { get; } }
