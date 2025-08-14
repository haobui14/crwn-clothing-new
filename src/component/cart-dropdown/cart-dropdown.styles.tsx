import styled from "styled-components";

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "../button/button.styles";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 280px;
  height: 380px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  background: var(--bg-primary);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
  top: 90px;
  right: 20px;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    right: 30px;
    width: 16px;
    height: 16px;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }

  ${BaseButton}, ${GoogleSignInButton}, ${InvertedButton} {
    margin-top: auto;
    min-width: auto;
    width: 100%;
  }

  @media screen and (max-width: 800px) {
    width: 260px;
    right: 10px;
    padding: 20px;
  }
`;

export const CartItems = styled.div`
  height: 260px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 10px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--bg-secondary);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(
      135deg,
      var(--accent-primary) 0%,
      var(--accent-secondary) 100%
    );
    border-radius: 3px;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 16px;
  margin: 50px auto;
  color: var(--text-secondary);
  text-align: center;
  font-weight: 500;
`;
