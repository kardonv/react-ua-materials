export interface AdvancedFormRef {
    // Basic form methods
    focus: () => void;
    blur: () => void;
    reset: () => void;

    // Validation methods
    validate: () => { isValid: boolean; errors: string[] };
    validateField: (fieldName: string) => { isValid: boolean; error: string };

    // Data methods
    getData: () => FormData;
    setData: (data: Partial<FormData>) => void;

    // State methods
    isDirty: () => boolean;
    isSubmitting: () => boolean;

    // Advanced methods
    submit: () => Promise<{ success: boolean; message: string }>;
    clearErrors: () => void;
}

export interface FormData {
    name: string;
    email: string;
    age: string;
    message: string;
}

export interface FormErrors {
    name?: string;
    email?: string;
    age?: string;
    message?: string;
}