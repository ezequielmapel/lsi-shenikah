var express = require('express');
var router = express.Router();
const Usuario = require('../models/usuario');

/* POST users listing. */
router.post('/cadastrar', function(req, res, next) {
  console.log(req.body);
  
  const novoEquipe = Usuario.factory(req.body);
  console.log(novoEquipe);
  
  Usuario.salvar(novoEquipe, (err) => {
    if(err){
      if(err.code == 11000){
        return res.send({tipo: 'danger', msg:'E-mail já cadastrado!',prefixo:"Algo deu errado!"});
      }
      return res.send({tipo: 'danger', msg: err, prefixo:"Erro!"})
    }else{
      return res.send({tipo:"success", msg: 'Usuário criado!',prefixo:"Sucessoo!"});
    }
  });

  
});

/* GET users listing. */
router.get('/painel', function(req, res, next) {
  res.render('user');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro');
});

router.get('/dados', function(req, res, next) {
  res.render('dados_do_agente');
});

router.get("*", function(req, res, next){
  res.render('user');
});

module.exports = router;
