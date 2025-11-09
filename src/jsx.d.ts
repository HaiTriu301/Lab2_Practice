// src/jsx.d.ts - Type definitions for JSX

// --- Core Type Definitions ---
type VNode = {
    type: string | ComponentFunction;
    props: Record<string, any>;
    children: (VNode | string | number)[];
};

type ComponentProps = {
    children?: (VNode | string | number | null | undefined)[] | VNode | string | number | null | undefined;
    [key: string]: any;
};

type ComponentFunction = (props: ComponentProps) => VNode;

// --- JSX Namespace ---

declare namespace JSX {
    interface Element extends VNode {}

    interface ElementChildrenAttribute {
        children: {};
    }

    interface BaseAttributes {
        key?: string | number;
        ref?: (el: any) => void;
        children?: (VNode | string | number | null | undefined)[] | VNode | string | number | null | undefined;
    }

    interface HTMLAttributes extends BaseAttributes {
        className?: string;
        id?: string;
        style?: string | Record<string, string>;

        // Event Handlers
        onclick?: (e: Event) => void;
        onchange?: (e: Event) => void;
        onsubmit?: (e: Event) => void;
        oninput?: (e: Event) => void;
        // ... other handlers
        [key: string]: any;
    }

    // --- Intrinsic Elements (HTML tags) ---
    interface IntrinsicElements {
        input: InputAttributes;
        div: HTMLAttributes;
        span: HTMLAttributes;
        button: HTMLAttributes;
        form: FormAttributes;
        h1: HTMLAttributes;
        h2: HTMLAttributes;
        h3: HTMLAttributes;
        p: HTMLAttributes;
        a: AnchorAttributes;
        img: ImageAttributes;
        ul: HTMLAttributes;
        ol: HTMLAttributes;
        li: HTMLAttributes;
        header: HTMLAttributes;
        main: HTMLAttributes;
        label: HTMLAttributes;
        select: SelectAttributes;
        option: OptionAttributes;
        textarea: TextareaAttributes;
        canvas: CanvasAttributes;

        // FIX: Added the <hr> element
        hr: HTMLAttributes;
    }

    // --- Specific Element Attributes ---
    interface InputAttributes extends HTMLAttributes {
        type?: string;
        value?: string | number;
        placeholder?: string;
        disabled?: boolean;
        checked?: boolean;
        name?: string;
        required?: boolean;
    }
    interface FormAttributes extends HTMLAttributes {
        action?: string;
        method?: string;
    }
    interface AnchorAttributes extends HTMLAttributes {
        href?: string;
        target?: string;
    }
    interface ImageAttributes extends HTMLAttributes {
        src?: string;
        alt?: string;
        width?: string | number;
        height?: string | number;
    }
    interface SelectAttributes extends HTMLAttributes {
        value?: string;
        disabled?: boolean;
        multiple?: boolean;
    }
    interface OptionAttributes extends HTMLAttributes {
        value?: string;
        selected?: boolean;
    }
    interface TextareaAttributes extends HTMLAttributes {
        value?: string;
        placeholder?: string;
        disabled?: boolean;
        rows?: number;
    }
    interface CanvasAttributes extends HTMLAttributes {
        width?: string | number;
        height?: string | number;
    }
}