import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
} from "@mui/icons-material";
import { adminAuthService, AdminUser } from "../admin-auth.service";

interface AdminLoginProps {
  onLoginSuccess: (admin: AdminUser) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange =
    (field: keyof typeof credentials) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      // Clear error when user starts typing
      if (error) setError(null);
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!credentials.email.trim() || !credentials.password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const admin = await adminAuthService.login(
        credentials.email,
        credentials.password
      );

      if (admin) {
        onLoginSuccess(admin);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Admin login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <AdminPanelSettings
              sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              Admin Portal
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Crown Clothing CMS - Admin Access
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              required
              type="email"
              value={credentials.email}
              onChange={handleInputChange("email")}
              disabled={loading}
              autoComplete="email"
            />

            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              required
              type={showPassword ? "text" : "password"}
              value={credentials.password}
              onChange={handleInputChange("password")}
              disabled={loading}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button variant="text" size="small" onClick={() => navigate("/")}>
              ← Back to Store
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminLogin;
