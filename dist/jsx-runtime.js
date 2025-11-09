// src/jsx-runtime.ts
// Exercise 1.2: Basic JSX Runtime Implementation
// createElement function - converts JSX syntax to VNode objects
export function createElement(type, props, ...children) {
    // STEP 1: Handle props (use empty object if null)
    const normalizedProps = props || {};
    // STEP 2: Flatten and filter children (remove null/undefined)
    const flatChildren = children
        .flat()
        .filter(child => child !== null && child !== undefined);
    // STEP 3: Return VNode object
    return {
        type,
        props: { ...normalizedProps, children: flatChildren },
        children: flatChildren
    };
}
// createFragment function - allows grouping elements without extra wrapper
export function createFragment(props, ...children) {
    // Use createElement with 'fragment' as type
    return createElement('fragment', props, ...children);
}
// Exercise 1.3: DOM Rendering System
// State management
let currentComponent = null;
let currentStateIndex = 0;
const componentStates = new Map();
// renderToDOM function - converts VNode objects to actual DOM elements
export function renderToDOM(vnode) {
    // --- NEW STEP 0: Handle non-renderable values ---
    // If vnode is null, undefined, or boolean, render an empty text node (nothing)
    if (vnode === null || vnode === undefined || typeof vnode === 'boolean') {
        return document.createTextNode('');
    }
    // STEP 1: Handle text nodes (strings and numbers)
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return document.createTextNode(String(vnode));
    }
    // STEP 2: Handle fragments
    if (vnode.type === 'fragment') {
        const fragment = document.createDocumentFragment();
        vnode.children.forEach(child => {
            fragment.appendChild(renderToDOM(child));
        });
        return fragment;
    }
    // STEP 3: Handle component functions
    if (typeof vnode.type === 'function') {
        // DO NOT reset the index here
        const result = vnode.type(vnode.props);
        return renderToDOM(result);
    }
    // STEP 4: Handle regular HTML elements
    const element = document.createElement(vnode.type);
    // Set attributes and properties
    Object.keys(vnode.props).forEach(key => {
        if (key === 'children')
            return;
        const value = vnode.props[key];
        // Handle event listeners (onClick, onChange, etc.)
        if (key.startsWith('on') && typeof value === 'function') {
            const eventName = key.substring(2).toLowerCase();
            element.addEventListener(eventName, value);
            return;
        }
        // Handle className (JSX uses className instead of class)
        if (key === 'className') {
            element.className = value;
            return;
        }
        // Handle style prop (both string and object styles)
        if (key === 'style') {
            if (typeof value === 'string') {
                element.setAttribute('style', value);
            }
            else if (typeof value === 'object') {
                Object.keys(value).forEach(styleKey => {
                    const kebabKey = styleKey.replace(/([A-Z])/g, '-$1').toLowerCase();
                    element.style.setProperty(kebabKey, value[styleKey]);
                });
            }
            return;
        }
        // Handle ref (refs allow direct access to DOM elements)
        if (key === 'ref' && typeof value === 'function') {
            value(element);
            return;
        }
        // Handle boolean attributes (disabled, checked, etc.)
        if (typeof value === 'boolean') {
            if (value) {
                element.setAttribute(key, '');
            }
        }
        else {
            // Handle other attributes
            element.setAttribute(key, String(value));
        }
    });
    // Append children
    vnode.children.forEach(child => {
        element.appendChild(renderToDOM(child));
    });
    return element;
}
// mount function - attaches a VNode to a real DOM container
export function mount(vnode, container) {
    // This is the start of a new render tree. Reset the state index here.
    currentStateIndex = 0;
    container.innerHTML = '';
    const dom = renderToDOM(vnode);
    container.appendChild(dom);
}
// useState hook - simple state management for components
export function useState(initialValue) {
    // STEP 1: Store the current value
    const stateId = currentStateIndex++;
    if (!componentStates.has(stateId)) {
        componentStates.set(stateId, initialValue);
    }
    // STEP 2: Create getter function
    const getValue = () => componentStates.get(stateId);
    // STEP 3: Create setter function that updates value
    const setValue = (newValue) => {
        const value = typeof newValue === 'function'
            ? newValue(componentStates.get(stateId))
            : newValue;
        componentStates.set(stateId, value);
        // STEP 4: Handle re-rendering
        if (currentComponent) {
            const container = document.getElementById('root');
            if (container) {
                mount(currentComponent(), container);
            }
        }
    };
    return [getValue, setValue];
}
// Helper function to set the current component for re-rendering
export function setCurrentComponent(component) {
    currentComponent = component;
}
