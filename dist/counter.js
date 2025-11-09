// src/counter.tsx
/** @jsx createElement */
import { createElement, useState } from './jsx-runtime';
// Button component
const Button = ({ onClick, children, className = '' }) => {
    return (createElement("button", { onClick: onClick, className: `btn ${className}` }, children));
};
// Counter component
const Counter = ({ initialCount = 0 }) => {
    // State management for count value
    const [getCount, setCount] = useState(initialCount);
    // Increment function
    const increment = () => {
        setCount(getCount() + 1);
    };
    // Decrement function
    const decrement = () => {
        setCount(getCount() - 1);
    };
    // Reset function
    const reset = () => {
        setCount(initialCount);
    };
    // Render the counter UI
    return (createElement("div", { className: "counter" },
        createElement("h2", null,
            "Count: ",
            getCount()),
        createElement("div", { className: "buttons" },
            createElement(Button, { onClick: increment, className: "btn-increment" }, "+"),
            createElement(Button, { onClick: decrement, className: "btn-decrement" }, "-"),
            createElement(Button, { onClick: reset, className: "btn-reset" }, "Reset"))));
};
// Export Counter component
export { Counter, Button };
