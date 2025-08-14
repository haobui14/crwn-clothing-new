import styled from "styled-components";
import { Card, Button } from "@mui/material";

export const AdminContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 20px 0;
`;

export const AdminHeader = styled.div`
  background: var(--bg-secondary);
  padding: 40px 20px;
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--border-color);

  h1 {
    color: var(--text-primary);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .subtitle {
    color: var(--text-secondary);
  }
`;

export const StatsCard = styled(Card)`
  && {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
    }

    .MuiCardContent-root {
      text-align: center;
      padding: 20px;

      h4 {
        color: var(--accent-primary);
        font-weight: bold;
        margin-bottom: 8px;
      }

      .MuiTypography-colorTextSecondary {
        color: var(--text-secondary);
      }
    }
  }
`;

export const ActionButton = styled(Button)`
  && {
    text-transform: none;
    border-radius: 8px;
    font-weight: 500;

    &.MuiButton-containedPrimary {
      background: var(--accent-primary);

      &:hover {
        background: var(--accent-secondary);
      }
    }

    &.MuiButton-outlined {
      border-color: var(--border-color);
      color: var(--text-primary);

      &:hover {
        background: var(--bg-secondary);
        border-color: var(--accent-primary);
      }
    }

    &.MuiButton-colorError {
      background: #ff4444;

      &:hover {
        background: #cc3333;
      }
    }
  }
`;
