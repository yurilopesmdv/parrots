let qntCartas;
let segundos = 0;
let qntSegundos;
let tipoCarta = [
    'bobrossparrot', 
    'explodyparrot', 
    'fiestaparrot', 
    'metalparrot', 
    'revertitparrot', 
    'tripletsparrot', 
    'unicornparrot'
];
let baralho = [];
let primeiraCarta;
let segundaCarta;
let qntJogadas = 0;
let qntCartasCorretas = 0;


function vira(cartaClicada) {
    if(cartaClicada.classList.contains("click"))  {
        return;
    }
    if(primeiraCarta !== undefined && segundaCarta !== undefined) {
        return;
    }
    cartaClicada.classList.add("click");
    qntJogadas += 1;
    if( primeiraCarta === undefined) {
        primeiraCarta = cartaClicada;
    } else {
        if(segundaCarta === undefined) {
            segundaCarta = cartaClicada;

            if(primeiraCarta.innerHTML === segundaCarta.innerHTML) {
                //acertou//
                resetPS();
                qntCartasCorretas += 2;
                tentarFinalizar();
            } else {
                //errou//
                setTimeout(desvirar, 1000);
            }
        }
    } 
}
function tentarFinalizar() {
    if(qntCartasCorretas === baralho.length) {
        setTimeout(FinalizarJogo, 1000);
        clearInterval(qntSegundos);
    }
}
function FinalizarJogo() {
    alert(`Você ganhou em ${qntJogadas} jogadas! A duração do jogo foi de ${segundos} segundos!`)
    querJogarAinda();
}
function querJogarAinda() {
    let JogarNovamente = prompt("Você gostaria de reiniciar a partida?");
    if(JogarNovamente === "sim"){
        window.location.reload();
    }else if(JogarNovamente === "não") {
        return;
    } else {
        querJogarAinda();
    }
}
function desvirar() {
    primeiraCarta.classList.remove("click");
    segundaCarta.classList.remove("click");
    resetPS();
}
function resetPS() {
    primeiraCarta = undefined;
    segundaCarta = undefined;
}

function random() {
    return Math.random() -0.5;
}
function distribuirCartas() {
    let mesa = document.querySelector('.mesa');
    for(i = 0; i < baralho.length; i++) {
        let cartaDom = `
            <li data-test="card" onclick="vira(this)" class="carta" >
                <div  class="front lado">
                    <img data-test="face-down-image" src="./img/front.png">
                </div>
                <div class="back lado">
                    <img data-test="face-up-image" src="./img/${baralho[i]}.gif" >
                </div>
            </li>
        `
        mesa.innerHTML += cartaDom;
    }
}
function embaralhar() {
    for(i = 0; i < (qntCartas / 2); i++) {
        let carta = tipoCarta[i];
        baralho.push(carta);
        baralho.push(carta);
    }
    baralho.sort(random);
    distribuirCartas();
}
function perguntaQuantidade () {
    qntCartas = Number(prompt("Com quantas cartas quer jogar? Digite um número par de 4 a 14"));
    while(isNaN(qntCartas) || qntCartas < 4 || qntCartas > 14 || (qntCartas % 2 !== 0)) {
        qntCartas = Number(prompt("Digite um número par de 4 a 14"));
    }
    embaralhar();
    qntSegundos = setInterval(tempo, 1000);
}
function tempo() {
    segundos++;
    document.querySelector('.tempo').innerHTML = segundos;
}

perguntaQuantidade()