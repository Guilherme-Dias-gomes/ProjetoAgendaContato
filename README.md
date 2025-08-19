<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 20px;">

  <h1>📅 Projeto Agenda</h1>
  <p>
    Este é um projeto de <strong>Agenda</strong> desenvolvido em 
    <strong>ASP.NET Core MVC</strong> utilizando <strong>Entity Framework Core</strong> 
    para persistência de dados em <strong>SQL Server</strong>.
  </p>

  <h2>🚀 Tecnologias Utilizadas</h2>
  <ul>
    <li>ASP.NET Core MVC</li>
    <li>Entity Framework Core</li>
    <li>SQL Server</li>
    <li>Visual Studio / VS Code</li>
  </ul>

  <h2>⚙️ Configuração do Banco de Dados</h2>
  <p>
    O projeto utiliza <strong>SQL Server</strong>. 
    Para rodar localmente, configure sua string de conexão no arquivo 
    <code>appsettings.json</code>.
  </p>

  <pre style="background:#f4f4f4;padding:10px;border-radius:5px;">
"ConnectionStrings": {
  "DefaultConnection": "Server=SEU_SERVIDOR;Database=AgendaDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
  </pre>

  <p>
    Caso utilize usuário e senha, configure assim:
  </p>
  <pre style="background:#f4f4f4;padding:10px;border-radius:5px;">
"ConnectionStrings": {
  "DefaultConnection": "Server=SEU_SERVIDOR;Database=AgendaDB;User Id=SEU_USUARIO;Password=SUA_SENHA;TrustServerCertificate=True;"
}
  </pre>

  <h2>📦 Executando Migrações</h2>
  <p>
    Para criar o banco de dados via Entity Framework Core:
  </p>
  <pre style="background:#f4f4f4;padding:10px;border-radius:5px;">
dotnet ef migrations add InitialCreate
dotnet ef database update
  </pre>

  <h2>▶️ Como Rodar o Projeto</h2>
  <ol>
    <li>Clone o repositório</li>
    <li>Configure a conexão com o banco no <code>appsettings.json</code></li>
    <li>Restaure as dependências: <code>dotnet restore</code></li>
    <li>Execute as migrações: <code>dotnet ef database update</code></li>
    <li>Rode o projeto: <code>dotnet run</code></li>
    <li>Acesse no navegador: <a href="http://localhost:5000">http://localhost:5000</a></li>
  </ol>

  <h2>📖 Funcionalidades</h2>
  <ul>
    <li>Cadastro de compromissos</li>
    <li>Listagem de compromissos</li>
    <li>Edição de compromissos</li>
    <li>Exclusão de compromissos</li>
  </ul>

  <h2>👨‍💻 Autor</h2>
  <p>
    Desenvolvido por <strong>Guilherme Dias</strong>.
  </p>

</body>
</html>
