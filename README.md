# AlienBlaster

A simple browser game with a C# ASP.NET Core backend and a SQL Server (MSSQL) database.  
Highscores are stored using Entity Framework Core.

---

## `appsettings.json`

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=yourserver;Database=yourdb;User Id=youruser;Password=yourpass;Encrypt=True;TrustServerCertificate=True;"
  },
  "AllowedHosts": "*"
}
