var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user.ejs');
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro.ejs');
});

router.get('/login', function(req, res, next) {
  res.render('login.ejs');
});

router.get('/dados_do_agente', function(req, res, next) {
  res.render('dados_do_agente.ejs');
});

module.exports = router;
