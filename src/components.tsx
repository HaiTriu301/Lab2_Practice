// src/components.tsx
/** @jsx createElement */
import {createElement, ComponentProps} from './jsx-runtime';

// --- Card Component ---

interface CardProps extends ComponentProps {
    title?: string;
    className?: string;
    onClick?: (e: Event) => void;
}

export const Card = ({title, children, className = '', onClick}: CardProps) => {
    return (
        <div className={`card ${className}`} onClick={onClick}>
            {title && <div className="card-header"><h3>{title}</h3></div>}
            <div className="card-content">
                {children}
            </div>
        </div>
    );
};

// Modal Component
interface ModalProps extends ComponentProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

export const Modal = ({isOpen, onClose, title, children}: ModalProps) => {
    // Return null if not open
    if (!isOpen) {
        return null;
    }

    // Handle overlay click to close [cite: 345]
    const handleOverlayClick = (e: Event) => {
        // Only close if the click is on the overlay itself, not content
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    {title && <h2>{title}</h2>}
                    <button onClick={onClose} className="modal-close-btn">&times;</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- Form Component ---
interface FormProps extends ComponentProps {
    onSubmit: (e: Event) => void;
    className?: string;
}

export const Form = ({onSubmit, children, className = ''}: FormProps) => {

    const handleSubmit = (e: Event) => {
        e.preventDefault(); // Handle form submission and prevent default [cite: 354]
        onSubmit(e);
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

// Input Component

interface InputProps extends ComponentProps {
    type?: string;
    value: string | number;
    onChange: (e: Event) => void;
    placeholder?: string;
    className?: string;
    name?: string;
    required?: boolean;
}

export const Input = ({
                          type = 'text',
                          value,
                          onChange,
                          placeholder,
                          className = '',
                          name,
                          required
                      }: InputProps) => {

    // Handle the oninput event, as it's more general for inputs
    const handleChange = (e: Event) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <input
            type={type}
            value={value}
            onInput={handleChange}
            onChange={handleChange}
            placeholder={placeholder}
            className={`input ${className}`}
            name={name}
            required={required}
        />
    );
};