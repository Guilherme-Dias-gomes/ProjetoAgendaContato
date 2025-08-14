<h1>Agenda de Contatos Mobile</h1>

Aplicativo mobile desenvolvido em React Native com Expo para gerenciar uma agenda de contatos integrada a um backend Java Spring Boot.

O app permite:

Criar (Insert): Adicionar novos contatos

Ler (Select): Visualizar a lista de contatos

Atualizar (Update): Modificar informações de um contato

Deletar (Delete): Remover contatos

<h1>Pré-requisitos</h1>

Antes de rodar o projeto, certifique-se de ter instalado:

Node.js (versão LTS recomendada)

Yarn ou npm

Expo CLI

Android Studio + Android Virtual Device (AVD) configurado (para emulador) / Dispositivo físico Android (opcional) com o app Expo Go instalado

(Caso queira rodar no dispositivo físico, ambos (PC e celular) devem estar conectados à mesma rede Wi-Fi.)

Passo 1: Clonar o repositório

cd NOME_DO_REPOSITORIO/front-end

Passo 2: Instalar dependências

No diretório do front-end:

npm install
# ou
yarn install

Passo 3: Configurar o endpoint da API

Edite o arquivo index.tsx para definir o endereço do backend:

const API_URL = "http://SEU_IP:8080/contato";

OBS: como a API esta rodando localmente é necessario alterar o ip da URL para comunicar o front com o back-end. Se mesmo rodando ainda não conecta, possivelmente é bloqueio do firewall o projeto esta configurado para redes privadas.


Para testes em rede local: use o IP da máquina que está rodando o backend

Passo 4: Rodar o app no emulador Android

Abra o Android Studio

Configure um Android Virtual Device (AVD)

No terminal do projeto front-end:

npx expo start


Pressione "A" no terminal para abrir o app no emulador Android

Passo 5: Rodar no dispositivo físico

Instale o app Expo Go no seu Android

No terminal do projeto:

npx expo start


Escaneie o QR code exibido no navegador ou terminal com o Expo Go

Passo 6: Usar o aplicativo

Adicionar contato: clique em “+ Novo Contato”

Editar contato: clique no botão “Editar” do card do contato

Excluir contato: clique no botão “Excluir”

Filtrar contatos: use a barra de pesquisa pelo nome

Observações

Certifique-se de que o backend esteja rodando e acessível pelo endpoint configurado
