import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 40px 0 20px;
  margin-top: auto;
  width: 100%;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 800px) {
    gap: 15px;
  }
`;

export const FooterText = styled.p`
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
  line-height: 1.6;

  @media screen and (max-width: 800px) {
    font-size: 12px;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  @media screen and (max-width: 800px) {
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const FooterLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-primary);
  }

  @media screen and (max-width: 800px) {
    font-size: 12px;
  }
`;

export const FooterAnchor = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-primary);
  }

  @media screen and (max-width: 800px) {
    font-size: 12px;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  font-size: 18px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-primary);
    border-color: var(--accent-primary);
    transform: translateY(-2px);
  }

  @media screen and (max-width: 800px) {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
`;
