import { useSelector } from "react-redux";

import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";

import CheckoutItem from "../../component/checkout-item/checkout-item.component";
import PaymentForm from "../../component/payment-form/payment-form.component";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mb: 4,
        minHeight: "100vh",
        bgcolor: "#f8f9fa", // Light gray background for better contrast
        px: { xs: 1, sm: 2 },
        backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Subtle gradient
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: { xs: "100%", sm: "95%", md: "85%", lg: "75%" },
          maxWidth: 1200,
          minHeight: "80vh",
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: { xs: 3, sm: 6 },
          bgcolor: "#ffffff", // Pure white for the main container
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.12), 0 8px 25px rgba(0,0,0,0.08)",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Header gradient */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            bgcolor: "transparent",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "16px 16px 0 0",
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              opacity: 0.9,
            }}
          />
        </Box>

        {/* Page Title */}
        <Box sx={{ textAlign: "center", mb: 3, mt: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#2c3e50", // Dark blue-gray for better contrast
              mb: 1,
              fontSize: { xs: "1.8rem", md: "2.2rem" },
            }}
          >
            Checkout
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#6c757d", // Medium gray
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: 400,
            }}
          >
            Review your order and complete your purchase
          </Typography>
        </Box>

        {/* Column Headers */}
        <Box
          sx={{
            width: "100%",
            display: { xs: "none", md: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1.5px solid var(--border-color)",
            mb: 2.5,
            px: { xs: 1, sm: 3 },
            py: { xs: 1.5, sm: 2 },
            borderRadius: "12px",
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)", // Light gradient
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            border: "1px solid #e9ecef",
          }}
        >
          {["Product", "Description", "Quantity", "Price", "Remove"].map(
            (label, idx) => (
              <Typography
                key={label}
                sx={{
                  textTransform: "capitalize",
                  width: idx === 4 ? "8%" : "23%",
                  fontWeight: 600,
                  color: "#495057", // Dark gray for better readability
                  fontSize: { xs: 13, sm: 16 },
                  letterSpacing: "0.01em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: idx === 4 ? "flex-end" : "flex-start",
                }}
              >
                {label}
              </Typography>
            )
          )}
        </Box>

        <Divider sx={{ mb: 2, borderColor: "#dee2e6" }} />

        {/* Cart Items or Empty State */}
        {cartItems.length === 0 ? (
          <Box
            sx={{
              width: "100%",
              py: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#6c757d", // Medium gray
                fontWeight: 500,
                mb: 2,
              }}
            >
              Your cart is empty
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#adb5bd", // Lighter gray
                mb: 4,
                textAlign: "center",
              }}
            >
              Looks like you haven't added any items to your cart yet.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/shop")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "16px",
                backgroundColor: "#667eea",
                "&:hover": {
                  backgroundColor: "#5a6fd8",
                },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            {/* Cart Items List */}
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {cartItems.map((cartItem) => (
                <Box
                  key={cartItem.id}
                  component="li"
                  sx={{
                    mb: 2.5,
                    borderRadius: 3,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    background: "#ffffff", // Pure white background
                    overflow: "hidden",
                    border: "1px solid #e9ecef",
                    transition: "box-shadow 0.18s, transform 0.18s",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                      transform: "translateY(-1px)",
                      border: "1px solid #dee2e6",
                    },
                  }}
                >
                  <CheckoutItem cartItem={cartItem} />
                </Box>
              ))}
            </Box>

            {/* Order Summary and Payment */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                alignItems: { xs: "stretch", lg: "flex-start" },
                justifyContent: "space-between",
                gap: 4,
                mt: { xs: 3, sm: 6 },
                mb: 1,
              }}
            >
              {/* Order Summary */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  minWidth: { xs: "100%", lg: 320 },
                  bgcolor: "var(--bg-primary)",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  mb: { xs: 2, lg: 0 },
                  border: "1px solid #e9ecef",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#2c3e50", // Dark blue-gray
                    mb: 2,
                  }}
                >
                  Order Summary
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="#6c757d">
                      Items (
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                      )
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#495057"
                      fontWeight={600}
                    >
                      ${cartTotal}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="#6c757d">
                      Shipping
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.success"
                      fontWeight={600}
                    >
                      FREE
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="body2" color="#6c757d">
                      Tax
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#495057"
                      fontWeight={600}
                    >
                      ${(cartTotal * 0.08).toFixed(2)}
                    </Typography>
                  </Box>
                  <Divider sx={{ borderColor: "#dee2e6", my: 2 }} />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2c3e50",
                    }}
                  >
                    Total:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 20, sm: 24 },
                      fontWeight: 800,
                      fontFamily: "Poppins, sans-serif",
                      color: "#667eea", // Purple theme color
                      letterSpacing: "0.01em",
                    }}
                  >
                    ${(cartTotal + cartTotal * 0.08).toFixed(2)}
                  </Typography>
                </Box>
              </Paper>

              {/* Payment Form */}
              <Box sx={{ flex: 1, minWidth: { xs: "100%", lg: 400 } }}>
                <PaymentForm />
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Checkout;
