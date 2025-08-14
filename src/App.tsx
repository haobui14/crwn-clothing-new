import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Spinner from "./component/spinner/spinner.component";
import ErrorBoundary from "./component/error-boundary/error-boundary.component";
import { checkUserSession } from "./store/user/user.action";
import { GlobalStyle } from "./global.styles";
import { ThemeProvider, useTheme } from "./contexts/theme.context";
import { createMuiTheme } from "./themes/mui.theme";
import { AdminAuthProvider } from "./cms/admin/admin-auth.context";

const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Navigation = lazy(
  () => import("./routes/navigation/navigation.component")
);
const Home = lazy(() => import("./routes/home/home.component"));
const Authentication = lazy(
  () => import("./routes/authentication/authentication.component")
);
const Profile = lazy(() => import("./routes/profile/profile.component"));
const AdminDashboard = lazy(() => import("./cms/admin/simple-admin.component"));
const FullCMSDashboard = lazy(
  () => import("./cms/admin/full-cms-dashboard.component")
);
const AdminUserManagement = lazy(
  () => import("./cms/admin/admin-user-management.component")
);

const AppContent = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const muiTheme = createMuiTheme(isDarkMode);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Suspense fallback={<Spinner />}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="shop/*" element={<Shop />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="profile" element={<Profile />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin-full" element={<FullCMSDashboard />} />
            <Route path="admin-users" element={<AdminUserManagement />} />
          </Route>
        </Routes>
      </Suspense>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AdminAuthProvider>
          <AppContent />
        </AdminAuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
