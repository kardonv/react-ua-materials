import { useDebugValue, useEffect, useState } from "react";

export function useFormValidation(formData: { email: string; password: string }) {
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    useEffect(() => {
        const newErrors: { email?: string; password?: string } = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
    }, [formData]);

    // Complex debug value showing validation status
    useDebugValue(
        { formData, errors },
        ({ formData, errors }) => {
            const hasErrors = Object.keys(errors).length > 0;
            const isComplete = formData.email && formData.password;

            if (!isComplete) return '📝 Incomplete form';
            if (hasErrors) return '❌ Form has errors';
            return '✅ Form is valid';
        }
    );

    return { errors, isValid: Object.keys(errors).length === 0 };
}