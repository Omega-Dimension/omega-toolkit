import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  alpha,
  useTheme,
  Alert,
} from "@mui/material";
import {
  Google,
  GitHub,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useState } from "react";
import { useModal } from "../hooks/useModal";
import { useAuthForm } from "../hooks/useAuthForm";
import {
  signInWithGoogle,
  signInWithGithub,
  signUpWithEmail,
} from "../config/firebase";
import type { SignUpFormData } from "../types/authForm";
import { useNavigate } from "react-router-dom";
import { buildPath } from "../utils/globalfunctions";

interface SignUpModalProps {
  onLoginClick?: () => void;
}

export default function SignUpModal({ onLoginClick }: SignUpModalProps) {
  const theme = useTheme();
  const { closeModal } = useModal();
  const {
    showPassword,
    setShowPassword,
    loading,
    setLoading,
    error,
    setError,
    success,
    setSuccess,
  } = useAuthForm();

  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const { user, error } = await signUpWithEmail(
        formData.email,
        formData.password,
      );
      if (error) {
        setError(error);
      } else if (user) {
        setSuccess("Account created successfully!");
        setTimeout(() => {
          closeModal();
          navigate(buildPath("/dashboard"))
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setError(null);
    setLoading(true);

    try {
      let result;
      if (provider === "Google") {
        result = await signInWithGoogle();
      } else {
        result = await signInWithGithub();
      }

      if (result?.error) {
        setError(result.error);
      } else if (result?.user) {
        setSuccess(`Account created with ${provider} successfully!`);
        setTimeout(() => {
          closeModal();
          
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${alpha(
              theme.palette.primary.main,
              0.7,
            )})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mb: 1,
          }}
        >
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign up to start using ToolBox
        </Typography>
      </Box>

      {/* Error/Success Messages */}
      {error && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ borderRadius: 2 }}>
          {success}
        </Alert>
      )}

      {/* Social Login Buttons */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={() => handleSocialLogin("Google")}
          disabled={loading}
          sx={{
            flex: 1,
            py: 1,
            borderColor: alpha(theme.palette.divider, 0.5),
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
            },
          }}
        >
          Google
        </Button>
        <Button
          variant="outlined"
          startIcon={<GitHub />}
          onClick={() => handleSocialLogin("GitHub")}
          disabled={loading}
          sx={{
            flex: 1,
            py: 1,
            borderColor: alpha(theme.palette.divider, 0.5),
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
            },
          }}
        >
          GitHub
        </Button>
      </Box>

      <Divider sx={{ my: 1 }}>
        <Typography variant="caption" color="text.secondary">
          OR
        </Typography>
      </Divider>

      {/* Email Field */}
      <TextField
        fullWidth
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={loading}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ fontSize: 20, color: "text.secondary" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover fieldset": {
              borderColor: theme.palette.primary.main,
            },
          },
            "& input:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
            transition: "background-color 9999s ease-in-out 0s",
          },
        }}
      />

      {/* Password Field */}
      <TextField
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        required
        disabled={loading}
        helperText="Minimum 6 characters"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ fontSize: 20, color: "text.secondary" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                  disabled={loading}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover fieldset": {
              borderColor: theme.palette.primary.main,
            },
          },
            "& input:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
            transition: "background-color 9999s ease-in-out 0s",
          },
        }}
      />

      {/* Confirm Password Field */}
      <TextField
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        disabled={loading}
        error={
          formData.password !== formData.confirmPassword &&
          formData.confirmPassword !== ""
        }
        helperText={
          formData.password !== formData.confirmPassword &&
          formData.confirmPassword !== ""
            ? "Passwords do not match"
            : ""
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ fontSize: 20, color: "text.secondary" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover fieldset": {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
        sx={{
          mt: 2,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${alpha(
            theme.palette.primary.main,
            0.8,
          )})`,
          boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
          "&:hover": {
            background: `linear-gradient(45deg, ${alpha(
              theme.palette.primary.main,
              0.9,
            )}, ${theme.palette.primary.main})`,
            transform: loading ? "none" : "translateY(-2px)",
            boxShadow: loading
              ? `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`
              : `0 12px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
          },
        }}
      >
        {loading ? "Please wait..." : "Sign Up"}
      </Button>

      {/* Login Link */}
      <Box sx={{ textAlign: "center", mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <Button
            size="small"
            onClick={onLoginClick}
            disabled={loading}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: "primary.main",
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            Sign In
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}
