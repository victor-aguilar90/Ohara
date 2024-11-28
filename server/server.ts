import express, { Request, Response, NextFunction } from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import cors from 'cors';
import emailjs from 'emailjs-com';  // Importando o emailjs
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config(); // Carrega as variáveis de ambiente

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const app = express();
const port = 3000;


// Usando o middleware CORS
app.use(cors({
  origin: ['http://192.168.86.205:3000', 'http://localhost:3000', '*']  // Altere conforme sua configuração
}
));
app.use(express.json());


// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('/home/orcus/db/ohara.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});

// Criar a tabela de declarações, caso não exista
db.run(`
  CREATE TABLE IF NOT EXISTS declaracoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    protocolo TEXT UNIQUE,
    motivo TEXT,
    status TEXT
  )
`, (err) => {
  if (err) {
    console.error('Erro ao criar tabela de declarações:', err.message);
  }
});

// Interface de Aluno
interface Aluno {
  id: number;
  nome: string;
  data_nascimento: string;
  endereco: string;
  telefone: string;
  email: string;
  data_matricula: string;
  nome_responsavel: string;
  contato_responsavel: string;
  status_estudante: string;
  turmas: string;
  cod_etec: number;
  senha: string;
  rm: number;
  token?: string;
}

export interface Biblioteca {
  id: number;                      // Identificador único
  biblioterio: string;             // Nome do bibliotecário ou referência
  rm: number;                      // RM do bibliotecário
  senha: string;                   // Senha de acesso
  titulo: string;                  // Título do item na biblioteca
  autor: string;                   // Autor do item
  descricao?: string;              // Descrição do item (opcional)
  quantidade_disponivel: number;   // Quantidade disponível do item
  url_imagem?: string;             // URL da imagem do item (opcional)
  token?: string;                  // Token JWT (opcional)
}


// Função para login do aluno
function login(username: string, password: string, callback: (error: Error | null, user?: any | null) => void): void {
  db.get("SELECT * FROM alunos WHERE rm = ?", [username], (error: Error | null, user: Aluno | undefined) => {
    if (error) {
      callback(error);
      return;
    }

    if (!user) {
      // Se o usuário não existir na tabela alunos, tenta na biblioteca
      checkLibraryLogin(username, password, callback);
      return;
    }

    bcrypt.compare(password, user.senha, (err: Error | undefined, result: boolean) => {
      if (err) {
        callback(err);
        return;
      }
      console.log('Resultado da comparação de senha: ', result); 

      if (result) {
        const token = jwt.sign({ id: user.id, rm: user.rm }, JWT_SECRET, { expiresIn: '1h' });
        callback(null, { ...user, token });
      } else {
        callback(null, null);
      }
    });
  });
}

// Função para verificar login na API da biblioteca
function checkLibraryLogin(username: string, password: string, callback: (error: Error | null, user?: any | null) => void): void {
  fetch('http://192.168.86.205:3000/biblioteca/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        callback(null, data);
      } else {
        callback(null, null);
      }
    })
    .catch(err => callback(err));
}
// Função de login
function loginBiblioteca(
  username: string,
  password: string,
  callback: (error: Error | null, user?: Biblioteca | null) => void
): void {
  db.get("SELECT * FROM biblioteca WHERE rm = ?", [username], (error: Error | null, user: Biblioteca | undefined) => {
    if (error) {
      callback(error);
      return;
    }

    if (!user) {
      callback(null, null); // Caso o usuário não exista
      return;
    }

    // Verifica a senha usando bcrypt
    bcrypt.compare(password, user.senha, (err: Error | undefined, result: boolean) => {
      if (err) {
        callback(err);
        return;
      }

      if (result) {
        // Gera o token JWT
        const token = jwt.sign(
          { id: user.id, rm: user.rm, biblioterio: user.biblioterio },
          JWT_SECRET,
          { expiresIn: '1h' }
        );

        // Retorna o usuário e o token
        callback(null, { ...user, token });
      } else {
        callback(null, null); // Senha incorreta
      }
    });
  });
}


app.post('/login/biblioteca', (req: Request, res: Response): void => {
  const { username, password } = req.body;

  loginBiblioteca(username, password, (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }

    if (user) {
      const { senha, ...userData } = user; // Remove a senha antes de retornar
      res.status(200).json({
        message: 'Login bem-sucedido!',
        token: user.token,
        bibliotecario: userData, // Retorna os dados do bibliotecário sem a senha
      });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas!' });
    }
  });
});
function verifyBibliotecaToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['authorization']?.split(' ')[1]; // Extrair o token do header

  if (!token) {
    console.log('Token não fornecido');
    return ;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token inválido');
      return res.status(401).json({ message: 'Token inválido!' });
    }

    req.body.user = decoded; // Salva os dados do usuário no corpo da requisição
    next(); // Chama a próxima função no middleware
  });
}


app.get('/mee', verifyBibliotecaToken, (req: Request, res: Response) => {
  const userId = req.body.user.id; // ID do usuário logado

  db.get("SELECT * FROM biblioteca WHERE id = ?", [userId], (err, row: Biblioteca) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar dados do bibliotecário', error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: 'Bibliotecário não encontrado' });
    }

    res.status(200).json(row); // Retorna os dados do bibliotecário
  });
});



// Middleware para logar todas as requisições recebidas
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Recebendo requisição para: ${req.method} ${req.url}`);
  next();
});

// Middleware para configurar CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Ajuste conforme necessário
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  console.log('CORS configurado para:', req.headers.origin);
  next();
});

// Rota de login
app.post('/login', (req: Request, res: Response): void => {
  const { username, password } = req.body;
  
  login(username, password, (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }

    if (user) {
      const { senha, ...userData } = user;
      res.status(200).json({
        message: 'Login bem-sucedido!',
        token: user.token,
        aluno: userData,
      });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas!' });
    }
  });
});





// Função para enviar e-mail via EmailJS
function enviarEmailConfirmacao(motivo: string, protocolo: string, email: string) {
  const templateParams = {
    to_email: email,
    motivo: motivo,
    protocolo: protocolo,
  };

  // Configuração do envio de e-mail
  emailjs.send('service_0olh7hf', 'template_y4ax7dq', templateParams, 'N2GxcYN1TzFCSO92h')
    .then((response) => {
      console.log('E-mail enviado com sucesso', response);
    })
    .catch((err) => {
      console.error('Erro ao enviar o e-mail:', err);
    });
}

// Rota para solicitar a declaração

app.post('/solicitar-declaracao', verifyToken, (req: Request, res: Response): void => {
  const { motivo } = req.body; // Recebe o motivo da solicitação
  const protocolo = 'PROTOCOLO-' + Math.floor(Math.random() * 1000000); // Gera um protocolo único
  const status = 'Em processamento'; // Status inicial da solicitação

  const rmAluno = req.body.user.rm; // Recupera o RM do aluno autenticado via JWT

  console.log(`Aluno com RM ${rmAluno} solicitando declaração com protocolo ${protocolo}`);

  // Inserir a solicitação de declaração no banco de dados
  db.run(
    "INSERT INTO declaracoes (protocolo, motivo, status, rm_aluno) VALUES (?, ?, ?, ?)", 
    [protocolo, motivo, status, rmAluno], 
    function(err) {
      if (err) {
        console.error('Erro ao registrar declaração:', err.message);
        return res.status(500).json({ message: 'Erro ao registrar declaração', error: err.message });
      }

      console.log('Declaração registrada com sucesso');
      res.status(200).json({ 
        message: 'Declaração solicitada com sucesso', 
        protocolo, 
        status 
      });
    }
  );
});


// Interface de Declaração
interface Declaracao {
  status: string;
}

// Rota para consultar a declaração pelo protocolo
app.get('/minhas-declaracoes', verifyToken, (req: Request, res: Response): void => {
  const rmAluno = req.body.user.rm; // RM do aluno autenticado

  db.all(
    "SELECT protocolo, motivo, status FROM declaracoes WHERE rm_aluno = ?", 
    [rmAluno], 
    (err, rows) => {
      if (err) {
        console.error('Erro ao buscar declarações:', err.message);
        return res.status(500).json({ message: 'Erro ao buscar declarações', error: err.message });
      }

      res.status(200).json({
        message: 'Declarações recuperadas com sucesso',
        declaracoes: rows
      });
    }
  );
});

// Rota para atualizar o status de uma declaração
app.put('/atualizar-status/:protocolo', (req: Request, res: Response): void => {
  const { protocolo } = req.params;
  const { status } = req.body;

  db.run("UPDATE declaracoes SET status = ? WHERE protocolo = ?", [status, protocolo], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar status', error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Declaração não encontrada' });
    }

    res.status(200).json({ message: 'Status atualizado com sucesso' });
  });
});

// Middleware para verificar o token JWT
function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['authorization']?.split(' ')[1]; // Extrair o token do header

  if (!token) {
    console.log('Token não fornecido');
    res.status(403).json({ message: 'Token não fornecido!' });
    return;  // Aqui você pode retornar para interromper a execução da função
  }

  console.log('Verificando o token:', token);  // Log do token que está sendo verificado

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token inválido:', err.message);  // Log do erro de token inválido
      res.status(403).json({ message: 'Token inválido!' });
      return;  // Retorna para interromper a execução
    }

    console.log('Token decodificado com sucesso:', decoded);  // Log de sucesso na decodificação do token

    req.body.user = decoded; // Armazenar os dados do usuário decodificado
    next(); // Chama o próximo middleware ou a rota
  });
}


app.get('/aluno/:id', verifyToken, (req: Request, res: Response): void => {
  const { id } = req.params;  // ID passado na URL
  const userId = req.body.user.id;  // ID do usuário decodificado do token

  console.log(`Verificando permissão para o usuário com ID: ${userId} acessar dados do aluno com ID: ${id}`);

  // Verificação de permissão
  if (parseInt(id) !== userId) {
    console.log(`Acesso negado: Usuário com ID ${userId} tentando acessar dados de outro aluno`);
    // Troca a resposta por um console.log
    console.log({ message: 'Acesso negado! Você não pode acessar esses dados.' });
    return;  // Aqui não há necessidade de retornar nada explicitamente
  }

  // Consultando o aluno no banco de dados
  db.get("SELECT * FROM alunos WHERE id = ?", [id], (err, row: Aluno) => {
    if (err) {
      console.log('Erro ao buscar aluno:', err.message);
      res.status(500).json({ message: 'Erro ao buscar aluno', error: err.message });
      return;
    }

    if (!row) {
      console.log('Aluno não encontrado');
      res.status(404).json({ message: 'Aluno não encontrado' });
      return;
    }

    console.log('Aluno encontrado:', row);
    // Enviando resposta com os dados do aluno
    res.status(200).json(row);
  });
});




// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Rota para obter os dados do aluno logado
// Rota para obter os dados do aluno logado
app.get('/me', verifyToken, (req: Request, res: Response) => {
  const userId = req.body.user.id; // ID do usuário logado

  db.get("SELECT * FROM alunos WHERE id = ?", [userId], (err, row: Aluno) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar dados do aluno', error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Envia os dadosxcdo aluno logado
    res.status(200).json(row);
  });
});


app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Recebendo requisição para: ${req.method} ${req.url}`);
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Configurando CORS para a origem:', req.headers.origin);
  next();
});


app.get('/atividades', verifyToken, (req: Request, res: Response) => {
  const rmAluno = req.body.user.rm; // RM do aluno autenticado

  // Garantir que o tipo de `row` seja `Aluno`
  db.get("SELECT id, nome FROM alunos WHERE rm = ?", [rmAluno], (err, row: Aluno) => { // Aqui, 'row' é do tipo 'Aluno'
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar aluno', error: err.message });
    }

    // Verificar se o aluno foi encontrado
    if (!row || !row.id) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    const alunoId = row.id; // Agora temos o id do aluno

    // Consultar atividades usando o id do aluno e incluir detalhes do aluno
    db.all(`
      SELECT atividades.*, alunos.nome AS nome_aluno, alunos.rm AS rm_aluno
      FROM atividades
      JOIN alunos ON atividades.aluno_id = alunos.id
      WHERE atividades.aluno_id = ?`, [alunoId], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar atividades', error: err.message });
      }

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Nenhuma atividade encontrada para este aluno' });
      }

      // Retorna as atividades com todos os dados relacionados, incluindo anexo (BLOB)
      res.status(200).json({ atividades: rows });
    });
  });
});


interface Livro {
  id: number; // ID gerado automaticamente pelo banco de dados
  titulo: string;
  autor: string;
  descricao: string | null;
  quantidade: number;
  biblioteca_id: number;  // ID da biblioteca relacionada (opcional, caso necessário)
  imagem_url: string | null;
  created_at: string; // Timestamp da criação
  updated_at: string; // Timestamp da última atualização
}


app.post('/cadastrar-livro', (req: Request, res: Response): void => {
  const { titulo, autor, descricao, quantidade, biblioteca_id, imagem_url } = req.body;

  // Verifica se os campos obrigatórios foram fornecidos
  if (!titulo || !autor || !quantidade) {
    return ;
  }

  db.run(
    `INSERT INTO livros (titulo, autor, descricao, quantidade, biblioteca_id, imagem_url) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [titulo, autor, descricao || null, quantidade, biblioteca_id || null, imagem_url || null],
    function (err) {
      if (err) {
        console.error('Erro ao registrar livro:', err.message);
        return res.status(500).json({ message: 'Erro ao registrar livro', error: err.message });
      }

      // Retorna sucesso com os dados do livro cadastrado
      res.status(201).json({
        message: 'Livro cadastrado com sucesso',
        livro: {
          id: this.lastID, // ID gerado automaticamente pelo banco de dados
          titulo,
          autor,
          descricao,
          quantidade,
          biblioteca_id,
          imagem_url,
        },
      });
    }
  );
});


app.post('/editar-livro', (req: Request, res: Response): void => {
  const { titulo, autor, descricao, quantidade, biblioteca_id, imagem_url } = req.body;

  // Verifica se o ID da biblioteca e pelo menos um campo de dado foi fornecido
  if (!biblioteca_id || !titulo || !autor || !quantidade) {
    return;
  }

  // Atualiza o livro com base no biblioteca_id
  const query = `
    UPDATE livros
    SET
      titulo = ?, 
      autor = ?, 
      descricao = ?, 
      quantidade = ?, 
      imagem_url = ?
    WHERE biblioteca_id = ?;
  `;

  db.run(
    query,
    [titulo, autor, descricao || null, quantidade, imagem_url || null, biblioteca_id],
    function (err) {
      if (err) {
        console.error('Erro ao atualizar livro:', err.message);
        return res.status(500).json({ message: 'Erro ao atualizar livro', error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Livro não encontrado com o biblioteca_id fornecido.' });
      }

      // Retorna sucesso com os dados do livro atualizado
      res.status(200).json({
        message: 'Livro atualizado com sucesso',
        livro: {
          biblioteca_id,
          titulo,
          autor,
          descricao,
          quantidade,
          imagem_url,
        },
      });
    }
  );
});


// API para excluir um livro
app.post('/excluir-livro', (req: Request, res: Response): void => {
  const { biblioteca_id } = req.body;

  // Verifica se o ID da biblioteca foi fornecido
  if (!biblioteca_id) {
    return;
  }

  // Exclui o livro com base no biblioteca_id
  const query = `
    DELETE FROM livros
    WHERE biblioteca_id = ?;
  `;

  db.run(query, [biblioteca_id], function (err) {
    if (err) {
      console.error('Erro ao excluir livro:', err.message);
      return res.status(500).json({ message: 'Erro ao excluir livro', error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Livro não encontrado com o biblioteca_id fornecido.' });
    }

    // Retorna sucesso
    res.status(200).json({
      message: 'Livro excluído com sucesso',
    });
  });
});

app.get('/livros', (req: Request, res: Response): void => {
  const query = `
    SELECT 
      id, titulo, autor, descricao, quantidade, biblioteca_id, imagem_url, created_at, updated_at 
    FROM livros;
  `;

  db.all(query, (err, rows) => {
    if (err) {
      console.error('Erro ao recuperar livros:', err.message);
      return res.status(500).json({ message: 'Erro ao recuperar livros', error: err.message });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Nenhum livro encontrado' });
    }

    // Resposta com a lista de livros
    res.status(200).json(rows);  // As URLs das imagens estarão dentro da propriedade `imagem_url`
  });
});
