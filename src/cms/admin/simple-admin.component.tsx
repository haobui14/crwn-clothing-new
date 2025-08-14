import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Alert,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { AdminPanelSettings, ExitToApp, Dashboard } from "@mui/icons-material";
import { useAdminAuth } from "./admin-auth.context";
import AdminLogin from "./admin-login.component";

const SimpleAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { admin, isLoading, login, logout, isAuthenticated } = useAdminAuth();

  // Show loading state
  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading admin authentication...
        </Typography>
      </Container>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={login} />;
  }

  // Show admin dashboard if authenticated
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AdminPanelSettings
            sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
          />
          <Box>
            <Typography variant="h4" component="h1">
              Admin Dashboard
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Crown Clothing CMS
            </Typography>
          </Box>
        </Box>
        <Button variant="outlined" startIcon={<ExitToApp />} onClick={logout}>
          Logout
        </Button>
      </Box>

      {/* Welcome Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                Welcome back, {admin?.username}!
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {admin?.email}
              </Typography>
            </Box>
            <Chip
              label={admin?.role?.toUpperCase()}
              color={admin?.role === "super-admin" ? "error" : "primary"}
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>

      {/* Success Alert */}
      <Alert severity="success" sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          🎉 Admin Authentication Working!
        </Typography>
        <Typography>
          You have successfully logged in with the separate admin system:
          <br />
          ✅ Separate admin database collection
          <br />
          ✅ Independent login system
          <br />
          ✅ Role-based access control
          <br />✅ Persistent admin sessions
        </Typography>
      </Alert>

      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom>
        Quick Actions
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 2,
          mb: 4,
        }}
      >
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Dashboard sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Full CMS Dashboard
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Access the complete content management system
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/admin-full")}
              fullWidth
            >
              Open CMS
            </Button>
          </CardContent>
        </Card>

        {admin?.role === "super-admin" && (
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <AdminPanelSettings
                sx={{ fontSize: 40, color: "error.main", mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Admin User Management
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Manage administrator accounts and permissions
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/admin-users")}
                fullWidth
              >
                Manage Users
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Admin Info */}
      <Alert severity="info">
        <Typography variant="h6" gutterBottom>
          🛠️ Admin System Features
        </Typography>
        <Typography>
          • <strong>Separate Database:</strong> Admin users are stored in a
          dedicated 'admin-users' collection
          <br />• <strong>Role-Based Access:</strong> Support for super-admin,
          admin, and editor roles
          <br />• <strong>Secure Authentication:</strong> Password hashing and
          session management
          <br />• <strong>Default Admin:</strong> Username: admin, Password:
          admin123 (created automatically)
          <br />• <strong>Independent System:</strong> Completely separate from
          regular user authentication
        </Typography>
      </Alert>
    </Container>
  );
};

export default SimpleAdmin;
