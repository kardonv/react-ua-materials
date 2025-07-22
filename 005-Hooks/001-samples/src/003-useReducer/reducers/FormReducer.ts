import { validateField } from "../helpers/validateField";
import { FormAction, FormField, FormState } from "../types/FormReducer";

export const initialField: FormField = {
    value: '',
    error: '',
    touched: false
};

export const initialState: FormState = {
    fields: {
        firstName: initialField,
        lastName: initialField,
        email: initialField,
        password: initialField,
        confirmPassword: initialField,
        age: initialField,
        agreeToTerms: initialField
    },
    isSubmitting: false,
    isSubmitted: false,
    submitError: ''
};

export function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case 'SET_FIELD_VALUE':
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.payload.field]: {
                        ...state.fields[action.payload.field],
                        value: action.payload.value,
                        error: '' // Clear error when user starts typing
                    }
                }
            };

        case 'SET_FIELD_ERROR':
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.payload.field]: {
                        ...state.fields[action.payload.field],
                        error: action.payload.error
                    }
                }
            };

        case 'SET_FIELD_TOUCHED':
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.payload.field]: {
                        ...state.fields[action.payload.field],
                        touched: action.payload.touched
                    }
                }
            };

        case 'VALIDATE_FIELD':
            const field = state.fields[action.payload];
            const error = validateField(action.payload, field.value, state);
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.payload]: {
                        ...field,
                        error,
                        touched: true
                    }
                }
            };

        case 'VALIDATE_ALL_FIELDS':
            const updatedFields = { ...state.fields };
            let hasErrors = false;

            Object.keys(updatedFields).forEach(fieldName => {
                const fieldKey = fieldName as keyof FormState['fields'];
                const error = validateField(fieldKey, updatedFields[fieldKey].value, state);
                updatedFields[fieldKey] = {
                    ...updatedFields[fieldKey],
                    error,
                    touched: true
                };
                if (error) hasErrors = true;
            });

            return {
                ...state,
                fields: updatedFields,
                submitError: hasErrors ? 'Please fix the errors above' : ''
            };

        case 'SET_SUBMITTING':
            return {
                ...state,
                isSubmitting: action.payload
            };

        case 'SET_SUBMITTED':
            return {
                ...state,
                isSubmitted: action.payload
            };

        case 'SET_SUBMIT_ERROR':
            return {
                ...state,
                submitError: action.payload
            };

        case 'RESET_FORM':
            return initialState;

        default:
            return state;
    }
}