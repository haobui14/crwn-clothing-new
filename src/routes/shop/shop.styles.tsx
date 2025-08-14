import styled from "styled-components";

export const ShopPageContainer = styled.div`
  width: 100%;
  padding: 32px 46px 0 46px;
  box-sizing: border-box;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;

  @media screen and (max-width: 1200px) {
    max-width: 1000px;
    padding: 24px 16px 0 16px;
  }

  @media screen and (max-width: 800px) {
    max-width: 100vw;
    padding: 16px 8px 0 8px;
  }
`;
