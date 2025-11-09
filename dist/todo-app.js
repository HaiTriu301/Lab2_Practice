// src/todo-app.tsx
/** @jsx createElement */
// FIX: Removed setCurrentComponent, VNode is no longer needed at the top
import { createElement, useState } from './jsx-runtime';
const TodoItem = ({ todo, onToggle, onDelete }) => {
    const itemClass = todo.completed ? 'todo-item completed' : 'todo-item';
    const textClass = todo.completed ? 'todo-text strikethrough' : 'todo-text';
    return (createElement("div", { className: itemClass },
        createElement("input", { type: "checkbox", checked: todo.completed, onclick: () => onToggle(todo.id), className: "todo-checkbox" }),
        createElement("span", { className: textClass }, todo.text),
        createElement("button", { onclick: () => onDelete(todo.id), className: "btn-delete" }, "Delete")));
};
const AddTodoForm = ({ onAdd }) => {
    let inputElement;
    const handleSubmit = (e) => {
        e.preventDefault();
        const text = inputElement.value.trim();
        if (text) {
            onAdd(text);
            inputElement.value = '';
        }
    };
    return (createElement("form", { onsubmit: handleSubmit, className: "add-todo-form" },
        createElement("input", { type: "text", ref: (el) => { inputElement = el; }, placeholder: "Enter a new todo...", className: "todo-input" }),
        createElement("button", { type: "submit", className: "btn-add" }, "Add Todo")));
};
const TodoList = ({ todos, onToggle, onDelete }) => {
    if (todos.length === 0) {
        return createElement("div", { className: "empty-state" }, "No todos yet. Add one above!");
    }
    const todoItems = [];
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        todoItems.push(createElement(TodoItem, { key: todo.id, todo: todo, onToggle: onToggle, onDelete: onDelete }));
    }
    return createElement("div", { className: "todo-list" }, todoItems);
};
let nextTodoId = 1;
// FIX: Renamed your main component to TodoApp
export const TodoApp = () => {
    const [getTodos, setTodos] = useState([]);
    const addTodo = (text) => {
        const newTodo = {
            id: nextTodoId++,
            text: text,
            completed: false,
            createdAt: new Date()
        };
        const currentTodos = getTodos();
        setTodos([...currentTodos, newTodo]);
    };
    const toggleTodo = (id) => {
        const currentTodos = getTodos();
        const updatedTodos = currentTodos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        setTodos(updatedTodos);
    };
    const deleteTodo = (id) => {
        const currentTodos = getTodos();
        const filteredTodos = currentTodos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
    };
    const todos = getTodos();
    const totalCount = todos.length;
    const completedCount = todos.filter((todo) => todo.completed).length;
    const activeCount = totalCount - completedCount;
    return (createElement("div", { className: "todo-app" },
        createElement("header", { className: "todo-header" },
            createElement("h1", null, "Todo List")),
        createElement(AddTodoForm, { onAdd: addTodo }),
        createElement(TodoList, { todos: todos, onToggle: toggleTodo, onDelete: deleteTodo }),
        createElement("div", { className: "todo-summary" },
            createElement("span", { className: "summary-item" },
                "Total: ",
                totalCount),
            createElement("span", { className: "summary-item" },
                " | Active: ",
                activeCount),
            createElement("span", { className: "summary-item" },
                " | Completed: ",
                completedCount))));
};
// FIX: Removed the old wrapper and extra exports
