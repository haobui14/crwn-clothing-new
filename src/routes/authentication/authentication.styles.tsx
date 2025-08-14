import styled from "styled-components";

export const AuthPageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
  z-index: 0;
`;

export const AuthenticationContainer = styled.div<{ $isSingleForm?: boolean }>`
  display: flex;
  width: ${({ $isSingleForm }) => ($isSingleForm ? "600px" : "1000px")};
  max-width: 95vw;
  justify-content: ${({ $isSingleForm }) =>
    $isSingleForm ? "center" : "space-between"};
  align-items: flex-start;
  margin: 60px auto;
  gap: 60px;
  background: var(--bg-primary);
  padding: 60px;
  border-radius: 28px;
  box-shadow: 0 8px 32px 0 var(--shadow), 0 1.5px 8px 0 var(--shadow),
    0 1.5px 24px 0 var(--shadow);
  position: relative;
  backdrop-filter: blur(28px) saturate(1.2);
  border: 1.5px solid var(--border-color);
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      135deg,
      var(--accent-primary) 0%,
      var(--accent-secondary) 100%
    );
    border-radius: 28px 28px 0 0;
    z-index: 2;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 28px;
    pointer-events: none;
    border: 1.5px solid rgba(255, 255, 255, 0.18);
    z-index: 2;
    box-shadow: 0 1.5px 24px 0 rgba(102, 126, 234, 0.06) inset;
  }

  & > *:first-child {
    margin-right: 30px;
  }
  & > *:last-child {
    margin-left: 30px;
  }

  & .form-section {
    z-index: 3;
  }

  /* vertical divider */
  & .form-section + .form-section {
    position: relative;
  }

  & .form-section + .form-section::before {
    content: "";
    position: absolute;
    left: -30px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      180deg,
      var(--accent-primary) 0%,
      var(--accent-secondary) 100%
    );
    opacity: 0.1;
    border-radius: 2px;
    z-index: 2;
    @media (max-width: 800px) {
      display: none;
    }
  }

  @media screen and (max-width: 1050px) {
    width: 90vw;
    padding: 40px;
    gap: 40px;
    border-radius: 20px;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    width: 95vw;
    padding: 30px;
    gap: 40px;
    margin: 40px auto;
    border-radius: 16px;
    & > * {
      margin: 0 !important;
    }
    & .form-section + .form-section::before {
      display: none;
    }
  }

  @media screen and (max-width: 480px) {
    padding: 12px;
    margin: 12px auto;
    border-radius: 10px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
