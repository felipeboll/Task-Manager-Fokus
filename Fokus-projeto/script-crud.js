const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

//O || verifica se a local storage está vazia e atribue []
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

btnAdicionarTarefa.addEventListener('click', () =>{
    formAdicionarTarefa.classList.toggle('hidden');
})

function criaElementoTarefa(tarefa){

    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>`;

    const p = document.createElement('p');
    p.classList.add('app__section-task-list-item-description');
    p.textContent = tarefa.descricaoTarefa;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    const img = document.createElement('img');
    img.setAttribute('src', './imagens/edit.png');

    botao.append(img);

    li.append(svg);
    li.append(p);
    li.append(botao);

    return li;
}

formAdicionarTarefa.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    const tarefa = {
        descricaoTarefa: textArea.value
    }
    tarefas.push(tarefa);
    adicionarTarefa(tarefa);
    textArea.value = '';

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    formAdicionarTarefa.classList.add('hidden');

});

tarefas.forEach(tarefa => {
    adicionarTarefa(tarefa);
});

//função que adiciona a tarefa
function adicionarTarefa(tarefa){
    const elementoTarefa = criaElementoTarefa(tarefa);      
    ulTarefas.append(elementoTarefa);
}