import { state } from "./state.js";
import { showTime, startTimer } from "./timer.js";

const btnStart = document.querySelector('.control__btn-start');
const btnStop = document.querySelector('.control__btn-stop');
const navigationBtns = document.querySelectorAll('.navigation__btn');


export const changeActiveBtn = (dataUse) => {
    state.status = dataUse;
    for(let i = 0; i < navigationBtns.length; i++){
        if(navigationBtns[i].dataset.use === dataUse){
            navigationBtns[i].classList.add('navigation__btn-active');
        } else{
            navigationBtns[i].classList.remove('navigation__btn-active');
        }
    }
}

const stop = () => {
    clearTimeout(state.timerId);
    state.isActive = false;
    btnStart.textContent = 'Старт';
    state.timeLeft = state[state.status] * 60;
    showTime(state.timeLeft);
}

export const initControl = () => {
    btnStart.addEventListener('click', () => {
        if(!state.isActive){
            state.isActive = true;
            startTimer();
            btnStart.textContent = 'Пауза';
        } else {
            clearTimeout(state.timerId);
            state.isActive = false;
            btnStart.textContent = 'Старт';
        }
    });


    btnStop.addEventListener('click', stop);
    showTime(state.timeLeft);
    startTimer();
    
    navigationBtns.forEach((btn) => {
        btn.addEventListener('click', () =>{
            changeActiveBtn(btn.dataset.use);
            stop();
        });
    });

}

