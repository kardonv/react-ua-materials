export interface InputRef {
    focus: () => void;
    blur: () => void;
    select: () => void;
    // Problem: We also expose internal methods that shouldn't be public
    validateInput: () => boolean;
    clearValidation: () => void;
    setInternalState: (value: string) => void;
}
