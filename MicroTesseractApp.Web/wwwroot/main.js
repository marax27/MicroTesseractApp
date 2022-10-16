function createTextNode(tagName, innerText, classes = []) {
  const element = document.createElement(tagName);
  element.innerText = innerText;
  classes.forEach((className) => element.classList.add(className));
  return element;
}

function createParent(tagName, childNode) {
  const element = document.createElement(tagName);
  element.appendChild(childNode);
  return element;
}

function isEmptyOrWhitespace(str) {
  return !str || !str.trim();
}

function updateOcrResults(ocrResult) {
  const outputElement = document.getElementById("ocrResults");
  const { filename, meanConfidence, text } = ocrResult;

  const finalText = isEmptyOrWhitespace(text) ? "n/a" : text;

  const children = [
    createParent("p", createTextNode("strong", filename)),
    createParent(
      "p",
      createTextNode("strong", `Mean confidence: ${meanConfidence}`)
    ),
    createTextNode("div", finalText, ["text-results-block"]),
  ];

  outputElement.innerHTML = "";
  children.forEach((child) => outputElement.appendChild(child));
}

function onFileInputChange(input) {
  console.log("onFileInputChange");
  const fileCount = input.files.length;
  const submitButton = document.getElementsByClassName("submit-button")[0];
  submitButton.disabled = fileCount === 0;

  if (fileCount > 0) {
    const el = document.getElementById("afterSubmitButton");
    el.innerText = "File ready to send.";
  }
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
