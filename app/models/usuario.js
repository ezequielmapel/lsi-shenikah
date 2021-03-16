const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const BYCRIPT_SALT = 10; //TODO: .env
const _PEPPER = 'shenikah3entregaLsI'; // TODO: .env

const usuarioSchema = new mongoose.Schema({
    nome : {type: String, require:true, unique:true, index:true},
    email: {type: String, require:true, unique: true, index: true},
    senha: {type: String, required: true},
    telefone: {type: String},
    autorizacao: {type: String},
    emailVerificado: {type: Boolean, default: false},
    termosUso: {type: Boolean, default: false},
    tentativasLogin: {type: Number, default: 0},
    bloqueado: {type: Boolean, default:false}
});

// Função para incluir um novo usuário
function salvarUsuario(Usuario, callback){
    bcrypt.genSalt(BYCRIPT_SALT, (err, salt) => {
        salt += _PEPPER;
        bcrypt.hash(Usuario.senha, salt, (err, hash) => {
            Usuario.senha = hash;
            Usuario.save(callback);
        });
    });
}

// Função para excluir um novo usuário
async function deletarUsuario(Usuario){
    return await Usuario.deleteOne({nome: Usuario.nome, email: Usuario.email}).catch(err => console.log(err));
}

usuarioSchema.methods.salvar = salvarUsuario;
usuarioSchema.methods.deletar = deletarUsuario;


const Usuario = mongoose.model('usuarios', usuarioSchema);
module.exports = Usuario;