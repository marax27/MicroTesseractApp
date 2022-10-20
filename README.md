# MicroTesseractApp

## Getting started

Docker Hub: https://hub.docker.com/r/marax27/micro-tesseract-app

1. Run the image: `docker run -d -p 32100:80 marax27/micro-tesseract-app`
2. Visit _http://localhost:32100_
3. Select an image: either drag & drop an image or press _Browse..._ and choose a file from disk.
4. Press _Submit_.
5. The OCR results should appear on the right side of the page.

## Building locally

Build an image:

```
docker build -f MicroTesseractApp.Web/Dockerfile -t mtapp .
```

Run a container:

```
docker run -d -p 32100:80 mtapp
```
