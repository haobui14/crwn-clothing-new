import styled from "styled-components";

type BackgroundImageProps = {
  imageUrl: string;
};

export const Body = styled.div`
  height: 120px;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  opacity: 0.95;
  position: absolute;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  z-index: 2;
  border: 1px solid var(--border-color);

  h2 {
    font-weight: 700;
    margin: 0 6px 10px;
    font-size: 28px;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-weight: 500;
    font-size: 15px;
    color: var(--text-secondary);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  @media screen and (max-width: 800px) {
    padding: 0 20px;
    height: 100px;

    h2 {
      font-size: 22px;
      letter-spacing: 1px;
    }

    p {
      font-size: 13px;
    }
  }
`;

export const BackgroundImage = styled.div<BackgroundImageProps>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  transition: transform 0.4s ease;
`;

export const DirectoryItemContainer = styled.div`
  width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(102, 126, 234, 0.25);

    & ${BackgroundImage} {
      transform: scale(1.08);
    }

    & ${Body} {
      opacity: 1;
      transform: scale(1.05);
      box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(102, 126, 234, 0.1),
      rgba(118, 75, 162, 0.1)
    );
    z-index: 1;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
  }

  @media screen and (max-width: 800px) {
    height: 220px;
  }

  @media screen and (max-width: 480px) {
    height: 200px;
  }
`;
