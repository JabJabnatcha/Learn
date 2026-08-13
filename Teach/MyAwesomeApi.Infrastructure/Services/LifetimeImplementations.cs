using MyAwesomeApi.Application.Services;

namespace MyAwesomeApi.Infrastructure.Services;

public class TransientService : ITransientService 
{ 
    public string InstanceId { get; } = Guid.NewGuid().ToString().Substring(0, 8); 
}

public class ScopedService : IScopedService 
{ 
    public string InstanceId { get; } = Guid.NewGuid().ToString().Substring(0, 8); 
}

public class SingletonService : ISingletonService 
{ 
    public string InstanceId { get; } = Guid.NewGuid().ToString().Substring(0, 8); 
}
