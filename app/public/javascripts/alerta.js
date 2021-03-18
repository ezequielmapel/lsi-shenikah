
function alertar(tipo, prefixo, msg) {
    const alerta = document.getElementById("alerta");
    const alertaTexto = document.getElementById("alertaTexto");
    const alertaPrefixo = document.getElementById("alertaPrefixo");

    alerta.classList.add("alertain");
    alerta.classList = alerta.classList.toString().replace("alert-success", "");
    alerta.classList = alerta.classList.toString().replace("alert-danger", "");
    alerta.classList.add(`alert-${tipo}`);

    alertaTexto.innerText = msg;
    alertaPrefixo.innerText = prefixo;

    alerta.style.display = 'block';

    setTimeout(() => { alerta.style.display = 'none' }, 4000);

}
