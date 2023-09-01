import { changeActiveBtn, stop } from "./control.js";
import { state } from "./state.js";

const titleElem = document.querySelector('.title');
const countElem = document.querySelector('.count-num');
const todoListElem = document.querySelector('.todo__list');
const todoAddLi = document.createElement('li');
todoAddLi.classList.add('todo__item');

const todoAddBtn = document.createElement('button');
todoAddBtn.classList.add('todo__add');
todoAddBtn.textContent = 'Добавить новую задачу';
todoAddLi.append(todoAddBtn);


const getTodo = () => {
    const todoList = JSON.parse(localStorage.getItem('pomodoro') || '[]');
    return todoList;
}

const addTodo = (title) => {
    const todo = {
        title,
        pomodoro: 0,
        id: Math.random().toString(16).substring(2, 8),
    };

    const todoList = getTodo();
    todoList.push(todo);
    state.activeTodo = todo;

    localStorage.setItem('pomodoro', JSON.stringify(todoList));
    return todo;
}

const deleteTodo = (todo) => {
    const todoList = getTodo().filter((item) => item.id !== todo.id);
    localStorage.setItem('pomodoro', JSON.stringify(todoList));
    if(!todoList.length){
        state.activeTodo = {
            id: 'default',
            pomodoro: 0,
            title: '',
        }
    }
    if(todo.id === state.activeTodo.id){
        state.activeTodo = todoList[todoList.length - 1];
    } 
}

export const updateTodo = (todo) => {
    const todoList = getTodo().map(todoItem => {
        if(todoItem.id === todo.id){
            todoItem.title = todo.title;
            todoItem.pomodoro = todo.pomodoro;
        }
        return todoItem;
    });;
    // const todoItem = todoList.find(item => item.id === todo.id);
    // todoItem.title = todo.title;
    // todoItem.pomodoro = todo.pomodoro;

    localStorage.setItem('pomodoro', JSON.stringify(todoList));
}

const createTodoListItem = (todo) => {
    if(todo.id !== 'default'){
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo__item');
        const todoItemWrapper = document.createElement('div');
        todoItemWrapper.classList.add('todo__item-wrapper');
        todoItem.append(todoItemWrapper);

        const todoBtn = document.createElement('button');
        todoBtn.classList.add('todo__btn');
        todoBtn.textContent = todo.title;

        const editBtn = document.createElement('button');

        editBtn.classList.add('todo__edit');
        editBtn.ariaLabel = 'Редактировать задачу';


        const delBtn = document.createElement('button');
        delBtn.classList.add('todo__del');
        delBtn.ariaLabel = 'Удалить задачу';

        todoItemWrapper.append(todoBtn, editBtn, delBtn);

        todoListElem.prepend(todoItem);

        todoBtn.addEventListener('click', () => {
            state.activeTodo = todo;
            showTodo();
            changeActiveBtn('work');
            stop();
        });

        editBtn.addEventListener('click', () => {
            todo.title = prompt('Название задачи', todo.title);
            todoBtn.textContent = todo.title;
            updateTodo(todo);
            showTodo();
        });

        delBtn.addEventListener('click', () => {
            deleteTodo(todo);
            todoItem.remove();
            showTodo();
        });

    }
}

const renderTodoList = (list) => {
    todoListElem.textContent = '';

    list.forEach(createTodoListItem);

    todoListElem.append(todoAddLi);

}

export const showTodo = () => {
    titleElem.textContent = state.activeTodo.title;
    countElem.textContent = state.activeTodo.pomodoro;

}

export const initTodo = () => {
    const todoList = getTodo();
    if(!todoList.length){
        state.activeTodo = {
            id: 'default',
            pomodoro: 0,
            title: 'Помодоро',
        };
    } else {
        state.activeTodo = todoList[todoList.length - 1];
    }

    showTodo();

    renderTodoList(todoList);

    todoAddBtn.addEventListener('click', () => {
        const title = prompt('Введите имя задачи');
        const todo = addTodo(title);
        createTodoListItem(todo);
        showTodo();
    })
}