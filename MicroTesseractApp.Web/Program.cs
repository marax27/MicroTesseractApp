using MicroTesseractApp.Ocr;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(new OcrEngine(@"./tess-data"));

var app = builder.Build();

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapPost("/ocr", async (HttpRequest request, IServiceProvider services) =>
{
    var engine = services.GetRequiredService<OcrEngine>();

    var singleFile = request.Form.Files.Single();

    var target = new MemoryStream();
    await singleFile.CopyToAsync(target);

    var result = engine.ProcessFile(target.GetBuffer());

    return new OcrDto(singleFile.FileName, result.MeanConfidence, result.Text);
});

app.Run();

public record OcrDto(
    string Filename,
    float MeanConfidence,
    string Text
);
