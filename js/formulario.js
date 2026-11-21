const formPonto = document.getElementById("form-ponto");
const mensagem = document.getElementById("mensagem");

formPonto.addEventListener("submit", async function(event) {
    event.preventDefault();

    const ponto = {
        name: document.getElementById("nome").value,
        description: document.getElementById("descricao").value,
        latitude: Number(document.getElementById("latitude").value),
        longitude: Number(document.getElementById("longitude").value)
    };

    try {
        await criarPonto(ponto);

        mensagem.textContent = "Ponto cadastrado com sucesso!";

        formPonto.reset();

    } catch (error) {
        mensagem.textContent = error.message;
    }
});