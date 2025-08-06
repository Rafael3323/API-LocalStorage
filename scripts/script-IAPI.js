const urlAPI= "http://localhost:3000/tarefas";
/*Seleciona cada elemento do Dom( document objkect model)
presente na pagina HTML para manbipula-la
aloca o valor que o usuario diginar no input da variavel inputTarefa
*/
const inputTarefa = document.querySelector(".campo-tarefa");
/* seleciona o botão adicionar tarefa e aloca a variável
botaoAdicionar, que será utilizado ára adicionar a tarefa*/ 
const botaoAdicionar = document.querySelector(".botao-adicionar");
/*Seleciona a lista de tarefas e aloca na variável listaTarefas
que será utilzada para exibir as tarefas na tela */
const listaTarefas = document.querySelector(".lista-tarefas");


/*funcão para adicionar uma tarefa na lista de tarefas */
async function adicionarTarefa(titulo) {
    try {

    await fetch(urlAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ titulo: titulo }),

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
           itemLista.textContent = tarefa.Titulo;
           
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


botaoAdicionar.addEventListener("click", function(evento) {
    evento.preventDefault();
    const novaTarefa = inputTarefa.value.trim();
    if (novaTarefa !== "") {
        adicionarTarefa(novaTarefa);
        inputTarefa.value = "";
    }
})

renderizarTarefa();

