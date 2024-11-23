# API de Gestão Escolar

Este servidor é uma API criada com **Express.js**, **SQLite3** e outras dependências para fornecer serviços de login, gerenciamento de declarações e consulta de alunos. Siga os passos abaixo para configurar o ambiente de desenvolvimento e rodar o servidor localmente.

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados no seu computador:

1. **Node.js** (versão 16 ou superior)
   - Baixe e instale o Node.js em [https://nodejs.org/](https://nodejs.org/).
2. **NPM** (gerenciador de pacotes do Node.js)
   - O NPM é instalado automaticamente com o Node.js.

## Passo a Passo para Configuração

### 1. **Clonar o Repositório**

Caso ainda não tenha o código, clone o repositório do servidor:

```bash
git clone https://url-do-seu-repositorio.git
cd nome-do-diretorio
```

### 2. **Baixar pacotes**

Instale as dependências com o comando:

```bash
npm install
```

> **Nota:** Alguns pacotes podem precisar ser instalados manualmente. Se houver erros de pacotes ausentes, instale-os diretamente pelo terminal.

### 3. **Configurar o IP**

Em alguns arquivos da API, como no arquivo `index.js`, você encontrará uma linha semelhante a esta:

```js
const response = await fetch('http://192.168.43.205:3000/login', { // IP do servidor backend
```

Substitua o IP **192.168.43.205** pelo IP da sua máquina local. Para encontrar o seu IP, você pode executar o comando:

```bash
ip a
```

### 4. **Configurar o Banco de Dados**

No arquivo `server.js`, você encontrará a linha abaixo, que define o caminho para o banco de dados SQLite:

```js
const db = new sqlite3.Database('/home/orcus/db/ohara.db', sqlite3.OPEN_READWRITE, (err) => {
```

Altere o caminho do arquivo `.db` para o local onde o banco de dados está salvo em sua máquina. Você pode obter o arquivo `.db` e colocar no diretório adequado. Caso precise, altere a rota de pastas conforme o seu sistema.

### 5. **Rodar o Servidor**

Para rodar o servidor, execute o seguinte comando dentro da pasta do projeto:

```bash
npx ts-node server.ts
```

O servidor agora estará rodando localmente. Você poderá acessar os endpoints da API conforme necessário.
