const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (elemento) => {
    criarElemento(elemento)
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const itemExiste = itens.find( elemento => elemento.nome === nome.value );
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(itemAtual.nome && itemAtual.quantidade){
        if(itemExiste) {
            itemAtual.id = itemExiste.id;
    
            const novoValor = atualizaElemento(itemAtual);
            itemAtual.quantidade = novoValor
            itens[itens.findIndex(elemento => elemento.id === itemExiste.id)] = itemAtual;
        } else {
            itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;
            criarElemento(itemAtual)
        
            itens.push(itemAtual);
        }
    
    
        localStorage.setItem("itens", JSON.stringify(itens));
    
        nome.value = "";
        quantidade.value = "";
    } else {
        alert("Preencha todos os campos!");
    }



})

function criarElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id ;
    novoItem.appendChild(numeroItem);
    
    novoItem.innerHTML += item.nome;
    
    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    let valor = parseInt(document.querySelector(`[data-id='${item.id}']`).textContent);
    let valor2 = parseInt(item.quantidade) + valor;
    document.querySelector(`[data-id='${item.id}']`).innerHTML = valor2;
    return valor2;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener('click', function(){
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id == id), 1)

    localStorage.setItem("itens", JSON.stringify(itens));
}