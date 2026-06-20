window.addEventListener("load", async () => {
  const cameraVideo = document.getElementById("camFeed");
  const readButton = document.getElementById("camGo");
  const flipButton = document.getElementById("flipBtn");
  const copyButton = document.getElementById("copyBtn");
  const clearButton = document.getElementById("clearBtn");
  const textOutput = document.getElementById("textOut");
  const statusText = document.getElementById("status");
  let cameraFlipped = false;

  statusText.textContent = "Loading OCR engine...";

  const worker = await Tesseract.createWorker("eng+khm");

  try {
    statusText.textContent = "Asking for camera permission...";

    const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });

    cameraVideo.srcObject = cameraStream;
    readButton.disabled = false;
    statusText.textContent = "Camera is ready. Point it at text.";
  } catch (error) {
    statusText.textContent = "Camera failed. Allow camera permission and use localhost or HTTPS.";
    console.error(error);
  }

  readButton.addEventListener("click", async () => {
    readButton.disabled = true;
    copyButton.disabled = true;
    textOutput.value = "";
    statusText.textContent = "Capturing camera image...";

    const canvas = document.createElement("canvas");
    canvas.width = cameraVideo.videoWidth;
    canvas.height = cameraVideo.videoHeight;

    const canvasContext = canvas.getContext("2d");

    if (cameraFlipped) {
      canvasContext.translate(canvas.width, 0);
      canvasContext.scale(-1, 1);
    }

    canvasContext.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);

    try {
      statusText.textContent = "Reading text from camera image...";

      const imageFromCamera = canvas.toDataURL("image/png");
      const result = await worker.recognize(imageFromCamera);

      textOutput.value = result.data.text.trim();
      copyButton.disabled = textOutput.value === "";
      statusText.textContent = "OCR finished.";
    } catch (error) {
      statusText.textContent = "Sorry, OCR failed. Try clearer text or better lighting.";
      console.error(error);
    }

    readButton.disabled = false;
  });

  flipButton.addEventListener("click", () => {
    cameraFlipped = !cameraFlipped;
    cameraVideo.classList.toggle("flipped", cameraFlipped);
    statusText.textContent = cameraFlipped ? "Camera view flipped." : "Camera view normal.";
  });

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(textOutput.value);
    statusText.textContent = "Text copied to clipboard.";
  });

  clearButton.addEventListener("click", () => {
    textOutput.value = "";
    copyButton.disabled = true;
    statusText.textContent = "Camera is ready. Point it at text.";
  });
});
