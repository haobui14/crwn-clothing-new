import styled, { css } from "styled-components";
import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";

export const CartIconContainer = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 12px;
  background: transparent;
  /* border: 1.5px solid rgba(102, 126, 234, 0.13); */
  /* box-shadow: 0 2px 8px 0 rgba(102, 126, 234, 0.08); */
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.1) 0%,
      rgba(118, 75, 162, 0.08) 100%
    );
    border: 1.5px solid rgba(102, 126, 234, 0.22);
    box-shadow: 0 4px 16px 0 rgba(102, 126, 234, 0.13);
    transform: scale(1.07);
  }
`;

export const ShoppingIcon = styled(ShoppingSvg)`
  width: 26px;
  height: 26px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
  margin: 0 auto;

  /* Override SVG colors for theme support */
  fill: var(--text-primary) !important;
  color: var(--text-primary);

  /* Dark mode filter support */
  body.dark-mode & {
    filter: brightness(0) invert(1);
  }

  * {
    fill: var(--text-primary) !important;
  }

  path {
    fill: var(--text-primary) !important;
  }

  ${CartIconContainer}:hover & {
    filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.18));

    body.dark-mode & {
      filter: brightness(0) invert(1)
        drop-shadow(0 2px 8px rgba(102, 126, 234, 0.18));
    }
  }
`;

export const ItemCount = styled.span<{ children?: React.ReactNode }>`
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 10px;
  font-weight: 500;
  background: rgba(246, 114, 128, 0.85);
  color: #fff;
  border-radius: 50%;
  min-width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--bg-primary);
  padding: 0 3px;
  z-index: 2;
  letter-spacing: 0.01em;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  ${({ children }) =>
    typeof children === "string" && children === "0"
      ? css`
          opacity: 0;
        `
      : css`
          opacity: 1;
        `}
`;
