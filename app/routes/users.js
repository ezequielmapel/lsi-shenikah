var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro');
});

router.get('/dados_do_agente', function(req, res, next) {
  res.render('dados_do_agente');
});

module.exports = router;
