const formPonto = document.getElementById("form-ponto");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const mensagem = document.getElementById("mensagem");
const tituloFormulario = document.getElementById("titulo-formulario");
const botaoSalvar = document.getElementById("botao-salvar");

const id = new URLSearchParams(window.location.search).get("id");

if (id) {
    tituloFormulario.textContent = "Editar ponto";
    botaoSalvar.textContent = "Salvar alterações";

    carregarPonto();
}

async function carregarPonto() {
    try {
        const ponto = await buscarPonto(id);

        nome.value = ponto.name;
        descricao.value = ponto.description || "";
        latitude.value = ponto.latitude;
        longitude.value = ponto.longitude;

    } catch (error) {
        mensagem.textContent = error.message;
        mensagem.classList.remove("escondido");
    }
}

formPonto.addEventListener("submit", async function (event) {
    event.preventDefault();

    const ponto = {
        name: nome.value.trim(),
        description: descricao.value.trim(),
        latitude: Number(latitude.value),
        longitude: Number(longitude.value)
    };

    botaoSalvar.disabled = true;
    mensagem.classList.add("escondido");

    try {
        if (id) {
            await atualizarPonto(id, ponto);

            window.location.href = "ponto.html?id=" + id;

        } else {
            await criarPonto(ponto);

            window.location.href = "index.html";
        }

    } catch (error) {
        mensagem.textContent = error.message;
        mensagem.classList.remove("escondido");

        botaoSalvar.disabled = false;
    }
});