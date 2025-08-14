import styled from "styled-components";

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
  }

  img {
    width: 30%;
    border-radius: 4px;
    object-fit: cover;
  }
`;

export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;
  color: var(--text-primary);

  span {
    font-size: 16px;
    color: var(--text-primary);
    line-height: 1.4;

    &:first-child {
      font-weight: 600;
      margin-bottom: 4px;
    }
  }
`;

export const RemoveCartItem = styled.div`
  cursor: pointer;
  margin: auto;
  color: var(--text-primary);
  font-size: 18px;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
  }
`;
