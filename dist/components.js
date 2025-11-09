// src/components.tsx
/** @jsx createElement */
import { createElement } from './jsx-runtime';
export const Card = ({ title, children, className = '', onClick }) => {
    return (createElement("div", { className: `card ${className}`, onClick: onClick },
        title && createElement("div", { className: "card-header" },
            createElement("h3", null, title)),
        createElement("div", { className: "card-content" }, children)));
};
export const Modal = ({ isOpen, onClose, title, children }) => {
    // Return null if not open
    if (!isOpen) {
        return null;
    }
    // Handle overlay click to close [cite: 345]
    const handleOverlayClick = (e) => {
        // Only close if the click is on the overlay itself, not content
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (createElement("div", { className: "modal-overlay", onClick: handleOverlayClick },
        createElement("div", { className: "modal-content" },
            createElement("div", { className: "modal-header" },
                title && createElement("h2", null, title),
                createElement("button", { onClick: onClose, className: "modal-close-btn" }, "\u00D7")),
            createElement("div", { className: "modal-body" }, children))));
};
export const Form = ({ onSubmit, children, className = '' }) => {
    const handleSubmit = (e) => {
        e.preventDefault(); // Handle form submission and prevent default [cite: 354]
        onSubmit(e);
    };
    return (createElement("form", { className: className, onSubmit: handleSubmit }, children));
};
export const Input = ({ type = 'text', value, onChange, placeholder, className = '', name, required }) => {
    // Handle the oninput event, as it's more general for inputs
    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };
    return (createElement("input", { type: type, value: value, onInput: handleChange, onChange: handleChange, placeholder: placeholder, className: `input ${className}`, name: name, required: required }));
};
