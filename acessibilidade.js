const CHAVE_ACESSIBILIDADE = "apexGamesAcessibilidade";
const ESCALA_MINIMA = 1;
const ESCALA_MAXIMA = 2;
const PASSO_ESCALA = 0.25;

const configuracaoPadrao = {
    contraste: false,
    entrelinhas: false,
    paragrafos: false,
    letras: false,
    palavras: false,
    escala: 1
};

function carregarConfiguracao() {
    try {
        const configuracaoSalva = JSON.parse(
            localStorage.getItem(CHAVE_ACESSIBILIDADE)
        );

        return {
            ...configuracaoPadrao,
            ...configuracaoSalva
        };
    } catch {
        return {
            ...configuracaoPadrao
        };
    }
}

let configuracao = carregarConfiguracao();

function salvarConfiguracao() {
    localStorage.setItem(
        CHAVE_ACESSIBILIDADE,
        JSON.stringify(configuracao)
    );
}

function aplicarConfiguracao() {
    const body = document.body;

    body.classList.toggle( "alto-contraste",  configuracao.contraste);
    body.classList.toggle("entrelinhas-acessiveis", configuracao.entrelinhas);
    body.classList.toggle("paragrafos-acessiveis", configuracao.paragrafos);
    body.classList.toggle("letras-acessiveis", configuracao.letras);
    body.classList.toggle("palavras-acessiveis",configuracao.palavras);
    document.documentElement.style.setProperty("--escala-texto",configuracao.escala);

    document.querySelector("#contraste").checked = configuracao.contraste;

    document.querySelector("#entrelinhas").checked = configuracao.entrelinhas;

    document.querySelector("#paragrafos").checked = configuracao.paragrafos;

    document.querySelector("#letras").checked = configuracao.letras;

    document.querySelector("#palavras").checked = configuracao.palavras;

    document.querySelector("#status-texto").textContent = `${Math.round(configuracao.escala * 100)}%`;
}

function alterarEscala(valor) {
    configuracao.escala = Math.min(ESCALA_MAXIMA, Math.max(ESCALA_MINIMA, configuracao.escala + valor));
    salvarConfiguracao();
    aplicarConfiguracao();
}

document.addEventListener("DOMContentLoaded", () => {
    const campos = [
        "contraste","entrelinhas","paragrafos","letras","palavras"];

    campos.forEach((campo) => {
        document
            .querySelector(`#${campo}`)
            .addEventListener("change", (evento) => {
                configuracao[campo] = evento.target.checked;

                salvarConfiguracao();
                aplicarConfiguracao();
            });
    });

    document
        .querySelector("#diminuir-texto")
        .addEventListener("click", () => {
            alterarEscala(-PASSO_ESCALA);
        });

    document
        .querySelector("#aumentar-texto")
        .addEventListener("click", () => {
            alterarEscala(PASSO_ESCALA);
        });

    document
        .querySelector("#restaurar-acessibilidade")
        .addEventListener("click", () => {
            configuracao = {
                ...configuracaoPadrao
            };

            salvarConfiguracao();
            aplicarConfiguracao();
        });

    aplicarConfiguracao();
});