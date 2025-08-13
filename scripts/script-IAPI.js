const urlAPI= "http://localhost:3000/tarefas";
/*Seleciona cada elemento do Dom( document objkect model)
presente na pagina HTML para manbipula-la
aloca o valor que o usuario diginar no input da variavel inputTarefa
*/
const inputTarefa = document.querySelector("#tarefa");
const inputDescricao = document.querySelector("#descricao");
const inputStatus = document.querySelector("#status");
const inputPrioridade = document.querySelector("#prioridade");
const inputData = document.querySelector("#data");
/* seleciona o botão adicionar tarefa e aloca a variável
botaoAdicionar, que será utilizado ára adicionar a tarefa*/ 
const botaoAdicionar = document.querySelector(".botao-adicionar");
/*Seleciona a lista de tarefas e aloca na variável listaTarefas
que será utilzada para exibir as tarefas na tela */
const listaTarefas = document.querySelector(".lista-tarefas");
const botaoRemover = document.querySelector(".botao-remover");


/*funcão para adicionar uma tarefa na lista de tarefas */
async function adicionarTarefa(titulo, descricao, status, prioridade, data) {
    try {

    await fetch(urlAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ titulo: titulo, descricao: descricao, status: status, prioridade: prioridade, data_entrega: data }),

    })
    renderizarTarefa();
   }
   catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
    }
}


async function renderizarTarefa() {

    try {
       const resposta = await fetch(urlAPI);
       const tarefas = await resposta.json();

       tarefas.forEach(tarefa => {
           const itemLista = document.createElement("li");
           itemLista.className = "item-tarefa";
           itemLista.textContent = "Titulo: " + tarefa.titulo + " - Descricao: " + tarefa.descricao + " - Status: " + tarefa.status + " - Prioridade: " + tarefa.prioridade +" - Data de criacao:" + tarefa.data_criacao+" - Data de entrega: " + tarefa.data_entrega.split("T")[0].split("-").reverse().join("/");
           itemLista.id = tarefa.id;
           
           const botaoRemover = document.createElement("button");
           botaoRemover.className = "botao-remover";
           botaoRemover.textContent = "Remover";
           
           const botaoEditar = document.createElement("button");
           botaoEditar.className = "botao-editar";
           botaoEditar.textContent = "Editar";
           
           itemLista.appendChild(botaoEditar);
           itemLista.appendChild(botaoRemover);
           listaTarefas.appendChild(itemLista);
       });
    } 
    catch (error) {
        console.error("Erro ao renderizar tarefas:", error);
    }
}
/* Função para remover uma tarefa da lista de tarefas */
async function removerTarefa(id) {
    try {
        await fetch(`${urlAPI}/${id}`, {
            method: "DELETE",
        });
        listaTarefas.innerHTML = "";
        renderizarTarefa();
    } catch (error) {
        console.error("Erro ao remover tarefa:", error);
    }
}
/*botão de remover */
listaTarefas.addEventListener("click", function(evento) {
    if (evento.target.classList.contains("botao-remover")) {
        const id = evento.target.parentNode.id;
        removerTarefa(id);
    }
})
/* função para editar a tarefa escolhida*/
async function editarTarefa(id, titulo, descricao, status, prioridade, data) {
    
    
    try {
        await fetch(`${urlAPI}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ titulo: titulo, descricao: descricao, status: status, prioridade: prioridade, data_entrega: data }),
        });
        listaTarefas.innerHTML = "";
        renderizarTarefa();
    } catch (error) {
        console.error("Erro ao editar tarefa:", error);
    }

}

/*botão de editar */
listaTarefas.addEventListener("click", function(evento) {
    if (evento.target.classList.contains("botao-editar")) {
        const id = evento.target.parentNode.id;
        const novoTitulo = prompt("Digite o novo texto da tarefa:");
        const novaDescricao = prompt("Digite a nova descrição da tarefa:");
        const novoStatus = prompt("Digite o novo status da tarefa:");
        const novaPrioridade = prompt("Digite a nova prioridade da tarefa:");
        const novaData = prompt("Digite a nova data de entrega da tarefa:");
        if (novoTitulo) {
            editarTarefa(id, novoTitulo, novaDescricao, novoStatus, novaPrioridade, novaData);
        }
    }
})
 
botaoAdicionar.addEventListener("click", function(evento) {
    evento.preventDefault();
    const novaTarefa = inputTarefa.value.trim();
    const novaDescricao = inputDescricao.value.trim();
    const novoStatus = inputStatus.value.trim();
    const novaPrioridade = inputPrioridade.value.trim();
    const novaData = inputData.value.trim();
    if (novaTarefa !== "") {
        listaTarefas.innerHTML = "";
        adicionarTarefa(novaTarefa, novaDescricao, novoStatus, novaPrioridade, novaData);
        inputTarefa.value = "";
        inputDescricao.value = "";
        inputStatus.value = "";
        inputPrioridade.value = "";
        inputData.value = "";
    }
})

renderizarTarefa();
