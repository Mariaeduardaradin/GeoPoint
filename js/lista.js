const tabela = document.getElementById("tabela");
const corpoTabela = document.getElementById("corpo-tabela");
const carregando = document.getElementById("carregando");
const erro = document.getElementById("erro");
const vazio = document.getElementById("vazio");

const formBusca = document.getElementById("form-busca");
const campoBusca = document.getElementById("campo-busca");

let pontos = [];

async function carregarPontos() {
    try {
        pontos = await listarPontos();
        carregando.classList.add("escondido");
        mostrarPontos(pontos);
    } catch (error) {
        carregando.classList.add("escondido");
        erro.textContent = error.message;
        erro.classList.remove("escondido");
    }
}

function criarCelula(valor) {
    const celula = document.createElement("td");
    celula.textContent = valor || "-";
    return celula;
}

function criarLink(texto, endereco, classe) {
    const link = document.createElement("a");

    link.textContent = texto;
    link.href = endereco;
    link.className = classe;

    return link;
}

function criarBotaoExcluir(id) {
    const botao = document.createElement("button");

    botao.textContent = "Excluir";
    botao.className = "botao-acao botao-excluir";
    botao.dataset.id = id;

    return botao;
}

function mostrarPontos(lista) {
    corpoTabela.innerHTML = "";
    tabela.classList.add("escondido");
    vazio.classList.add("escondido");

    if (lista.length === 0) {
        vazio.classList.remove("escondido");
        return;
    }

    tabela.classList.remove("escondido");

    lista.forEach(ponto => {
        const linha = document.createElement("tr");

        const celulaNome = document.createElement("td");
        const linkNome = criarLink(
            ponto.name,
            `ponto.html?id=${ponto.id}`,
            ""
        );

        celulaNome.appendChild(linkNome);

        const celulaDescricao = criarCelula(ponto.description);
        const celulaLatitude = criarCelula(ponto.latitude);
        const celulaLongitude = criarCelula(ponto.longitude);

        const celulaAcoes = document.createElement("td");
        celulaAcoes.className = "acoes";

        const linkVer = criarLink(
            "Ver",
            `ponto.html?id=${ponto.id}`,
            "botao-acao botao-ver"
        );

        const linkEditar = criarLink(
            "Editar",
            `formulario.html?id=${ponto.id}`,
            "botao-acao botao-editar"
        );

        const botaoExcluir = criarBotaoExcluir(ponto.id);

        celulaAcoes.appendChild(linkVer);
        celulaAcoes.appendChild(linkEditar);
        celulaAcoes.appendChild(botaoExcluir);

        linha.appendChild(celulaNome);
        linha.appendChild(celulaDescricao);
        linha.appendChild(celulaLatitude);
        linha.appendChild(celulaLongitude);
        linha.appendChild(celulaAcoes);

        corpoTabela.appendChild(linha);
    });
}

formBusca.addEventListener("submit", function(event) {
    event.preventDefault();

    const nomeBusca = campoBusca.value.toLowerCase();

    const pontosFiltrados = pontos.filter(ponto =>
        ponto.name.toLowerCase().includes(nomeBusca)
    );

    mostrarPontos(pontosFiltrados);
});

corpoTabela.addEventListener("click", async function(event) {
    if (event.target.classList.contains("botao-excluir")) {
        const id = event.target.dataset.id;
        const confirmacao = confirm("Tem certeza que deseja excluir este ponto?");

        if (confirmacao) {
            try {
                await excluirPonto(id);
                pontos = await listarPontos();
                mostrarPontos(pontos);
            } catch (error) {
                erro.textContent = error.message;
                erro.classList.remove("escondido");
            }
        }
    }
});

carregarPontos();