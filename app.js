var listaNumerosSorteados = [];
var valorMaximo = 10;
var numeroSecreto = gerarNumeroAleatorio();
var numeroChute;
var tentativas = 1;
var maximoTentativas = 3;

function exibirTextoNaTela(tag, texto){

    var campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Bem vindo ao Jogo do Número Secreto");
    exibirTextoNaTela("p", `Adivinhe o número de 0 a ${valorMaximo} em apenas ${maximoTentativas} tentativas.`);
}

exibirMensagemInicial()

function verificarChute(){

    numeroChute = parseInt(document.getElementById("numeroChute").value);

    if(numeroChute > valorMaximo || numeroChute < 0){
        exibirTextoNaTela("p", `Só são aceitos números de 0 a ${valorMaximo}.`);
        limpaCaixadeEntrada();
        focoNaCaixaDeEntrada();
    } else{
        
        if(numeroChute == numeroSecreto){
            
            var palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
            exibirTextoNaTela("h1", `Parabéns! Você acertou o Número Secreto em ${tentativas} ${palavraTentativa}!`);
            exibirTextoNaTela("p", "Clique em Novo Jogo para jogar novamente.");
            document.getElementById("reiniciar").removeAttribute("disabled");
            document.getElementById("numeroChute").setAttribute("disabled", true);

        } else if(numeroChute < numeroSecreto && tentativas <= maximoTentativas){
            
            tentativas++;
            if(tentativas <= maximoTentativas){
                exibirTextoNaTela("p", `Errou! É maior! Tentativa ${tentativas}.`);
                limpaCaixadeEntrada();
                focoNaCaixaDeEntrada();
            }

        } else if(numeroChute > numeroSecreto && tentativas <= maximoTentativas){
            
            tentativas++;
            if(tentativas <= maximoTentativas){
                exibirTextoNaTela("p", `Errou! É menor! Tentativa ${tentativas}.`);
                limpaCaixadeEntrada();
                focoNaCaixaDeEntrada();
            }
        }
    }
    if(tentativas > maximoTentativas){
        
        exibirTextoNaTela("h1", "Você perdeu! Não acertou o número secreto!");
        exibirTextoNaTela("p", "Clique em Novo Jogo para jogar novamente.");
        document.getElementById("reiniciar").removeAttribute("disabled");
        document.getElementById("numeroChute").setAttribute("disabled", true);

    }
}

function gerarNumeroAleatorio(){
    var numeroEscolhido = Math.round(Math.random() * valorMaximo);
    var quantidadeElementosMaximoLista = 3;

    if(listaNumerosSorteados.length == quantidadeElementosMaximoLista){
        listaNumerosSorteados.shift();
    }

    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }

}

function focoNaCaixaDeEntrada(){
    document.getElementById("numeroChute").focus();
}

function limpaCaixadeEntrada(){
    document.getElementById("numeroChute").value = "";
}

function reiniciarJogo(){
    
    document.getElementById("numeroChute").removeAttribute("disabled");
    document.getElementById("reiniciar").setAttribute("disabled", true);
    tentativas = 1;
    exibirMensagemInicial()
    limpaCaixadeEntrada();
    numeroSecreto = gerarNumeroAleatorio();
    focoNaCaixaDeEntrada();

}

focoNaCaixaDeEntrada();