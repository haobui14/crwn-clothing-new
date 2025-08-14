import styled from "styled-components";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  max-width: 100%;
  z-index: 2;

  h2 {
    margin: 0 0 30px 0;
    font-family: "Poppins", sans-serif;
    font-size: 28px;
    font-weight: 700;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    position: relative;
    letter-spacing: 0.5px;
    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;

  @media screen and (min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  color: var(--accent-primary);
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
  align-self: flex-end;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-secondary);
  }
`;
