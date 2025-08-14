import { useState, FormEvent, ChangeEvent } from "react";
import { sendPasswordReset } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  ForgotPasswordContainer,
  MessageText,
  BackLink,
  ButtonContainer,
} from "./forgot-password.styles";

const defaultFormFields = {
  email: "",
};

type ForgotPasswordProps = {
  onBackToSignIn: () => void;
};

const ForgotPassword = ({ onBackToSignIn }: ForgotPasswordProps) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { email } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await sendPasswordReset(email);
      setMessage("Password reset email sent! Check your inbox.");
      resetFormFields();
    } catch (error: any) {
      let errorMessage = "An error occurred. Please try again.";

      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email address.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      }

      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <ForgotPasswordContainer>
      <h2>Forgot Password?</h2>
      <span>Enter your email address to reset your password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />

        {message && <MessageText>{message}</MessageText>}

        <ButtonContainer>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Email"}
          </Button>

          <BackLink type="button" onClick={onBackToSignIn}>
            Back to Sign In
          </BackLink>
        </ButtonContainer>
      </form>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
