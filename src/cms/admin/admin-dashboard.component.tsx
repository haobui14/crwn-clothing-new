import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";

import { selectCurrentUser } from "../../store/user/user.selector";
import { cmsService } from "../cms.service";
import seedDatabase from "../seeder.service";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple admin check - for now, let any logged-in user access admin
  const isAdmin = currentUser !== null;

  useEffect(() => {
    console.log("Admin Dashboard - Current user:", currentUser);
    console.log("Admin Dashboard - Is admin:", isAdmin);

    if (!currentUser) {
      console.log("No user logged in, redirecting to auth");
      navigate("/auth");
      return;
    }

    if (isAdmin) {
      console.log("Loading admin data...");
      loadData();
    }
  }, [isAdmin, navigate, currentUser]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsData, categoriesData] = await Promise.all([
        cmsService.getProducts(),
        cmsService.getCategories(),
      ]);
      setProducts(productsData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (
      window.confirm("This will add sample data to your database. Continue?")
    ) {
      setLoading(true);
      setError(null);
      try {
        await seedDatabase();
        await loadData();
        alert("Sample data added successfully!");
      } catch (error) {
        console.error("Error seeding database:", error);
        setError("Failed to seed database. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Loading state
  if (currentUser === null) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading user authentication...
        </Typography>
      </Container>
    );
  }

  // Not logged in - should redirect to auth
  if (!currentUser) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Alert severity="warning">
          <Typography variant="h6" gutterBottom>
            Authentication Required
          </Typography>
          <Typography>Please log in to access the admin dashboard.</Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/auth")}
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        🎛️ Admin Dashboard
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        textAlign="center"
        sx={{ mb: 2 }}
      >
        Manage your Crown Clothing store content
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Welcome, {currentUser?.displayName || currentUser?.email || "Admin"}!
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
          <Button onClick={loadData} sx={{ ml: 2 }}>
            Retry
          </Button>
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Stats Cards */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <Card sx={{ flex: 1, minWidth: "200px" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="primary">
              {products.length}
            </Typography>
            <Typography color="textSecondary">Products</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: "200px" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="primary">
              {categories.length}
            </Typography>
            <Typography color="textSecondary">Categories</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: "200px" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="primary">
              {products.filter((p) => p?.featured).length}
            </Typography>
            <Typography color="textSecondary">Featured</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Button
          variant="contained"
          onClick={handleSeedDatabase}
          disabled={loading}
          sx={{ mr: 2, mb: 2 }}
        >
          🌱 Seed Sample Data
        </Button>
        <Typography variant="body2" color="textSecondary">
          Get started quickly by adding sample products and categories to your
          store.
        </Typography>
      </Box>

      {/* Products Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Products ({products.length})
        </Typography>
        {products.length === 0 ? (
          <Alert severity="info">
            No products found. Click "Seed Sample Data" to get started.
          </Alert>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 2,
              }}
            >
              {products.slice(0, 6).map((product) => (
                <Card key={product.id}>
                  <img
                    src={product.imageUrl || "/placeholder.jpg"}
                    alt={product.name || "Product"}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.jpg";
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {product.name || "Unnamed Product"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${product.price || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {product.category || "Uncategorized"}
                    </Typography>
                    {product.featured && (
                      <Typography variant="body2" color="primary">
                        ⭐ Featured
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
            {products.length > 6 && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                ... and {products.length - 6} more products
              </Typography>
            )}
          </>
        )}
      </Box>

      {/* Categories Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Categories ({categories.length})
        </Typography>
        {categories.length === 0 ? (
          <Alert severity="info">
            No categories found. Click "Seed Sample Data" to get started.
          </Alert>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 2,
            }}
          >
            {categories.map((category) => (
              <Card key={category.id}>
                <img
                  src={category.imageUrl || "/placeholder.jpg"}
                  alt={category.title || "Category"}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.jpg";
                  }}
                />
                <CardContent>
                  <Typography variant="h6">
                    {category.title || "Unnamed Category"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Route: {category.route || "No route"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* Coming Soon */}
      <Alert severity="info" sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          🚧 Coming Soon
        </Typography>
        <Typography>
          Full CRUD operations, image upload, advanced analytics, and more
          management features are in development!
        </Typography>
      </Alert>
    </Container>
  );
};

export default AdminDashboard;
