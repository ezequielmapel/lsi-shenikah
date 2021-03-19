const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const BYCRIPT_SALT = 10; //TODO: .env
const _PEPPER = 'shenikah3entregaLsI'; // TODO: .env

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, require: true },
    email: { type: String, require: true, unique: true, index: true },
    senha: { type: String, required: true },
    cpf: {type: String},
    rg: {type: String},
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

// Função para obter os usuários com filtro no nome
async function filtrar(search){
    return await Usuario.find({"nome":{$regex: new RegExp(["^", search, ".*$"].join(""), "i")}})
}

// Função para obter um usuario
async function filtrarEspecifico(search){
    return await Usuario.findOne({"nome": search})
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
        cpf: usuario["cpf"],
        rg: usuario["rg"]
    });
}

usuarioSchema.statics.factory = factory;
usuarioSchema.statics.salvar = salvarUsuario;
usuarioSchema.statics.filtrar = filtrar;
usuarioSchema.statics.filtrarEspecifico = filtrarEspecifico;

usuarioSchema.methods.deletar = deletarUsuario;


const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;