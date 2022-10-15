#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

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
