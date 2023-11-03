const conexao = require('../infraestrutura/conexao');

class Usuario {

  cadastrar(nome, email, senha, callback) {
    let sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    conexao.query(sql, [nome, email, senha], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }

  listar(callback) {
    let sql = `SELECT * FROM usuarios`;
    conexao.query(sql, (error, resultados) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, resultados);
    });
  }

  buscarPorId(id, callback) {
      let sql = `SELECT usuarios.id, usuarios.nome, usuarios.email, usuarios.cpf_cnpj, 
      usuarios.senha, usuarios.id_setor FROM usuarios WHERE usuarios.id = ?`;

      conexao.query(sql, [id], (error, resultados) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, resultados[0]);
      });
    
  }

  buscarPorEmail(email, callback) {
    let sql = `SELECT * FROM usuarios WHERE email = ?`;
    conexao.query(sql, [email], (error, resultados) => {
      if (erro) {
        callback(error, null);
        return;
      }
      callback(null, resultados[0]);
    });

  }

}

module.exports = new Usuario;
