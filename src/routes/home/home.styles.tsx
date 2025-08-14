import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  color: var(--text-primary);
`;

export const HeroSection = styled.section`
  width: 100%;
  padding: 80px 20px 100px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.05) 0%,
    rgba(118, 75, 162, 0.05) 100%
  );
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(10px);

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(102, 126, 234, 0.03) 0%,
      transparent 70%
    );
    animation: float 20s ease-in-out infinite;
    z-index: 1;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(30px, -30px) rotate(120deg);
    }
    66% {
      transform: translate(-20px, 20px) rotate(240deg);
    }
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    135deg,
    var(--accent-primary) 0%,
    var(--accent-secondary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  letter-spacing: -0.02em;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 3rem;
  opacity: 0.8;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  color: var(--text-secondary);

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

export const HeroCTA = styled.button`
  background: linear-gradient(
    135deg,
    var(--accent-primary) 0%,
    var(--accent-secondary) 100%
  );
  border: none;
  color: white;
  padding: 18px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    padding: 16px 32px;
    font-size: 1rem;
  }
`;

export const ContentSection = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  flex: 1;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 4rem;
  color: var(--text-primary);
  position: relative;
  letter-spacing: -0.01em;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(
      135deg,
      var(--accent-primary) 0%,
      var(--accent-secondary) 100%
    );
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  padding: 60px 20px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.03) 0%,
    rgba(118, 75, 162, 0.03) 100%
  );
  text-align: center;
  margin-top: 80px;
  border-top: 1px solid var(--border-color);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--accent-primary),
      transparent
    );
  }
`;

export const FooterText = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
  opacity: 0.8;
`;
