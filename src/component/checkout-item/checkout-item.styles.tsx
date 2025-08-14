import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid #e9ecef;
  padding: 15px 0;
  font-size: 16px;
  align-items: center;
  color: #495057;
  background: transparent;
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const BaseSpan = styled.span`
  width: 23%;
  color: #495057;
`;

export const Quantity = styled(BaseSpan)`
  display: flex;
`;

export const Arrow = styled.div`
  cursor: pointer;
  color: #6c757d;
  user-select: none;
  transition: color 0.3s ease;

  &:hover {
    color: #667eea;
  }
`;

export const Value = styled.span`
  margin: 0 10px;
  color: #495057;
`;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
  color: #6c757d;
  user-select: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }
`;
