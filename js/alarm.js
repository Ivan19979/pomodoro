// import { state } from "./state.js";

const audio = {
    work: new Audio('audio/dudu.mp3'),
    break: new Audio('audio/august.mp3'),
    relax: new Audio('audio/eralash.mp3'),
}

export const alarm = (status) => {
    audio[status].volume = 0.05;
    audio[status].play();
    setTimeout(() => {
        audio[status].pause()
    }, 2000);
}