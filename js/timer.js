import { alarm } from "./alarm.js";
import { changeActiveBtn} from "./control.js";
import { state } from "./state.js"
import { showTodo } from "./todo.js";
import { addZero } from "./util.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

export const showTime = (seconds) => {
    minutesElem.textContent = addZero(Math.floor(seconds / 60));
    secondsElem.textContent = addZero(seconds % 60);
}

export const startTimer = () => {

    // отобразить время
    showTime(state.timeLeft);

    if(state.timeLeft > 0 && state.isActive) {
        state.timerId = setTimeout(() => {
            state.timeLeft--;
            startTimer();
        }, 1000);
    }

    if(state.timeLeft <= 0){
        //сигнализировать что время вышло
        if(state.status === 'work'){
            state.activeTodo.pomodoro += 1;
            showTodo(state.activeTodo.pomodoro);

            if(state.activeTodo.pomodoro % state.count){
                state.status = 'break';
            } else {
                state.status = 'relax';
            }

        } else {
            state.status = 'work';
        }
        state.timeLeft = state[state.status] * 60;
        changeActiveBtn(state.status);
        alarm(state.status);
        startTimer();

    }
}