namespace MyAwesomeApi.Application.Services;

public abstract class ReportGenerator
{
    public Action<string>? OnLog { get; set; }
    public void GenerateReport()
    {
        OnLog?.Invoke("1. Database Connection Opened.");
        var rawData = FetchData();
        var formatted = FormatReport(rawData);
        OnLog?.Invoke($"2. Formatted: {formatted}");
        OnLog?.Invoke("3. Database Connection Closed.");
    }
    protected abstract string FetchData();
    protected abstract string FormatReport(string rawData);
}

public class FinancialReportGenerator : ReportGenerator
{
    protected override string FetchData() => "Financial ledger rows";
    protected override string FormatReport(string rawData) => $"[PDF-Report] Styled: {rawData}";
}
