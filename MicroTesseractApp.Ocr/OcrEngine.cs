using Tesseract;

namespace MicroTesseractApp.Ocr;

public record OcrProcessingResult(
    float MeanConfidence,
    string Text
);

public class OcrEngine : IDisposable
{
    private TesseractEngine _engine;

    public OcrEngine(string tesseractDataDirectory)
    {
        _engine = new(tesseractDataDirectory, "eng", EngineMode.Default);
    }

    public OcrProcessingResult ProcessFile(byte[] fileBytes)
    {
        using var image = Pix.LoadFromMemory(fileBytes);
        using var page = _engine.Process(image);

        var text = page.GetText();

        return new(page.GetMeanConfidence(), text);
    }

    public void Dispose()
    {
        _engine?.Dispose();
        _engine = null!;
    }
}
