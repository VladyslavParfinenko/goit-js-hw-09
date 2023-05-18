const bG = document.querySelector('body');

console.log(bG);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

bG.className = 'js-color';
timerId = null;



const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');


startBtn.style.padding = '5px 30px';
stopBtn.style.padding = '5px 30px';



console.log(startBtn);

startBtn.addEventListener('click',changeColor);

function changeColor (){
    timerId = setInterval(() => {
        bG.style.backgroundColor = getRandomHexColor();
      }, 1000);
      startBtn.disabled = true;
     
}

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.disabled = false;
  });
