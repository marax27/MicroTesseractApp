var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseHttpsRedirection();

app.MapGet("/hello", () =>
{
    return new[]{"Hello!"};
});

app.Run();
