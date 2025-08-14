import styled from "styled-components";
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;

  h2 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
  }

  @media screen and (max-width: 800px) {
    min-width: 300px;
  }
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;
