let totalCaixa = 0;

totalCaixaUpdate = () => {
    document.getElementById("total-caixa").textContent = totalCaixa.toFixed(2);
    localStorage.setItem("totalCaixa", totalCaixa);
}

saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}


loadFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
}

updateFuncionarioList = (funcionarios) => {
    const lista = document.getElementById("lista-funcionarios");
    lista.innerHTML = "";
    funcionarios.forEach((funcionario, index) => {
        const item = document.createElement("li");
        item.textContent = `${funcionario.nome} - ${funcionario.cargo}`;
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = () => editarFuncionario(index);
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.onclick = () => removerFuncionario(index);
        item.appendChild(editButton);
        item.appendChild(removeButton);
        lista.appendChild(item);
    });
}

cadastrarFuncionario = () => {
    const nome = document.getElementById("nome-funcionario").value;
    const cargo = document.getElementById("cargo-funcionario").value;

    if (nome && cargo) {
        const funcionarios = loadFromLocalStorage("funcionarios");
        funcionarios.push({ nome, cargo });
        saveToLocalStorage("funcionarios", funcionarios);
        updateFuncionarioList(funcionarios);

        document.getElementById("form-funcionarios").reset();
        alert("Funcionário cadastrado com sucesso!");
    } else {
        alert("Preencha todos os campos antes de cadastrar!");
    }
}

editarFuncionario = (index) => {
    const funcionarios = loadFromLocalStorage("funcionarios");
    const funcionario = funcionarios[index];
    const novoNome = prompt("Editar nome do funcionário:", funcionario.nome);
    const novoCargo = prompt("Editar cargo do funcionário:", funcionario.cargo);
    if (novoNome && novoCargo) {
        funcionarios[index] = { nome: novoNome, cargo: novoCargo };
        saveToLocalStorage("funcionarios", funcionarios);
        updateFuncionarioList(funcionarios);
    }
}

removerFuncionario = (index) => {
    const funcionarios = loadFromLocalStorage("funcionarios");
    funcionarios.splice(index, 1);
    saveToLocalStorage("funcionarios", funcionarios);
    updateFuncionarioList(funcionarios);
}

window.onload = () => {
    totalCaixa = parseFloat(localStorage.getItem("totalCaixa")) || 0;
    totalCaixaUpdate();

    const funcionarios = loadFromLocalStorage("funcionarios");
    updateFuncionarioList(funcionarios);
}
