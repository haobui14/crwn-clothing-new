import styled from "styled-components";
import { Link } from "react-router-dom";

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 20px;
  background: var(--bg-primary);
  border-radius: 12px;
  transition: all 0.3s ease;

  @media screen and (max-width: 800px) {
    align-items: center;
    padding: 15px;
  }
`;

export const Title = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    color: var(--accent-primary);
    transform: translateX(5px);
  }

  @media screen and (max-width: 800px) {
    font-size: 24px;
    text-align: center;
  }
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 20px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 25px;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 25px;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-row-gap: 25px;
  }
`;
