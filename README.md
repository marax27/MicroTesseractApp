## Useful Docker commands

Build an image:

```
docker build -f MicroTesseractApp.Web/Dockerfile -t mtapp .
```

Run a container:

```
docker run -d -p 32100:80 mtapp
```
