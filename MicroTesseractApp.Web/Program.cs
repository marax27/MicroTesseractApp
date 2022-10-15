var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapPost("/ocr", (HttpRequest request) =>
{
    var fileNames = request.Form.Files.Select(f => f.FileName);
    return fileNames;
});

app.Run();
