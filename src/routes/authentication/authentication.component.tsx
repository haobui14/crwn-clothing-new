import { useState } from "react";
import SignUpForm from "../../component/sign-up-form/sign-up-form.component";
import SignInForm from "../../component/sign-in-form/sign-in-form.component";
import ForgotPassword from "../../component/forgot-password/forgot-password.component";
import {
  AuthPageWrapper,
  AuthenticationContainer,
} from "./authentication.styles";

const Authentication = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToSignIn = () => {
    setShowForgotPassword(false);
  };

  return (
    <AuthPageWrapper>
      <AuthenticationContainer $isSingleForm={showForgotPassword}>
        {showForgotPassword ? (
          <ForgotPassword onBackToSignIn={handleBackToSignIn} />
        ) : (
          <>
            <SignInForm
              className="form-section"
              onShowForgotPassword={handleShowForgotPassword}
            />
            <SignUpForm className="form-section" />
          </>
        )}
      </AuthenticationContainer>
    </AuthPageWrapper>
  );
};

export default Authentication;
