const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const BYCRIPT_SALT = 10; //TODO: .env
const _PEPPER = 'shenikah3entregaLsI'; // TODO: .env

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, require: true },
    email: { type: String, require: true, unique: true, index: true },
    senha: { type: String, required: true },
    telefone: { type: String },
    autorizacao: { type: String },
    emailVerificado: { type: Boolean, default: false },
    termosUso: { type: Boolean, default: false },
    tentativasLogin: { type: Number, default: 0 },
    bloqueado: { type: Boolean, default: false }
});


// Função para incluir um novo usuário
function salvarUsuario(Usuario, callback) {
    bcrypt.genSalt(BYCRIPT_SALT, (err, salt) => {
        salt += _PEPPER;
        bcrypt.hash(Usuario.senha, salt, (err, hash) => {
            Usuario.senha = hash;
            Usuario.save(callback);
        });
    });
}

// Função para excluir um novo usuário
async function deletarUsuario(Usuario) {
    return await Usuario.deleteOne({ nome: Usuario.nome, email: Usuario.email }).catch(err => console.log(err));
}

// Função para transformar JSON em Usuario
function factory(usuario) {
    return new Usuario({
        nome: usuario["nome"],
        email: usuario["email"],
        senha: usuario["senha"],
        telefone: usuario["telefone"],
        autorizacao: usuario["autorizacao"],
        emailVerificado: usuario["emailVerificado"],
        termosUso: usuario["termosUso"],
        tentativasLogin: usuario["tentativasLogin"],
        bloqueado: usuario["bloqueado"],
    });
}

usuarioSchema.statics.factory = factory;
usuarioSchema.statics.salvar = salvarUsuario;


usuarioSchema.methods.deletar = deletarUsuario;


const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;