import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import DarkModeToggle from "../../component/dark-mode-toggle/dark-mode-toggle.component";
import Footer from "../../component/footer/footer.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  NavSpan,
  LogoContainer,
  MainContent,
  LayoutContainer,
} from "./navigation.styles";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  // Simple admin check - you can make this more sophisticated
  const isAdmin =
    currentUser &&
    (currentUser.email === "admin@crownclothing.com" ||
      currentUser.email.includes("admin"));

  const signOutUser = () => dispatch(signOutStart());

  return (
    <LayoutContainer>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <>
              <NavLink to="/profile">PROFILE</NavLink>
              {isAdmin && <NavLink to="/admin">ADMIN</NavLink>}
              <NavSpan onClick={signOutUser}>SIGN OUT</NavSpan>
            </>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <DarkModeToggle />
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>

      <MainContent>
        <Outlet />
      </MainContent>

      <Footer />
    </LayoutContainer>
  );
};

export default Navigation;
