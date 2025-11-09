// src/main.tsx
/** @jsx createElement */
// FIX: Import setCurrentComponent and VNode
import { createElement, mount, setCurrentComponent } from './jsx-runtime';
import { DashboardApp } from './dashboard';
import { Counter } from './counter';
import { TodoApp } from './todo-app';
// Find the root container element in index.html
const container = document.getElementById('root');
const App = () => {
    return (createElement("div", { className: "app-wrapper" },
        createElement("h1", null, "My Custom JSX Project"),
        createElement("hr", null),
        createElement(Counter, { initialCount: 0 }),
        createElement("hr", null),
        createElement(TodoApp, null),
        createElement("hr", null),
        createElement(DashboardApp, null)));
};
// Mount the app
if (container) {
    // FIX: Set the 'App' component as the *only* component to re-render
    setCurrentComponent(App);
    // Mount the App
    mount(createElement(App, null), container);
}
else {
    console.error('Root container not found. Failed to mount the app.');
}
