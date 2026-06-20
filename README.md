# OCR With JavaScript

A simple web demo that uses JavaScript and Tesseract.js to read text from an
image or webcam frame. The project supports both **English** and **Khmer** OCR.

## What Is OCR?

OCR means **Optical Character Recognition**. It converts text inside an image
into editable digital text.

## Features

- Image to text OCR
- Camera to text OCR
- English and Khmer support
- Copy extracted text
- Flip camera option
- Simple responsive design

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Home page |
| `image-demo.html` | Image OCR page |
| `image-demo.js` | Image OCR logic |
| `camera-demo.html` | Camera OCR page |
| `camera-demo.js` | Camera OCR logic |
| `style.css` | Page styling |

## Language Setting

```js
Tesseract.createWorker("eng+khm")
```

`eng` is for English and `khm` is for Khmer.

## How To Run

Open `index.html` in a browser.

For the camera demo, use a local server such as VS Code **Live Server** because
camera access works best on `localhost` or HTTPS.

## Notes

- Clear printed text gives the best result.
- Blurry images and handwriting may be inaccurate.
- Use the Flip Camera button if the laptop webcam looks reversed.
- The first OCR scan may be slow because the language models need to load.
- Internet is required because Tesseract.js is loaded from a CDN.
