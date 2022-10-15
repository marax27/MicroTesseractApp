function updateOcrResults(ocrResult) {
  const outputElement = document.getElementById("ocrResults");
  const { filename, meanConfidence, text } = ocrResult;

  outputElement.innerHTML = `
    <h3>OCR Results</h3>
    <p>Filename: ${filename}</p>
    <p>Mean Confidence: ${meanConfidence}</p>
    <p>Text: ${text}</p>
  `;
}

function uploadFiles(formElement) {
  let formData = new FormData(formElement);

  fetch("/ocr", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((json) => {
      updateOcrResults(json);
    })
    .catch((err) => {
      console.error(`Something's gone wrong: ${err}`);
    });

  return false;
}
