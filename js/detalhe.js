const carregando = document.getElementById("carregando");
const erro = document.getElementById("erro");
const detalhes = document.getElementById("detalhes");

const id = new URLSearchParams(window.location.search).get("id");

async function carregarDetalhes() {
    try {
        const ponto = await buscarPonto(id);

        document.getElementById("nome").textContent = ponto.name;
        document.getElementById("descricao").textContent = ponto.description || "-";
        document.getElementById("latitude").textContent = ponto.latitude;
        document.getElementById("longitude").textContent = ponto.longitude;

        document.getElementById("editar").href = `formulario.html?id=${ponto.id}`;

        carregando.classList.add("escondido");
        detalhes.classList.remove("escondido");

    } catch (error) {
        carregando.classList.add("escondido");
        erro.textContent = error.message;
        erro.classList.remove("escondido");
    }
}

carregarDetalhes();