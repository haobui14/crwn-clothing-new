import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  Box,
  Tabs,
  Tab,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ProductIcon,
  Category as CategoryIcon,
  People as PeopleIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
  ExitToApp,
  Settings as SettingsIcon,
  CloudUpload as UploadIcon,
  CloudDownload as DownloadIcon,
  FileCopy as DuplicateIcon,
  Search as SearchIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";
import { useAdminAuth } from "./admin-auth.context";
import { cmsService, Product, Category } from "../cms.service";
import {
  bulkOperationsService,
  BulkOperationResult,
  AnalyticsData,
} from "../bulk-operations.service";
import AdminUserManagement from "./admin-user-management.component";
import ImageUpload from "../components/image-upload.component";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const FullCMSDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { admin, logout, isAuthenticated } = useAdminAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Product/Category form state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"product" | "category">(
    "product"
  );
  const [editingItem, setEditingItem] = useState<Product | Category | null>(
    null
  );
  const [formData, setFormData] = useState<any>({});

  // Tools/Analytics state
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
      return;
    }
    loadDashboardData();
  }, [isAuthenticated, navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsData, categoriesData] = await Promise.all([
        cmsService.getProducts(),
        cmsService.getCategories(),
      ]);
      setProducts(productsData || []);
      setCategories(categoriesData || []);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleOpenDialog = (
    type: "product" | "category",
    item?: Product | Category
  ) => {
    setDialogType(type);
    setEditingItem(item || null);

    if (type === "product") {
      setFormData({
        name: (item as Product)?.name || "",
        price: (item as Product)?.price || 0,
        imageUrl: (item as Product)?.imageUrl || "",
        category: (item as Product)?.category || "",
        featured: (item as Product)?.featured || false,
      });
    } else {
      setFormData({
        title: (item as Category)?.title || "",
        imageUrl: (item as Category)?.imageUrl || "",
        route: (item as Category)?.route || "",
      });
    }

    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleSaveItem = async () => {
    try {
      if (dialogType === "product") {
        if (editingItem) {
          await cmsService.updateProduct((editingItem as Product).id, formData);
        } else {
          await cmsService.createProduct(formData);
        }
      } else {
        if (editingItem) {
          await cmsService.updateCategory(
            (editingItem as Category).id,
            formData
          );
        } else {
          await cmsService.createCategory(formData);
        }
      }
      await loadDashboardData();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving item:", error);
      setError("Failed to save item");
    }
  };

  const handleDeleteItem = async (type: "product" | "category", id: string) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        if (type === "product") {
          await cmsService.deleteProduct(id);
        } else {
          await cmsService.deleteCategory(id);
        }
        await loadDashboardData();
      } catch (error) {
        console.error("Error deleting item:", error);
        setError(`Failed to delete ${type}`);
      }
    }
  };

  const getStatsData = () => ({
    totalProducts: products.length,
    totalCategories: categories.length,
    featuredProducts: products.filter((p) => p.featured).length,
    recentProducts: products.filter((p) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return p.createdAt > weekAgo;
    }).length,
  });

  // Tools functionality
  const loadAnalytics = async () => {
    try {
      const analyticsData = await bulkOperationsService.getAnalytics();
      setAnalytics(analyticsData);
    } catch (error) {
      console.error("Error loading analytics:", error);
      setError("Failed to load analytics");
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const results = await bulkOperationsService.searchProducts(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching products:", error);
      setError("Search failed");
    }
  };

  const handleBulkDelete = async (type: "products" | "categories") => {
    const ids = type === "products" ? selectedProducts : selectedCategories;
    if (ids.length === 0) return;

    if (
      window.confirm(`Are you sure you want to delete ${ids.length} ${type}?`)
    ) {
      setBulkLoading(true);
      try {
        let result: BulkOperationResult;
        if (type === "products") {
          result = await bulkOperationsService.bulkDeleteProducts(ids);
          setSelectedProducts([]);
        } else {
          result = await bulkOperationsService.bulkDeleteCategories(ids);
          setSelectedCategories([]);
        }

        if (result.success > 0) {
          await loadDashboardData();
        }

        if (result.errors.length > 0) {
          setError(`Some items failed to delete: ${result.errors.join(", ")}`);
        }
      } catch (error) {
        console.error("Bulk delete error:", error);
        setError("Bulk delete failed");
      }
      setBulkLoading(false);
    }
  };

  const handleExportData = async () => {
    try {
      const data = await bulkOperationsService.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cms-export-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
      setError("Export failed");
    }
  };

  const handleImportData = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      setBulkLoading(true);

      const result = await bulkOperationsService.importData(data);

      if (result.success > 0) {
        await loadDashboardData();
      }

      if (result.errors.length > 0) {
        setError(`Some items failed to import: ${result.errors.join(", ")}`);
      }
    } catch (error) {
      console.error("Import error:", error);
      setError("Import failed");
    }
    setBulkLoading(false);
  };

  useEffect(() => {
    if (currentTab === 4) {
      // Tools tab
      loadAnalytics();
    }
  }, [currentTab]);

  const stats = getStatsData();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
          <DashboardIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
          <Box>
            <Typography variant="h4" component="h1">
              CMS Dashboard
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Welcome back, {admin?.username} ({admin?.role})
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={() => navigate("/admin")}
          >
            Simple View
          </Button>
          <Button variant="outlined" startIcon={<ExitToApp />} onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* @ts-ignore */}
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <ProductIcon
                sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
              />
              <Typography variant="h4" color="primary.main">
                {stats.totalProducts}
              </Typography>
              <Typography color="textSecondary">Total Products</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* @ts-ignore */}
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <CategoryIcon
                sx={{ fontSize: 40, color: "secondary.main", mb: 1 }}
              />
              <Typography variant="h4" color="secondary.main">
                {stats.totalCategories}
              </Typography>
              <Typography color="textSecondary">Categories</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* @ts-ignore */}
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <StarIcon sx={{ fontSize: 40, color: "warning.main", mb: 1 }} />
              <Typography variant="h4" color="warning.main">
                {stats.featuredProducts}
              </Typography>
              <Typography color="textSecondary">Featured</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* @ts-ignore */}
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="success.main">
                {stats.recentProducts}
              </Typography>
              <Typography color="textSecondary">New This Week</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Products" />
          <Tab label="Categories" />
          <Tab label="Admin Users" disabled={admin?.role !== "super-admin"} />
          <Tab label="Tools" />
          <Tab label="Settings" />
        </Tabs>
      </Box>

      {/* Products Tab */}
      <TabPanel value={currentTab} index={0}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5">Products Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog("product")}
          >
            Add Product
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Featured</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.imageUrl || "/placeholder.jpg"}
                        alt={product.name}
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.jpg";
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <strong>{product.name}</strong>
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {product.featured && (
                        <Chip label="Featured" color="warning" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      {product.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog("product", product)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteItem("product", product.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TabPanel>

      {/* Categories Tab */}
      <TabPanel value={currentTab} index={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5">Categories Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog("category")}
          >
            Add Category
          </Button>
        </Box>

        <Grid container spacing={3}>
          {categories.map((category) => (
            // @ts-ignore
            <Grid xs={12} sm={6} md={4} key={category.id}>
              <Card>
                <img
                  src={category.imageUrl || "/placeholder.jpg"}
                  alt={category.title}
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.jpg";
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Route: /{category.route}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Created: {category.createdAt.toLocaleDateString()}
                  </Typography>
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenDialog("category", category)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteItem("category", category.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Admin Users Tab */}
      <TabPanel value={currentTab} index={2}>
        <AdminUserManagement />
      </TabPanel>

      {/* Tools Tab */}
      <TabPanel value={currentTab} index={3}>
        <Typography variant="h5" gutterBottom>
          Tools & Analytics
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Analytics Section */}
          {analytics && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <AnalyticsIcon sx={{ mr: 1 }} />
                  Analytics Overview
                </Typography>

                {/* @ts-ignore */}
                <Grid container spacing={3}>
                  {/* @ts-ignore */}
                  <Grid xs={12} sm={6} md={3}>
                    <Card sx={{ textAlign: "center", p: 2 }}>
                      <Typography variant="h4" color="primary">
                        {analytics.totalProducts}
                      </Typography>
                      <Typography variant="body2">Total Products</Typography>
                    </Card>
                  </Grid>
                  {/* @ts-ignore */}
                  <Grid xs={12} sm={6} md={3}>
                    <Card sx={{ textAlign: "center", p: 2 }}>
                      <Typography variant="h4" color="secondary">
                        {analytics.totalCategories}
                      </Typography>
                      <Typography variant="body2">Total Categories</Typography>
                    </Card>
                  </Grid>
                  {/* @ts-ignore */}
                  <Grid xs={12} sm={6} md={3}>
                    <Card sx={{ textAlign: "center", p: 2 }}>
                      <Typography variant="h4" color="success.main">
                        {analytics.featuredProducts}
                      </Typography>
                      <Typography variant="body2">Featured Products</Typography>
                    </Card>
                  </Grid>
                  {/* @ts-ignore */}
                  <Grid xs={12} sm={6} md={3}>
                    <Card sx={{ textAlign: "center", p: 2 }}>
                      <Typography variant="h4" color="info.main">
                        {Object.keys(analytics.productsByCategory).length}
                      </Typography>
                      <Typography variant="body2">Active Categories</Typography>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Search Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <SearchIcon sx={{ mr: 1 }} />
                Search Products
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                />
                <Button variant="outlined" onClick={handleSearch}>
                  Search
                </Button>
              </Box>

              {searchResults.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Found {searchResults.length} results:
                  </Typography>
                  <Box sx={{ maxHeight: 300, overflow: "auto" }}>
                    {searchResults.map((product) => (
                      <Card key={product.id} sx={{ mb: 1, p: 1 }}>
                        <Typography variant="body2">
                          <strong>{product.name}</strong> - ${product.price} (
                          {product.category})
                        </Typography>
                      </Card>
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Bulk Operations Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bulk Operations
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="outlined"
                  onClick={handleExportData}
                  startIcon={<DownloadIcon />}
                >
                  Export Data
                </Button>

                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                >
                  Import Data
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    style={{ display: "none" }}
                  />
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleBulkDelete("products")}
                  disabled={selectedProducts.length === 0 || bulkLoading}
                  startIcon={<DeleteIcon />}
                >
                  Delete Selected Products ({selectedProducts.length})
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleBulkDelete("categories")}
                  disabled={selectedCategories.length === 0 || bulkLoading}
                  startIcon={<DeleteIcon />}
                >
                  Delete Selected Categories ({selectedCategories.length})
                </Button>
              </Box>

              {bulkLoading && <CircularProgress sx={{ mt: 2 }} />}
            </CardContent>
          </Card>

          {/* Sample Data Generation */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sample Data
              </Typography>
              <Button
                variant="outlined"
                onClick={async () => {
                  const sampleData = bulkOperationsService.generateSampleData();
                  setBulkLoading(true);
                  try {
                    await bulkOperationsService.importData(sampleData);
                    await loadDashboardData();
                  } catch (error) {
                    setError("Failed to generate sample data");
                  }
                  setBulkLoading(false);
                }}
                disabled={bulkLoading}
              >
                Generate Sample Data
              </Button>
              <Typography variant="body2" sx={{ mt: 1 }}>
                This will add sample products and categories to your store
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* Settings Tab */}
      <TabPanel value={currentTab} index={4}>
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>
        <Alert severity="info">
          Settings panel coming soon! This will include store configuration,
          theme settings, and more.
        </Alert>
      </TabPanel>

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingItem ? `Edit ${dialogType}` : `Add New ${dialogType}`}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            {dialogType === "product" ? (
              <>
                <TextField
                  label="Product Name"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  fullWidth
                />
                <TextField
                  label="Price"
                  type="number"
                  value={formData.price || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                  fullWidth
                />
                <ImageUpload
                  currentImageUrl={formData.imageUrl}
                  onImageUploaded={(url: string) =>
                    setFormData({ ...formData, imageUrl: url })
                  }
                  onImageDeleted={() =>
                    setFormData({ ...formData, imageUrl: "" })
                  }
                  path="PRODUCTS"
                />
                <TextField
                  label="Category"
                  value={formData.category || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Featured</InputLabel>
                  <Select
                    value={formData.featured || false}
                    label="Featured"
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.value })
                    }
                  >
                    {/* @ts-ignore */}
                    <MenuItem value={false}>No</MenuItem>
                    {/* @ts-ignore */}
                    <MenuItem value={true}>Yes</MenuItem>
                  </Select>
                </FormControl>
              </>
            ) : (
              <>
                <TextField
                  label="Category Title"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  fullWidth
                />
                <ImageUpload
                  currentImageUrl={formData.imageUrl}
                  onImageUploaded={(url: string) =>
                    setFormData({ ...formData, imageUrl: url })
                  }
                  onImageDeleted={() =>
                    setFormData({ ...formData, imageUrl: "" })
                  }
                  path="CATEGORIES"
                />
                <TextField
                  label="Route"
                  value={formData.route || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, route: e.target.value })
                  }
                  required
                  fullWidth
                  helperText="URL path (e.g., 'mens', 'womens')"
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveItem} variant="contained">
            {editingItem ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FullCMSDashboard;
