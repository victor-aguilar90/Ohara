# API de Gestão Escolar

Este servidor é uma API criada com **Express.js**, **SQLite3** e outras dependências para fornecer serviços de login, gerenciamento de declarações e consulta de alunos. Siga os passos abaixo para configurar o ambiente de desenvolvimento e rodar o servidor localmente.

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados no seu computador:

1. **Node.js** (versão 16 ou superior)
   - Baixe e instale o Node.js em [https://nodejs.org/](https://nodejs.org/).
2. **NPM** (gerenciador de pacotes do Node.js)
   - O NPM é instalado automaticamente com o Node.js.

## Passo a Passo para Configuração

1. **Clonar o Repositório**

   Caso ainda não tenha o código, clone o repositório do servidor:

   ```bash
   git clone https://url-do-seu-repositorio.git
   cd nome-do-diretorio

2. **Baixar pacotes**
Aí vc dá um _npm install_ (mas talvez alguns pacotes precisem ser instalados via terminal manualmente, mas ele vai dar erro nos pacotes que faltas)

3. **ip**
nas partes de alguns arquivos que já tem a api rodando como no index, vc vai achar um const response = await fetch('http://192.168.43.205:3000/login', { // IP do servidor backend
vc precisa trocar a parte do ip _192.168.43.205_ pelo ip da SUA MAQUINA.

4**arquivo .db**

voce tambem vai achar no arquivo server esta linha _const db = new sqlite3.Database('/home/orcus/db/ohara.db', sqlite3.OPEN_READWRITE, (err) => {_

ela é responsavel por fazer o link com o banco, vou subir o arquivo .db ee vc altera essa rota de pastas para o local onde esta o arquivo no SEU PC.

e para rodar o servidor dê um **npx ts-node server.ts** dentro da pasta serve


  
