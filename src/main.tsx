// src/main.tsx
/** @jsx createElement */
// FIX: Import setCurrentComponent and VNode
import { createElement, mount, setCurrentComponent, VNode } from './jsx-runtime';
import { DashboardApp } from './dashboard';
import { Counter } from './counter';
import { TodoApp } from './todo-app';

// Find the root container element in index.html
const container = document.getElementById('root');

const App = (): VNode => {
    return (
        <div className="app-wrapper">
            <h1>My Custom JSX Project</h1>

            <hr />

            {/* Counter App */}
            <Counter initialCount={0} />

            <hr />

            {/* Todo App */}
            <TodoApp />

            <hr />

            {/* Dashboard App */}
            <DashboardApp />
        </div>
    );
};

// Mount the app
if (container) {
    // FIX: Set the 'App' component as the *only* component to re-render
    setCurrentComponent(App);
    // Mount the App
    mount(<App />, container);
} else {
    console.error('Root container not found. Failed to mount the app.');
}