// src/todo-app.tsx
/** @jsx createElement */
// FIX: Removed setCurrentComponent, VNode is no longer needed at the top
import { createElement, useState } from './jsx-runtime';

// ... (Keep all your interfaces: Todo, TodoItemProps, etc.) ...
// ... (Keep all your components: TodoItem, AddTodoForm, TodoList) ...
interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
}
interface TodoItemProps {
    key?: string | number;
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}
const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
    const itemClass = todo.completed ? 'todo-item completed' : 'todo-item';
    const textClass = todo.completed ? 'todo-text strikethrough' : 'todo-text';
    return (
        <div className={itemClass}>
            <input
                type="checkbox"
                checked={todo.completed}
                onclick={() => onToggle(todo.id)}
                className="todo-checkbox"
            />
            <span className={textClass}>{todo.text}</span>
            <button
                onclick={() => onDelete(todo.id)}
                className="btn-delete"
            >
                Delete
            </button>
        </div>
    );
};
interface AddTodoFormProps {
    onAdd: (text: string) => void;
}
const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
    let inputElement: HTMLInputElement;
    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const text = inputElement.value.trim();
        if (text) {
            onAdd(text);
            inputElement.value = '';
        }
    };
    return (
        <form onsubmit={handleSubmit} className="add-todo-form">
            <input
                type="text"
                ref={(el: HTMLInputElement) => { inputElement = el; }}
                placeholder="Enter a new todo..."
                className="todo-input"
            />
            <button type="submit" className="btn-add">
                Add Todo
            </button>
        </form>
    );
};
interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}
const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
    if (todos.length === 0) {
        return <div className="empty-state">No todos yet. Add one above!</div>;
    }
    const todoItems: any[] = [];
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        todoItems.push(
            <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
            />
        );
    }
    return <div className="todo-list">{todoItems}</div>;
};

let nextTodoId = 1;

// FIX: Renamed your main component to TodoApp
export const TodoApp = () => {
    const [getTodos, setTodos] = useState<Todo[]>([]);

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: nextTodoId++,
            text: text,
            completed: false,
            createdAt: new Date()
        };
        const currentTodos = getTodos();
        setTodos([...currentTodos, newTodo]);
    };

    const toggleTodo = (id: number) => {
        const currentTodos = getTodos();
        const updatedTodos = currentTodos.map((todo: Todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const deleteTodo = (id: number) => {
        const currentTodos = getTodos();
        const filteredTodos = currentTodos.filter((todo: Todo) => todo.id !== id);
        setTodos(filteredTodos);
    };

    const todos = getTodos();
    const totalCount = todos.length;
    const completedCount = todos.filter((todo: Todo) => todo.completed).length;
    const activeCount = totalCount - completedCount;

    return (
        <div className="todo-app">
            <header className="todo-header">
                <h1>Todo List</h1>
            </header>
            <AddTodoForm onAdd={addTodo} />
            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
            />
            <div className="todo-summary">
                <span className="summary-item">Total: {totalCount}</span>
                <span className="summary-item"> | Active: {activeCount}</span>
                <span className="summary-item"> | Completed: {completedCount}</span>
            </div>
        </div>
    );
};
// FIX: Removed the old wrapper and extra exports