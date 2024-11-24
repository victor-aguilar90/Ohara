import express, { Request, Response, NextFunction } from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import cors from 'cors';
import emailjs from 'emailjs-com';  // Importando o emailjs
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config(); // Carrega as variáveis de ambiente

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const app = express();
const port = 3000;

// Usando o middleware CORS
app.use(cors({
  origin: ['http://192.168.10.181:3000', 'http://localhost:3000', '*']  // Altere conforme sua configuração
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

// Função de login
function login(username: string, password: string, callback: (error: Error | null, user?: Aluno | null) => void): void {
  db.get("SELECT * FROM alunos WHERE rm = ?", [username], (error: Error | null, user: Aluno | undefined) => {
    if (error) {
      callback(error);
      return;
    }

    if (!user) {
      callback(null, null);
      return;
    }

    bcrypt.compare(password, user.senha, (err: Error | undefined, result: boolean) => {
      if (err) {
        callback(err);
        return;
      }
      console.log('Resultado da comparação de senha: ', result); 

      if (result) {
        // Gerando o token JWT
        const token = jwt.sign({ id: user.id, rm: user.rm }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Token gerado: ', token); // Isso ajudará a identificar se o token é gerado corretamente.
              

        // Retornando o token no lugar dos dados do usuário
        callback(null, { ...user, token });
      } else {
        callback(null, null);
      }
    });
  });
}

// Rota de login
app.post('/login', (req: Request, res: Response): void => {
  const { username, password } = req.body;
  
  console.log('Tentando fazer login com RM:', username);  // Log do username

  login(username, password, (error, user) => {
    if (error) {
      console.error('Erro ao fazer login:', error.message);
      return res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }

    if (user) {
      console.log('Login bem-sucedido para o aluno:', user.rm);
      const { senha, ...userData } = user;  // Remover a senha do objeto
      res.status(200).json({
        message: 'Login bem-sucedido!',
        token: user.token,
        aluno: userData,  // Retorna os dados do aluno
      });
    } else {
      console.log('Credenciais inválidas para RM:', username);
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

    // Envia os dados do aluno logado
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
