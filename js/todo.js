import { state } from "./state.js";

const titleElem = document.querySelector('.title');
const countPomodoro = document.querySelector('.count-num');
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

const deleteTodo = (title) => {
    const todoList = getTodo().filter((item) => item.title !== title );
    localStorage.setItem('pomodoro', JSON.stringify(todoList));
}

const editTodo = (title) => {
    const newTitle = prompt('Редактировать задачу');
    const todoList = getTodo().map((todo) => {
        if(todo.title === title){
            return {
                title: newTitle,
                pomodoro: 0,
                id: todo.id,
            };
        }
        return todo;
    });
    localStorage.setItem('pomodoro', JSON.stringify(todoList));
    return newTitle;
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
        });

        editBtn.addEventListener('click', () => {
            todo.title = editTodo(todo.title);
            todoBtn.textContent = todo.title;
        });

        delBtn.addEventListener('click', () => {
            deleteTodo(todo.title);
            todoItem.remove();
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
    countPomodoro.textContent = state.activeTodo.pomodoro;

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