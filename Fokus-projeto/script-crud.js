const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

const btnLimparTarefasConcluidas = document.getElementById('btn-remover-concluidas');
const btnLimparTodasTarefas = document.getElementById('btn-remover-todas');

let tarefaSelecionada = null;
let liTarefaSelecionada = null;


//O || verifica se a local storage está vazia e atribue []
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function atualizarLocalStorage(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

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

   
    botao.onclick = function(){

        const novaDescricao = prompt('Altere o texto da tarefa:');
        //temos que atribuir o valor no objeto, pois a DOM mostra a partir dele.
        //Da mesma forma devemos atribuir p.textContent pq se não p é toda a linha HTML e não só o conteudo
        if (novaDescricao) {
            p.textContent = novaDescricao;
            tarefa.descricaoTarefa=novaDescricao;
            atualizarLocalStorage(); 
        }
    }

    

    const img = document.createElement('img');
    img.setAttribute('src', './imagens/edit.png');

    botao.append(img);

    li.append(svg);
    li.append(p);
    li.append(botao);

    if(tarefa.completa){
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    }else{

    li.onclick = ()=>{

        document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
            elemento.classList.remove('app__section-task-list-item-active');
        });

        if(tarefaSelecionada == tarefa){
            li.classList.remove('app__section-task-list-item-active');
            paragrafoDescricaoTarefa.textContent = '';
            tarefaSelecionada = null;
            liTarefaSelecionada = null;
            return;
        }


        tarefaSelecionada = tarefa;
        liTarefaSelecionada = li;

        /* Não necessariamente tem que ficar aqui, pode ficar fora da funçao li.onclick
        Ele funciona da mesma maneira, pois o eventListener esta sempre "ouvindo" no escopo global */
        document.addEventListener('FocoFinalizado', () => {

            liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
            liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
            liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
            tarefa.completa = true;
            atualizarLocalStorage();
        })

        paragrafoDescricaoTarefa.textContent = p.textContent;

        li.classList.add('app__section-task-list-item-active');
    }
    }
  
    

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
    
    atualizarLocalStorage();
    formAdicionarTarefa.classList.add('hidden');

});

btnCancelarTarefa.addEventListener('click', ()=>{
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
})

//função que chama cada tarefa para crialas
tarefas.forEach(tarefa => {
    adicionarTarefa(tarefa);
});

//função que adiciona a tarefa
function adicionarTarefa(tarefa){
    const elementoTarefa = criaElementoTarefa(tarefa);      
    ulTarefas.append(elementoTarefa);
}


btnLimparTarefasConcluidas.addEventListener('click', () => {
   
    tarefas = tarefas.filter(tarefa => !tarefa.completa)
    document.querySelectorAll('.app__section-task-list-item-complete').forEach(elemento => {
        elemento.remove();
    });

    atualizarLocalStorage();

});

btnLimparTodasTarefas.addEventListener('click', () => {

    tarefas.pop()
    document.querySelectorAll('.app__section-task-list-item').forEach(elemento => {
        elemento.remove();
    });

    atualizarLocalStorage();

});

