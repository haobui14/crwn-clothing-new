import styled from "styled-components";

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 380px;
  align-items: center;
  position: relative;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px var(--shadow);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 36px rgba(102, 126, 234, 0.25);

    img {
      transform: scale(1.03);
    }

    button {
      opacity: 1;
      transform: translateY(0);
    }
  }

  img {
    width: 100%;
    height: 75%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  button {
    width: 85%;
    opacity: 0;
    position: absolute;
    top: 60%;
    transform: translateY(10px);
    transition: all 0.3s ease;
    min-width: auto;
    height: 45px;
    font-size: 14px;
  }

  @media screen and (max-width: 1050px) {
    width: 30vw;
    height: 350px;

    button {
      font-size: 12px;
      height: 40px;
    }
  }

  @media screen and (max-width: 800px) {
    width: 40vw;

    button {
      display: flex;
      opacity: 1;
      transform: translateY(0);
      position: relative;
      top: auto;
      width: 90%;
      margin: 10px auto 0;
      min-width: unset;
      padding: 0 10px;
    }

    &:hover {
      img {
        transform: scale(1.02);
      }

      button {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  @media screen and (max-width: 400px) {
    width: 80vw;
  }
`;

export const Footer = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  gap: 8px;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  transition: background-color 0.3s ease;

  @media screen and (max-width: 800px) {
    height: auto;
    padding: 12px 15px;
    flex-grow: 1;
  }
`;

export const Name = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (max-width: 800px) {
    font-size: 14px;
  }
`;

export const Price = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--accent-primary);
  font-family: "Poppins", sans-serif;

  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;
