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

        linha.innerHTML = `
            <td>${ponto.name}</td>
            <td>${ponto.description || "-"}</td>
            <td>${ponto.latitude}</td>
            <td>${ponto.longitude}</td>
            <td>
                <a href="ponto.html?id=${ponto.id}">Ver</a>
                <a href="formulario.html?id=${ponto.id}">Editar</a>
                <button class="botao-excluir" data-id="${ponto.id}">Excluir</button>
            </td>
        `;

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