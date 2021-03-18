// CONTROLADOR DO MODAL
const body = document.getElementsByTagName("body")[0];
const btnSignIn = document.getElementById("btn-menu-signin");
const modalOpcoesSignIn = document.getElementById("modal-opcoes-login");
btnSignIn.addEventListener('click', ()=>{
    const state = modalOpcoesSignIn.style.display;
    modalOpcoesSignIn.style.display = state == 'block'? 'none': 'block';
});
body.addEventListener('click', (event)=>{
    if(event.srcElement.parentElement.id != "modal-opcoes-login" && event.srcElement.parentElement.parentElement.id != "modal-opcoes-login" &&event.srcElement.parentElement.id != "btn-menu-signin" ){
        modalOpcoesSignIn.style.display = 'none';
    }
});


