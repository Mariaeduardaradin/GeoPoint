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

formPonto.addEventListener("submit", async function(event) {
    event.preventDefault();

    mensagem.classList.add("escondido");

    const nomePonto = nome.value.trim();
    const descricaoPonto = descricao.value.trim();

    const valorLatitude = latitude.value;
    const valorLongitude = longitude.value;

    const latitudePonto = Number(valorLatitude);
    const longitudePonto = Number(valorLongitude);

    // Validar nome
    if (nomePonto === "") {
        mensagem.textContent = "O nome do ponto é obrigatório.";
        mensagem.classList.remove("escondido");
        return;
    }

    if (nomePonto.length > 100) {
        mensagem.textContent = "O nome deve ter no máximo 100 caracteres.";
        mensagem.classList.remove("escondido");
        return;
    }

    // Validar descrição
    if (descricaoPonto.length > 255) {
        mensagem.textContent = "A descrição deve ter no máximo 255 caracteres.";
        mensagem.classList.remove("escondido");
        return;
    }

    // Validar latitude
    if (valorLatitude === "" || !Number.isFinite(latitudePonto)) {
        mensagem.textContent = "Informe uma latitude válida.";
        mensagem.classList.remove("escondido");
        return;
    }

    if (latitudePonto < -90 || latitudePonto > 90) {
        mensagem.textContent = "A latitude deve estar entre -90 e 90.";
        mensagem.classList.remove("escondido");
        return;
    }

    // Validar longitude
    if (valorLongitude === "" || !Number.isFinite(longitudePonto)) {
        mensagem.textContent = "Informe uma longitude válida.";
        mensagem.classList.remove("escondido");
        return;
    }

    if (longitudePonto < -180 || longitudePonto > 180) {
        mensagem.textContent = "A longitude deve estar entre -180 e 180.";
        mensagem.classList.remove("escondido");
        return;
    }

    const ponto = {
        name: nomePonto,
        description: descricaoPonto,
        latitude: latitudePonto,
        longitude: longitudePonto
    };

    botaoSalvar.disabled = true;
    botaoSalvar.textContent = "Salvando...";

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

        if (id) {
            botaoSalvar.textContent = "Salvar alterações";
        } else {
            botaoSalvar.textContent = "Salvar";
        }
    }
});