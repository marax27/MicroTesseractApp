#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Install libs for Tesseract: https://stackoverflow.com/a/71066165
RUN apt-get update
RUN apt-get install -y git cmake build-essential
RUN mkdir leptonica
RUN git clone https://github.com/DanBloomberg/leptonica.git /leptonica

WORKDIR /leptonica
RUN mkdir build
WORKDIR /leptonica/build
RUN cmake ..

RUN apt-get install -y libleptonica-dev libtesseract-dev

# Link libs for Tesseract
WORKDIR /app/x64
RUN ln -s /usr/lib/x86_64-linux-gnu/liblept.so.5 libleptonica-1.80.0.so
RUN ln -s /usr/lib/x86_64-linux-gnu/libtesseract.so.4.0.1 libtesseract41.so

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MicroTesseractApp.Web/MicroTesseractApp.Web.csproj", "MicroTesseractApp.Web/"]
RUN dotnet restore "MicroTesseractApp.Web/MicroTesseractApp.Web.csproj"
COPY . .
WORKDIR "/src/MicroTesseractApp.Web"
RUN dotnet build "MicroTesseractApp.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MicroTesseractApp.Web.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
# ENV ASPNETCORE_URLS=http://+:80
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MicroTesseractApp.Web.dll"]
