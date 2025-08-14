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

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: { xs: 2, md: 6 },
        mb: 4,
        minHeight: "100vh",
        bgcolor: "var(--bg-primary)",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: { xs: "99%", sm: "90%", md: "62%" },
          maxWidth: 1100,
          minHeight: "90vh",
          p: { xs: 2, sm: 4 },
          borderRadius: { xs: 2, sm: 4 },
          bgcolor: "background.paper",
          boxShadow:
            "0 8px 40px 0 rgba(102,126,234,0.13), 0 1.5px 0 0 rgba(102,126,234,0.04)",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1.5px solid var(--border-color)",
            mb: 2.5,
            mt: 2,
            px: { xs: 1, sm: 3 },
            py: { xs: 1.5, sm: 2 },
            borderRadius: "14px 14px 0 0",
            background: "var(--bg-secondary)",
            boxShadow: "0 1px 4px 0 rgba(102,126,234,0.03)",
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
                  color: "var(--text-primary)",
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
        <Divider sx={{ mb: 2, borderColor: "var(--border-color)" }} />
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
              sx={{ color: "var(--text-secondary)", fontWeight: 500, mb: 2 }}
            >
              Your cart is empty
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "var(--text-secondary)", mb: 4 }}
            >
              Add some items to see them here!
            </Typography>
          </Box>
        ) : (
          <>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {cartItems.map((cartItem, idx) => (
                <Box
                  key={cartItem.id}
                  component="li"
                  sx={{
                    mb: 2.5,
                    borderRadius: 3.5,
                    boxShadow: "0 2px 12px 0 rgba(102,126,234,0.06)",
                    background: "var(--bg-secondary)",
                    overflow: "hidden",
                    border: "1px solid var(--border-color)",
                    transition: "box-shadow 0.18s",
                    "&:hover": {
                      boxShadow: "0 4px 18px 0 rgba(102,126,234,0.13)",
                    },
                  }}
                >
                  <CheckoutItem cartItem={cartItem} />
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "flex-start" },
                justifyContent: "flex-end",
                gap: 4,
                mt: { xs: 3, sm: 6 },
                mb: 1,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  minWidth: 240,
                  bgcolor: "var(--bg-primary)",
                  borderRadius: 3,
                  boxShadow: "0 1px 8px 0 rgba(102,126,234,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  mb: { xs: 2, sm: 0 },
                  border: "1px solid var(--border-color)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 20, sm: 28 },
                    fontWeight: 700,
                    fontFamily: "Poppins, sans-serif",
                    color: "var(--text-primary)",
                    letterSpacing: "0.01em",
                  }}
                >
                  Total:{" "}
                  <span
                    style={{
                      fontWeight: 800,
                      color: "var(--accent-secondary)",
                    }}
                  >
                    ${cartTotal}
                  </span>
                </Typography>
              </Paper>
              <Box sx={{ flex: 1, minWidth: 240 }}>
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
