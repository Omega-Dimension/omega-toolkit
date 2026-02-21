// components/LoginModal.tsx
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

export default function LoginModal() {
  const theme = useTheme();
  const { closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", formData);
    // You can close modal after successful login if needed
    // closeModal();
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Handle social login logic here
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
              0.7
            )})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mb: 1,
          }}
        >
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to continue to ToolBox
        </Typography>
      </Box>

      {/* Social Login Buttons */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={() => handleSocialLogin("Google")}
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

      {/* Forgot Password */}
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

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        size="large"
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
            transform: "translateY(-2px)",
            boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
          },
        }}
      >
        Sign In
      </Button>

      {/* Sign Up Link */}
      <Box sx={{ textAlign: "center", mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{" "}
          <Button
            size="small"
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
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}