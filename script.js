let qntCartas;
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

function vira(cartaClicada) {
    cartaClicada.classList.toggle("click");
    desvirarCarta(cartaClicada);
}
function desvirarCarta() {

}
function random() {
    return Math.random() -0.5;
}
function distribuirCartas() {
    let mesa = document.querySelector('.mesa');
    for(i = 0; i < baralho.length; i++) {
        let cartaDom = `
            <li onclick="vira(this)" class="carta" >
                <div  class="front lado">
                    <img src="./img/front.png">
                </div>
                <div class="back lado">
                    <img src="./img/${baralho[i]}.gif" >
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
}
perguntaQuantidade()