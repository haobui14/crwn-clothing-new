import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Alert,
  Box,
  // @ts-ignore
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { adminAuthService, AdminUser } from "../admin-auth.service";
import { useAdminAuth } from "./admin-auth.context";

const AdminUserManagement: React.FC = () => {
  const { admin: currentAdmin } = useAdminAuth();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin" as AdminUser["role"],
  });

  // Only super-admin can manage other admins
  const canManageAdmins = currentAdmin?.role === "super-admin";

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      // We'll need to add this method to the admin auth service
      const adminList = await adminAuthService.getAllAdmins();
      setAdmins(adminList);
    } catch (error) {
      console.error("Error loading admins:", error);
      setError("Failed to load admin users");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (admin?: AdminUser) => {
    if (admin) {
      setEditingAdmin(admin);
      setFormData({
        username: admin.username,
        email: admin.email,
        password: "",
        role: admin.role,
      });
    } else {
      setEditingAdmin(null);
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "admin",
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingAdmin(null);
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "admin",
    });
    setError(null);
  };

  const handleSaveAdmin = async () => {
    if (!formData.username.trim() || !formData.email.trim()) {
      setError("Username and email are required");
      return;
    }

    if (!editingAdmin && !formData.password.trim()) {
      setError("Password is required for new admin");
      return;
    }

    try {
      if (editingAdmin) {
        // Update existing admin
        await adminAuthService.updateAdmin(editingAdmin.id, {
          username: formData.username,
          email: formData.email,
          role: formData.role,
          ...(formData.password && { password: formData.password }),
        });
      } else {
        // Create new admin
        await adminAuthService.createAdmin({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
      }

      await loadAdmins();
      handleCloseDialog();
    } catch (error) {
      setError("Failed to save admin user");
      console.error("Error saving admin:", error);
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    if (adminId === currentAdmin?.id) {
      setError("Cannot delete your own account");
      return;
    }

    if (window.confirm("Are you sure you want to delete this admin user?")) {
      try {
        await adminAuthService.deleteAdmin(adminId);
        await loadAdmins();
      } catch (error) {
        setError("Failed to delete admin user");
        console.error("Error deleting admin:", error);
      }
    }
  };

  const getRoleColor = (role: AdminUser["role"]) => {
    switch (role) {
      case "super-admin":
        return "error";
      case "admin":
        return "primary";
      case "editor":
        return "secondary";
      default:
        return "default";
    }
  };

  if (!canManageAdmins) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="warning">
          <Typography variant="h6" gutterBottom>
            Access Restricted
          </Typography>
          <Typography>
            Only super-admin users can manage admin accounts.
          </Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin User Management
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Manage admin accounts and permissions
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Admin
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h3" color="error.main">
                {admins.filter((a) => a.role === "super-admin").length}
              </Typography>
              <Typography color="textSecondary">Super Admins</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h3" color="primary.main">
                {admins.filter((a) => a.role === "admin").length}
              </Typography>
              <Typography color="textSecondary">Admins</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h3" color="secondary.main">
                {admins.filter((a) => a.role === "editor").length}
              </Typography>
              <Typography color="textSecondary">Editors</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Admin Users Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      <strong>{admin.username}</strong>
                      {admin.id === currentAdmin?.id && (
                        <Chip label="You" size="small" sx={{ ml: 1 }} />
                      )}
                    </TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={admin.role.toUpperCase()}
                        color={getRoleColor(admin.role)}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {admin.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {admin.lastLogin
                        ? admin.lastLogin.toLocaleDateString()
                        : "Never"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={admin.isActive ? "Active" : "Inactive"}
                        color={admin.isActive ? "success" : "default"}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(admin)}
                      >
                        <EditIcon />
                      </IconButton>
                      {admin.id !== currentAdmin?.id && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteAdmin(admin.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Admin Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingAdmin ? "Edit Admin User" : "Add New Admin User"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              fullWidth
            />
            <TextField
              label={
                editingAdmin
                  ? "New Password (leave blank to keep current)"
                  : "Password"
              }
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={!editingAdmin}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as AdminUser["role"],
                  })
                }
              >
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="super-admin">Super Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveAdmin} variant="contained">
            {editingAdmin ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminUserManagement;
