// src/auth/LoginModal.tsx
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
  Snackbar,
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
import { 
  signInWithGoogle, 
  signInWithGithub, 
  signInWithEmail,
  signUpWithEmail 
} from "../config/firebase";

export default function LoginModal() {
  const theme = useTheme();
  const { closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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

    try {
      if (isSignUp) {
        // Sign up validation
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        
        const { user, error } = await signUpWithEmail(formData.email, formData.password);
        if (error) {
          setError(error);
        } else if (user) {
          setSuccess("Account created successfully!");
          setTimeout(() => {
            closeModal();
          }, 1500);
        }
      } else {
        // Sign in
        const { user, error } = await signInWithEmail(formData.email, formData.password);
        if (error) {
          setError(error);
        } else if (user) {
          setSuccess("Logged in successfully!");
          setTimeout(() => {
            closeModal();
          }, 1500);
        }
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
      } else if (provider === "GitHub") {
        result = await signInWithGithub();
      }

      if (result?.error) {
        setError(result.error);
      } else if (result?.user) {
        setSuccess(`Logged in with ${provider} successfully!`);
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

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    setFormData({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <>
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
                0.7
              )})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 1,
            }}
          >
            {isSignUp ? "Create Account" : "Welcome Back"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isSignUp 
              ? "Sign up to start using ToolBox" 
              : "Sign in to continue to ToolBox"}
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
        <Box sx={{ display: "flex", gap: 2, signInWithGithubjustifyContent: "center" }}>
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ fontSize: 20, color: "text.secondary" }} />
              </InputAdornment>
            ),
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
          InputProps={{
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

        {/* Confirm Password Field (only for sign up) */}
        {isSignUp && (
          <TextField
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ fontSize: 20, color: "text.secondary" }} />
                </InputAdornment>
              ),
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
        )}

        {/* Forgot Password - only for sign in */}
        {!isSignUp && (
          <Box sx={{ textAlign: "right" }}>
            <Button
              size="small"
              sx={{
                textTransform: "none",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "transparent",
                },
              }}
            >
              Forgot Password?
            </Button>
          </Box>
        )}

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
              0.8
            )})`,
            boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
            "&:hover": {
              background: `linear-gradient(45deg, ${alpha(
                theme.palette.primary.main,
                0.9
              )}, ${theme.palette.primary.main})`,
              transform: loading ? "none" : "translateY(-2px)",
              boxShadow: loading 
                ? `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`
                : `0 12px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
          }}
        >
          {loading ? "Please wait..." : (isSignUp ? "Sign Up" : "Sign In")}
        </Button>

        {/* Toggle between Sign In and Sign Up */}
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button
              size="small"
              onClick={toggleMode}
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
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </Typography>
        </Box>
      </Box>
    </>
  );
}