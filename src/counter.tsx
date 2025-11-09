// src/counter.tsx
/** @jsx createElement */
import { createElement, useState } from './jsx-runtime';

// Button component props interface
interface ButtonProps {
    onClick?: () => void;
    children: any;
    className?: string;
}

// Button component
const Button = ({ onClick, children, className = '' }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`btn ${className}`}
        >
            {children}
        </button>
    );
};

// Counter component props interface
interface CounterProps {
    initialCount?: number;
}

// Counter component
const Counter = ({ initialCount = 0 }: CounterProps) => {
    // State management for count value
    const [getCount, setCount] = useState<number>(initialCount);

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
    return (
        <div className="counter">
            <h2>Count: {getCount()}</h2>
            <div className="buttons">
                <Button onClick={increment} className="btn-increment">
                    +
                </Button>
                <Button onClick={decrement} className="btn-decrement">
                    -
                </Button>
                <Button onClick={reset} className="btn-reset">
                    Reset
                </Button>
            </div>
        </div>
    );
};

// Export Counter component
export { Counter, Button };