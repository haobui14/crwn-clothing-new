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
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
