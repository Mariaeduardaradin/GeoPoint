const tabela = document.getElementById("tabela");
const corpoTabela = document.getElementById("corpo-tabela");
const carregando = document.getElementById("carregando");
const erro = document.getElementById("erro");
const vazio = document.getElementById("vazio");

async function carregarPontos() {
    try {
        const pontos = await listarPontos();

        carregando.classList.add("escondido");

        if (pontos.length === 0) {
            vazio.classList.remove("escondido");
            return;
        }

        tabela.classList.remove("escondido");

        pontos.forEach(ponto => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${ponto.name}</td>
                <td>${ponto.description || "-"}</td>
                <td>${ponto.latitude}</td>
                <td>${ponto.longitude}</td>
                <td>
                    <a href="ponto.html?id=${ponto.id}">Ver</a>
                </td>
            `;

            corpoTabela.appendChild(linha);
        });

    } catch (error) {
        carregando.classList.add("escondido");
        erro.textContent = error.message;
        erro.classList.remove("escondido");
    }
}

carregarPontos();