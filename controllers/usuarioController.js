const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

// Controlador
const usuarioController = {

  cadastrar: (req, res) => {
    const { nome, email, senha } = req.body;
    usuarioModel.buscarPorEmail(email, (error, usuarioExistente) => {
      if (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
        return;
      }

      if(usuarioExistente) {
        res.status(400).json({ error: 'E-mail já cadastrado' });
        return;
      }

      bcrypt.hash(senha, 10, (err, hash) => {
        if(err) {
          res.status(500).json({ error: 'Erro ao criptografar senha' });
          return;
        }

        usuarioModel.cadastrar(nome, email, hash, (error, novoUsuario) => {
          if(error) {
            res.status(500).json({ error: 'Erro ao cadastrar usuário' });
            return;
          }
          res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        });
       
      });
    });
  },

  listar: ((req, res) => {
    usuarioModel.listar((error, resultados) => {
      if(error) {
        res.status(500).json({ error: 'Erro ao obter usuários do banco de dados' });
        return;
      }
      res.json(resultados); 
    })
  }),

  buscarPorId: ((req, res) => {
    const id = req.params.id;

    usuarioModel.buscarPorId(id, (error, resultados) => {
      if(error) {
        res.status(500).json({ error: 'Erro ao buscar usuário por ID' });
        return;
      }
      if(resultados.length === 0) {
        res.status(404).json({ msg: 'Usuário não encontrado' });
        return
      }
      res.json(resultados);
    })
  }),

  login: (req, res) => {
    const { email, senha } = req.body;
    usuarioModel.buscarPorEmail(email, (error, usuario) => {
      if(error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
        return;
      }

      if(!usuario) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return
      }

      bcrypt.compare(senha, usuario.senha, (err, result) => {
        if (err || !result) {
          res.status(401).json({ error: 'Credenciais inválidas' });
        } else {
          const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ token });
        }
      })

    })
  }
};

module.exports = usuarioController;