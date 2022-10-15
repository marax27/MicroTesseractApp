function uploadFiles(formElement) {
  let formData = new FormData(formElement);

  const outputElement = document.getElementById("ocrResults");

  fetch("/ocr", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((json) => {
      outputElement.innerText = JSON.stringify(json);
    })
    .catch((err) => {
      console.error(`Something's gone wrong: ${err}`);
    });

  return false;
}
