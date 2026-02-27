import { useState } from "react";

export function useAuthForm() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    function resetState() {
        setError(null);
        setSuccess(null);
        setLoading(false);
    }


    return {
        showPassword, 
        setShowPassword,
        loading,
        setLoading,
        error,
        setError,
        success,
        setSuccess,
        resetState
    }
}