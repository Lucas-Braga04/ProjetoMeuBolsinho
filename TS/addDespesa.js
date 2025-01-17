"use strict";
var _a;
;
// Mapeamento do enum tipos.
const tiposMap = {
    "Lanches": "Lanches" /* tipos.Lanches */,
    "Livros": "Livros" /* tipos.Livros */,
    "Transporte": "Transporte" /* tipos.Transporte */,
    "Material didático": "Material did\u00E1tico" /* tipos.Material_didático */,
};
//Funcao para cadastras as despesas.
function cadastrarDespesas() {
    // Obtenha uma coleção de todos os inputs do tipo rádio com o mesmo name
    let radioButtons = document.querySelectorAll('input[name="tipo"]');
    let valorSelecionado = "";
    let tipoSelecionado = undefined;
    // Faz uma busca sobre os inputs do tipo rádio para encontrar o selecionado
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            valorSelecionado = radioButton.value;
            tipoSelecionado = tiposMap[valorSelecionado];
            break;
        }
        ;
    }
    ;
    // Obtenha o valor do input do id "descricao"
    let descricaoHTML = document.getElementById("descricao");
    let descricao = descricaoHTML.value;
    // Obtenha o valor do input do id "valor"
    let valorHTML = document.getElementById("valor");
    let valor = -1;
    valor = parseFloat(valorHTML.value);
    // Obtenha o valor do input do id "date"
    let inputDateElement = document.getElementById("data");
    let valorDate = inputDateElement.value;
    validacao(valorSelecionado, descricao, valor, valorDate);
}
;
//faz uma validaçao dos campos  
function validacao(tipoSelecionado, descricao, valor, valorDate) {
    //Faz uma comparacao nos campos para ver se nao estao vazios ou indefinidos.
    if (tipoSelecionado !== undefined && descricao !== "" && valor >= 0 && valorDate !== "") {
        adicionarAoRegistro(tipoSelecionado, descricao, valor, valorDate);
    }
    else {
        if (tipoSelecionado == undefined) {
            alert("Erro voce fez algo que nao devia!! :)");
        }
        else if (descricao == "") {
            alert("Voce deve informar uma descrição!");
        }
        else if (valor <= -1) {
            alert("Voce deve informar um valor maior que 0!");
        }
        else if (valorDate == "") {
            alert("Voce deve informar uma data completa!");
        }
        ;
    }
    ;
}
;
//Variável onde a lista de despesas será cadastrada 
let listaDespesas = [];
//adciona as informacoes ao registro
function adicionarAoRegistro(tipo, descricao, valor, date) {
    //Criação do objeto de depesas com os dados que serão fornecidos pelo usuário
    const novaDespesa = {
        categoria: tiposMap[tipo],
        descricao,
        valor,
        date,
    };
    let listaSalva = localStorage.getItem("listaDespesas");
    if (listaSalva) {
        listaDespesas = JSON.parse(listaSalva);
    }
    //Adiciona a nova despesa a lista de despesas
    listaDespesas.push(novaDespesa);
    //Salvando a lista dentro do LocalStorage
    localStorage.setItem("listaDespesas", JSON.stringify(listaDespesas));
    //limpa os campos informados
    let descricaoHTML = document.getElementById("descricao");
    descricaoHTML.value = '';
    let valorHTML = document.getElementById("valor");
    valorHTML.value = '';
    let inputDateElement = document.getElementById("data");
    inputDateElement.value = '';
    //exibi no console as informacoes, logo mais guarda no registro em uma lista
    console.log(`tipo: ${tipo}, Descrição: ${descricao}, valor: ${valor}, data: ${date}`);
    alert(`tipo: ${tipo}, Descrição: ${descricao}, valor: ${valor}, data: ${date}`);
    exibirDespesasHTML();
}
;
// Função para exibir as depesas cadastradas
function exibirDespesasHTML() {
    //Faz a busca do elemento "registro" contido no HTML do projeto
    const registoDespesas = document.querySelector("#registro");
    //Limpa o conteúdo anterior
    registoDespesas.innerHTML = "";
    //Adiciona as informações aos campos
    listaDespesas.forEach((despesa, index) => {
        const divDespesa = document.createElement('div');
        divDespesa.innerHTML = `
        <h4>Despesa ${index + 1}</h4>
        <p>Categoria: ${despesa.categoria}</p>
        <p>Descrição: ${despesa.descricao}</p>
        <p>Valor: R$ ${despesa.valor.toFixed(2)}</p>
        <p>Data: ${despesa.date}</p>
        
        
        `;
        registoDespesas.appendChild(divDespesa);
    });
}
//Função para Recuperar as despesas e exibi-las em HTML
function recuperarDespesas() {
    //Busca as listas guardadas no localStorage para fazer sua recuperação 
    const recuperacaoDeDespesas = JSON.parse(localStorage.getItem("listaDespesas") || ('[]'));
    //Buscando elemtendo HTML ao qual será atribuido a exibição das despesas recuperadas    
    const historicoDasDespesas = document.getElementById("historico");
    historicoDasDespesas.innerHTML = '';
    historicoDasDespesas.addEventListener("click", function () {
        recuperarDespesas();
    });
    //IF verificando se há despesas para exibir
    if (recuperacaoDeDespesas.lenght > 0) {
        recuperacaoDeDespesas.forEach((despesa, index) => {
            const divDespesaRecuperada = document.createElement('div');
            divDespesaRecuperada.innerHTML = `
                <h4>Despesa ${index + 1}</h4>
                <p>Categoria: ${despesa.categoria}</p>
                <p>Descrição: ${despesa.descricao}</p>
                <p>Valor: R$ ${despesa.valor.toFixed(2)}</p>
                <p>Data: ${despesa.date}</p>

            `;
            historicoDasDespesas.appendChild(divDespesaRecuperada);
        });
    }
    else {
        alert("Sua lista foi gerada");
    }
    console.log(recuperacaoDeDespesas);
}
//Chama a função para recuperar e exibir as despesas
(_a = document.getElementById("botaRecuperarDespesas")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    recuperarDespesas();
});
