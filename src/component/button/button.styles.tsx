import styled from "styled-components";

import { SpinnerContainer } from "../spinner/spinner.styles";

export const BaseButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-transform: uppercase;
  font-family: "Open Sans", sans-serif;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    background: var(--button-disabled, #adb5bd);
    color: var(--bg-primary);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;

    &:hover {
      transform: none;
      box-shadow: none;
      background: var(--button-disabled, #adb5bd);
    }
  }

  ${SpinnerContainer} {
    width: 30px;
    height: 30px;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background: linear-gradient(135deg, #4285f4 0%, #357ae8 100%);
  box-shadow: 0 4px 16px rgba(66, 133, 244, 0.3);

  &:hover {
    background: linear-gradient(135deg, #357ae8 0%, #4285f4 100%);
    box-shadow: 0 8px 25px rgba(66, 133, 244, 0.4);
  }

  &:active {
    box-shadow: 0 4px 16px rgba(66, 133, 244, 0.3);
  }
`;

export const InvertedButton = styled(BaseButton)`
  background: var(--bg-primary);
  color: var(--accent-primary);
  border: 2px solid var(--accent-primary);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: transparent;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  &:active {
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
  }
`;

export const ButtonSpinner = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
`;
