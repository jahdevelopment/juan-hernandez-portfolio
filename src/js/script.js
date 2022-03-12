const bdark = document.querySelector('#bdark');
const body = document.querySelector('body');
const header = document.querySelector('header');

bdark.addEventListener('click', e =>{
  body.classList.toggle('bluemode')
  header.classList.toggle('bluemode1')
});

