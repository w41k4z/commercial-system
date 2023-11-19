# Project init

$ dotnet new webapi (project [directory] name optional)

# EF core installation

$ dotnet add package Microsoft.EntityFrameworkCore --version 6.0.4 (This is the EF Core version for .Net 6.0.4).

$ dotnet add package Microsoft.EntityFrameworkCore.Design --version 6.0.4 (Allows the Entity Framework Core tools to inspect the database, generate code, and scaffold the DbContext and entity classes accordingly).

$ dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 6.0.4 (Npgsql is the Entity Framework Core provider for PostgreSQL).

$ dotnet add package Microsoft.EntityFrameworkCore.Proxies --version 6.0.4 (For Lazy loading).

- The Dotnet EF CLI is a useful tool

  To install:

  $ dotnet tool install --global dotnet-ef --version 6.0.4.

  To scaffold:

  $ dotnet ef dbcontext scaffold "Name=ConnectionStrings:DefaultConnection" Npgsql.EntityFrameworkCore.PostgreSQL --output-dir Models --context CommercialSystemContext --context-dir Context --no-build
