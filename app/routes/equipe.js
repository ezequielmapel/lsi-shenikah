var express = require('express');
var router = express.Router();
const Usuario = require('../models/usuario');

/* POST users listing. */
router.post('/cadastrar', function(req, res, next) {  
  const novoEquipe = Usuario.factory(req.body);
  
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

router.get('/consultar', function(req, res, next) {
  res.render('consulta');
});

router.get('/consultar/lista', async function(req, res, next) {
  
  const search = req.query["search"].trim();
  if(search.length < 3){
    return res.send({tipo:'danger', prefixo: 'Falha!', msg:'Filtro com caracter insuficiente.'});
  }

  const membros = await Usuario.filtrar(search);
  console.log(membros);
  if(membros.length == 0){
    return res.send({tipo:'danger', prefixo: ':(', msg:'Sua busca não retornou nada.'});
  }
  
  return res.send({tipo:'ignore', data:membros});
});

router.get('/consultar/dados/:nome', async function(req, res, next){
  const membro = await Usuario.filtrarEspecifico(req.params["nome"].trim());
  if(membro == null){
    res.redirect('../');
  }
  return res.render('dados_do_agente', {membro});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro');
});

router.get("*", function(req, res, next){
  res.render('user');
});

module.exports = router;
