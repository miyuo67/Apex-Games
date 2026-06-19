const formCadastro = document.getElementById("form-cadastro");

formCadastro.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não são iguais.");
        return;
    }

    const contasSalvas = JSON.parse(localStorage.getItem("contas")) || [];

    const novaConta = {
        nome: nome,
        email: email,
        telefone: telefone
    };

    contasSalvas.push(novaConta);

    localStorage.setItem("contas", JSON.stringify(contasSalvas));

    alert("Cadastro realizado com sucesso!");

    window.location.href = "index.html";
});