import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
  margin: 30px auto;

  @media screen and (max-width: 1050px) {
    width: 850px;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    width: unset;
    row-gap: 50px;
  }
`;
