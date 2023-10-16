//objeto event instanciado já no submit do formulário
function ExibeIMC(e) {
    e.preventDefault();

    let listaDeUsuarios = [];

    let nome = document.getElementById("nome").value.trim(); //limpa a string
    let altura = parseFloat(document.getElementById("altura").value);
    let peso = parseFloat(document.getElementById("peso").value);

    if (isNaN(peso) || isNaN(altura) || nome.length <= 2) {
        alert("Todos os campos deve ser preenchidos da maneira correta!");
        return
    };

    let imc = CalculaIMC(altura, peso);

    //método que verifica se um número é finito ou não
    if (isFinite(imc)) {
        imc = imc.toFixed(2);
    } else {
        alert("Insira dados válidos no fomulário!");
        return;
    }

    //gera a classificação do IMC do usuário passando o IMC como parâmetro
    let classificacao = VerificaClassificacao(imc);

    //pega qual a data atual e retornar para a constante no entanto em milissegundos
    let dataAtual = Date.now();

    //converte a data para um objeto do tipo Date consertando seus valores de anos, meses, dias e horário 
    dataAtual = new Date(dataAtual);

    //sempre que um usuário nõa vai ser alterado pode ser usado uma constante para criá-lo
    const pessoa = {
        "nome": nome,
        "altura": altura,
        "peso": peso,
        "imc": imc,
        "classificacao": classificacao,

        //formata a data para um formato legível
        "dataCadastro": dataAtual.toLocaleDateString()
    }

    listaDeUsuarios.push(pessoa);

    let linhaTabela;

    listaDeUsuarios.forEach(u => {
        if (listaDeUsuarios.length > 0) {
            linhaTabela =
                `
            <tr>
                <td data-cell="nome">${u.nome}</td>
                <td data-cell="altura">${u.altura}m</td>
                <td data-cell="peso">${u.peso}kg</td>
                <td data-cell="valor do IMC">${u.imc}</td>
                <td data-cell="classificação do IMC">${u.classificacao}</td>
                <td data-cell="data de cadastro">${u.dataCadastro}</td>
            </tr>
            `
        }
    });

    document.getElementById("corpo-tabela").innerHTML = linhaTabela;
}

//função que calcula o valor do IMC
function CalculaIMC(altura, peso) {
    return peso / Math.pow(altura, 2);
    // return peso/( altura * altura );
    // return peso/( altura**2 );
}

//função que verifica qual a classificação do IMC do usuário
function VerificaClassificacao(imc) {
    if (imc < 18.5) {
        return "Magreza";
    } else if (imc < 25) {
        return "Peso Normal";
    } else if (imc < 30) {
        return "Acima do Peso";
    } else if (imc < 35) {
        classificacao = "Obesidade I";
    } else if (imc < 40) {
        classificacao = "Obesidade II";
    } else {
        return "Obesidade Grave. Cuidado!!";
    }
}