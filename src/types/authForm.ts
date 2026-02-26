export interface AuthFormData {
    email : string;
    password : string;
}

export interface SignUpFormData extends AuthFormData {
    confirmPassword : string;
}

export interface AuthModalProps {
    onSuccess?:() => void;
    onToggleMode?:() => void;
}