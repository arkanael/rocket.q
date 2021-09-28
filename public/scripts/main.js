import Modal from './modal.js';

const modal = Modal();
const checkButtons = document.querySelectorAll('.actions a.check');
const closeButton = document.querySelector('.button.cancel');
const deleteButtons = document.querySelectorAll('.actions a.delete');

const modalTitle = document.querySelector('.modal h2');
const modalDiscription =  document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');

checkButtons.forEach(button => {
    button.addEventListener('click', event => handleClick(event, true));
});

closeButton.addEventListener('click', event => {
    modal.close();
});


deleteButtons.forEach(button =>{
    button.addEventListener('click', event => handleClick(event, false));
});


function handleClick(event, check){
    event.preventDefault();
    const text = check ? 'Marcar como lida' : 'Excluir';

    const slug = check ? 'check' : 'delete';
    const roomId = document.querySelector('#room-id').dataset.id;
    const form = document.querySelector('.modal form');
    const questionId = event.target.dataset.id;

    modalTitle.innerHTML = `${text} esta pergunta`;
    modalDiscription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`;
    modalButton.innerHTML = `sim, ${text}`;

    check? modalButton.classList.remove('red') : modalButton.classList.add('red');
    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`);

    modal.open();

}