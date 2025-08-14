import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  height: 84px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
  background: var(--bg-primary);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1.5px solid var(--border-color);
  box-shadow: 0 4px 32px 0 var(--shadow), 0 1.5px 0 0 var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
  border-radius: 0 0 24px 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media screen and (max-width: 1200px) {
    padding: 0 24px;
  }

  @media screen and (max-width: 800px) {
    height: 70px;
    padding: 0 8px;
    border-radius: 0 0 12px 12px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 72px;
  padding: 12px 10px 12px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 16px;
  background: transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.1));
  }

  @media screen and (max-width: 800px) {
    width: 48px;
    padding: 6px 4px 6px 0;
    border-radius: 8px;
  }
`;

export const NavLinks = styled.div`
  min-width: 320px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  @media screen and (max-width: 1200px) {
    min-width: 200px;
    gap: 8px;
  }

  @media screen and (max-width: 800px) {
    min-width: 0;
    font-size: 14px;
    gap: 6px;
  }
`;

export const NavLink = styled(Link)`
  padding: 12px 24px;
  cursor: pointer;
  font-weight: 600;
  color: var(--text-primary);
  border-radius: 10px;
  background: transparent;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  text-decoration: none;
  letter-spacing: 0.02em;
  box-shadow: none;

  &:hover {
    color: var(--accent-primary);
    background: rgba(102, 126, 234, 0.13);
    box-shadow: 0 2px 8px 0 var(--shadow);
    transform: translateY(-2px) scale(1.04);
  }

  @media screen and (max-width: 800px) {
    padding: 8px 10px;
    font-size: 14px;
    border-radius: 6px;
  }
`;

export const NavSpan = styled.span`
  padding: 12px 24px;
  cursor: pointer;
  font-weight: 600;
  color: var(--text-primary);
  border-radius: 10px;
  background: transparent;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  letter-spacing: 0.02em;
  box-shadow: none;

  &:hover {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.13);
    box-shadow: 0 2px 8px 0 rgba(255, 107, 107, 0.1);
    transform: translateY(-2px) scale(1.04);
  }

  @media screen and (max-width: 800px) {
    padding: 8px 10px;
    font-size: 14px;
    border-radius: 6px;
  }
`;

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  width: 100%;
`;
