//enum dos tipos de despesas.
const enum tipos {
    Lanches = "Lanches",
    Livros = "Livros",
    Transporte = "Transporte",
    Material_didático = "Material didático"
};

// Mapeamento do enum tipos.
const tiposMap: { [key: string]: tipos } = {
    "Lanches": tipos.Lanches,
    "Livros": tipos.Livros,
    "Transporte": tipos.Transporte,
    "Material didático": tipos.Material_didático,
};

//Interface das despesas pessoais
interface Despesas {

    categoria: tipos; // "importação" de tipos para a interface de despesa para facilitar na criação da lista de despesas
    descricao: string;
    valor: number;
    date: string;
}


//Funcao para cadastras as despesas.
function cadastrarDespesas() {
    // Obtenha uma coleção de todos os inputs do tipo rádio com o mesmo name
    let radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="tipo"]') as NodeListOf<HTMLInputElement>;
    let valorSelecionado: string = "";
    let tipoSelecionado: tipos | undefined = undefined;

    // Faz uma busca sobre os inputs do tipo rádio para encontrar o selecionado
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            valorSelecionado = radioButton.value;
            tipoSelecionado = tiposMap[valorSelecionado];
            break;
        };
    };

    // Obtenha o valor do input do id "descricao"
    let descricaoHTML: HTMLInputElement = document.getElementById("descricao") as HTMLInputElement;
    let descricao: string = descricaoHTML.value;

    // Obtenha o valor do input do id "valor"
    let valorHTML = document.getElementById("valor") as HTMLInputElement;
    let valor: number = -1;
    valor = parseFloat(valorHTML.value);

    // Obtenha o valor do input do id "date"
    let inputDateElement: HTMLInputElement = document.getElementById("data") as HTMLInputElement;
    let valorDate: string = inputDateElement.value;

    validacao(valorSelecionado, descricao, valor, valorDate);
};

//faz uma validaçao dos campos  
function validacao(tipoSelecionado: string, descricao: string, valor: number, valorDate: string) {

    //Faz uma comparacao nos campos para ver se nao estao vazios ou indefinidos.
    if (tipoSelecionado !== undefined && descricao !== "" && valor >= 0 && valorDate !== "") {
        adicionarAoRegistro(tipoSelecionado, descricao, valor, valorDate);
    } else {
        if (tipoSelecionado == undefined) {
            alert("Erro voce fez algo que nao devia!! :)");
        } else if (descricao == "") {
            alert("Voce deve informar uma descrição!");
        } else if (valor <= -1) {
            alert("Voce deve informar um valor maior que 0!");
        } else if (valorDate == "") {
            alert("Voce deve informar uma data completa!");
        };

    };

};

//Lista de despesas cadastradas
const listaDespesas: Despesas[] = []

//adciona as informacoes ao registro
function adicionarAoRegistro(tipo: string, descricao: string, valor: number, date: string) {


    //Criação do objeto de depesas com os dados que serão fornecidos pelo usuário
    const novaDespesa: Despesas = {
        categoria: tiposMap[tipo],
        descricao,
        valor,
        date,
    };

    //Adiciona a nova despesa a lista de despesas
    listaDespesas.push(novaDespesa);

    //limpa os campos informados
    let descricaoHTML: HTMLInputElement = document.getElementById("descricao") as HTMLInputElement;
    descricaoHTML.value = '';

    let valorHTML = document.getElementById("valor") as HTMLInputElement;
    valorHTML.value = '';

    let inputDateElement: HTMLInputElement = document.getElementById("data") as HTMLInputElement;
    inputDateElement.value = '';


    //exibi no console as informacoes, logo mais guarda no registro em uma lista
    console.log(`tipo: ${tipo}, Descrição: ${descricao}, valor: ${valor}, data: ${date}`);
    alert(`tipo: ${tipo}, Descrição: ${descricao}, valor: ${valor}, data: ${date}`);

exibirDespesas();

};

// Função para exibir as depesas cadastradas
function exibirDespesas() {
    const registoDespesas: HTMLElement = document.getElementById("registro") as HTMLElement;

    registoDespesas.innerHTML = "";

    listaDespesas.forEach((despesa, index) => {
        const divDespesa = document.createElement('div class = "registro-de-despesas"');
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