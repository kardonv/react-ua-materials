export interface FormField {
    value: string;
    error: string;
    touched: boolean;
}

export interface FormState {
    fields: {
        firstName: FormField;
        lastName: FormField;
        email: FormField;
        password: FormField;
        confirmPassword: FormField;
        age: FormField;
        agreeToTerms: FormField;
    };
    isSubmitting: boolean;
    isSubmitted: boolean;
    submitError: string;
}

export type FormAction =
    | { type: 'SET_FIELD_VALUE'; payload: { field: keyof FormState['fields']; value: string } }
    | { type: 'SET_FIELD_ERROR'; payload: { field: keyof FormState['fields']; error: string } }
    | { type: 'SET_FIELD_TOUCHED'; payload: { field: keyof FormState['fields']; touched: boolean } }
    | { type: 'VALIDATE_FIELD'; payload: keyof FormState['fields'] }
    | { type: 'VALIDATE_ALL_FIELDS' }
    | { type: 'SET_SUBMITTING'; payload: boolean }
    | { type: 'SET_SUBMITTED'; payload: boolean }
    | { type: 'SET_SUBMIT_ERROR'; payload: string }
    | { type: 'RESET_FORM' };
