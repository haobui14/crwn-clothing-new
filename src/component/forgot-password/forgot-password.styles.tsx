import styled from "styled-components";

export const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  max-width: 100%;
  padding: 0;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  border: none;
  transition: all 0.3s ease;

  h2 {
    margin: 0 0 10px 0;
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

  span {
    font-size: 16px;
    margin-bottom: 30px;
    color: var(--text-secondary);
    line-height: 1.5;
    text-align: center;
    font-family: "Open Sans", sans-serif;
    padding-top: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const MessageText = styled.div`
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-size: 0.9rem;
  text-align: center;
  background: rgba(102, 126, 234, 0.1);
  color: var(--accent-primary);
  border: 1px solid rgba(102, 126, 234, 0.2);
`;

export const BackLink = styled.button`
  background: none;
  border: none;
  color: var(--accent-primary);
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  text-decoration: underline;
  transition: color 0.3s ease;
  text-align: center;
  font-family: "Open Sans", sans-serif;

  &:hover {
    color: var(--accent-secondary);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;
