const mongoose = require('mongoose');
const {MONGODB_HOST} = process.env;
const host = MONGODB_HOST;

console.log(host);

mongoose.connect(host, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
    console.log("Sucesso na conexão com banco!");
}).catch((err) => {
    console.log('Falha na conexão com banco!');
    console.log(err);
});
// const db = mongoose.connection;

// db.once('error', console.error.bind(console, 'Falha na conexão com banco!'));
// db.once('open', () => {
//     console.log("Sucesso na conexão com banco!");
// });
