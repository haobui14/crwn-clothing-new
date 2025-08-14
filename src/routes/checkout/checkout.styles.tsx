import styled from "styled-components";

export const CheckoutContainer = styled.div`
  width: 62%;
  max-width: 1100px;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 64px auto 32px;
  background: linear-gradient(135deg, #a8c0ff 0%, #f8fafc 100%);
  padding: 48px 40px 40px 40px;
  border-radius: 28px;
  box-shadow: 0 8px 40px 0 rgba(102, 126, 234, 0.13),
    0 1.5px 0 0 rgba(102, 126, 234, 0.04);
  position: relative;
  backdrop-filter: blur(16px) saturate(180%);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 28px 28px 0 0;
    opacity: 0.9;
  }

  @media screen and (max-width: 1100px) {
    width: 90%;
    padding: 32px 10px 24px 10px;
  }

  @media screen and (max-width: 800px) {
    width: 99%;
    font-size: 14px;
    padding: 16px 2px 12px 2px;
    margin: 24px auto 0;
    border-radius: 14px;
  }
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 24px 0 18px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #e9ecef;
  margin-bottom: 20px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.05) 0%,
    rgba(118, 75, 162, 0.05) 100%
  );
  border-radius: 12px;
  padding: 20px;
`;

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;
  font-weight: 700;
  color: #3a4256;
  font-size: 17px;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;

  &:last-child {
    width: 8%;
    justify-content: flex-end;
  }

  @media screen and (max-width: 800px) {
    font-size: 13px;
  }
`;

export const Total = styled.span`
  margin-top: 40px;
  margin-left: auto;
  font-size: 44px;
  font-weight: 800;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.01em;
  filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.08));

  @media screen and (max-width: 800px) {
    font-size: 28px;
    margin-top: 24px;
  }
`;
