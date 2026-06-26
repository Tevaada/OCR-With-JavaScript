# OCR With JavaScript

A simple image-to-text web demo that uses JavaScript and Tesseract.js to read
text from an uploaded image. The project supports both **English** and **Khmer**
OCR.

## What Is OCR?

OCR means **Optical Character Recognition**. It converts text inside an image
into editable digital text.

## Features

- Image to text OCR
- English and Khmer support
- Copy extracted text
- Simple responsive design

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Image OCR page |
| `css/style.css` | Page styling |
| `js/app.js` | Image OCR logic |

## Language Setting

```js
Tesseract.createWorker("eng+khm")
```

`eng` is for English and `khm` is for Khmer.

## How To Run

Open `index.html` in a browser.

## Notes

- Clear printed text gives the best result.
- Blurry images and handwriting may be inaccurate.
- The first OCR scan may be slow because the language models need to load.
- Internet is required because Tesseract.js is loaded from a CDN.
