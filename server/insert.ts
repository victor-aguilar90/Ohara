const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('/home/orcus/db/ohara.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Conexão com o banco estabelecida.');
  }
});

// Dados do novo aluno
const novoAluno = {
  nome: 'Maria Oliveira',
  data_nascimento: '2004-06-10',
  endereco: 'Rua dos Estudantes, 100',
  telefone: '11987654321',
  email: 'maria.oliveira@example.com',
  data_matricula: '2024-11-22',
  nome_responsavel: 'João Oliveira',
  contato_responsavel: '11987654321',
  status_estudante: 'Ativo',
  turmas: 'Turma B',
  cod_etec: 5678,
  senha: 'senha9876', // Senha em texto puro
  rm: 654321,
};

// Gerar o hash da senha
bcrypt.hash(novoAluno.senha, 10, (err, hash) => {
  if (err) {
    console.error('Erro ao hashear a senha:', err.message);
    return;
  }

  // Substituir a senha pelo hash
  novoAluno.senha = hash;

  // Inserir no banco de dados
  const sql = `
    INSERT INTO alunos (
      nome, data_nascimento, endereco, telefone, email, 
      data_matricula, nome_responsavel, contato_responsavel, 
      status_estudante, turmas, cod_etec, senha, rm
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    novoAluno.nome,
    novoAluno.data_nascimento,
    novoAluno.endereco,
    novoAluno.telefone,
    novoAluno.email,
    novoAluno.data_matricula,
    novoAluno.nome_responsavel,
    novoAluno.contato_responsavel,
    novoAluno.status_estudante,
    novoAluno.turmas,
    novoAluno.cod_etec,
    novoAluno.senha, // Senha hasheada
    novoAluno.rm,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Erro ao inserir o aluno no banco:', err.message);
    } else {
      console.log('Aluno inserido com sucesso. ID:', this.lastID);
    }
  });

  // Fechar conexão
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar o banco:', err.message);
    } else {
      console.log('Conexão com o banco fechada.');
    }
  });
});
