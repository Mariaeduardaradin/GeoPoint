const API_URL = "https://geopoint-6x4u.onrender.com/api/points";

async function listarPontos() {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
        throw new Error("Erro ao carregar os pontos.");
    }

    return await resposta.json();
}

async function buscarPonto(id) {
    const resposta = await fetch(`${API_URL}/${id}`);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar o ponto.");
    }

    return await resposta.json();
}

async function criarPonto(ponto) {
    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ponto)
    });

    if (!resposta.ok) {
        throw new Error("Erro ao cadastrar o ponto.");
    }

    return await resposta.json();
}

async function atualizarPonto(id, ponto) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ponto)
    });

    if (!resposta.ok) {
        throw new Error("Erro ao atualizar o ponto.");
    }

    return await resposta.json();
}

async function excluirPonto(id) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!resposta.ok) {
        throw new Error("Erro ao excluir o ponto.");
    }
}