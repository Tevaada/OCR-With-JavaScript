window.addEventListener("load", async () => {
  const fileInput = document.getElementById("fileIn");
  const textOutput = document.getElementById("textOut");
  const statusText = document.getElementById("status");
  const copyButton = document.getElementById("copyBtn");
  const clearButton = document.getElementById("clearBtn");
  const previewImage = document.getElementById("previewImg");
  const previewText = document.getElementById("previewText");
  let previewUrl = "";

  statusText.textContent = "Loading OCR engine...";

  const worker = await Tesseract.createWorker("eng+khm");

  statusText.textContent = "Choose an image to start.";

  fileInput.addEventListener("change", async () => {
    const imageFile = fileInput.files[0];

    if (!imageFile) {
      statusText.textContent = "No image selected.";
      previewImage.removeAttribute("src");
      previewImage.hidden = true;
      previewText.hidden = false;
      return;
    }

    textOutput.value = "";
    copyButton.disabled = true;
    statusText.textContent = "Reading text from image...";
    previewText.hidden = true;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    previewUrl = URL.createObjectURL(imageFile);
    previewImage.src = previewUrl;
    previewImage.hidden = false;

    try {
      const result = await worker.recognize(imageFile);
      textOutput.value = result.data.text.trim();
      copyButton.disabled = textOutput.value === "";
      statusText.textContent = "OCR finished.";
    } catch (error) {
      statusText.textContent = "Sorry, OCR failed. Try another image.";
      console.error(error);
    }
  });

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(textOutput.value);
    statusText.textContent = "Text copied to clipboard.";
  });

  clearButton.addEventListener("click", () => {
    fileInput.value = "";
    textOutput.value = "";
    copyButton.disabled = true;
    previewImage.removeAttribute("src");
    previewImage.hidden = true;
    previewText.hidden = false;
    statusText.textContent = "Choose an image to start.";

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      previewUrl = "";
    }
  });
});
