import { FormState } from "../types/FormReducer";

export function validateField(fieldName: keyof FormState['fields'], value: string, state: FormState): string {
    switch (fieldName) {
        case 'firstName':
            if (!value.trim()) return 'First name is required';
            if (value.length < 2) return 'First name must be at least 2 characters';
            return '';

        case 'lastName':
            if (!value.trim()) return 'Last name is required';
            if (value.length < 2) return 'Last name must be at least 2 characters';
            return '';

        case 'email':
            if (!value.trim()) return 'Email is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Please enter a valid email address';
            return '';

        case 'password':
            if (!value) return 'Password is required';
            if (value.length < 8) return 'Password must be at least 8 characters';
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
            }
            return '';

        case 'confirmPassword':
            if (!value) return 'Please confirm your password';
            if (value !== state.fields.password.value) return 'Passwords do not match';
            return '';

        case 'age':
            if (!value) return 'Age is required';
            const age = parseInt(value);
            if (isNaN(age) || age < 13 || age > 120) return 'Age must be between 13 and 120';
            return '';

        case 'agreeToTerms':
            if (value !== 'true') return 'You must agree to the terms and conditions';
            return '';

        default:
            return '';
    }
}