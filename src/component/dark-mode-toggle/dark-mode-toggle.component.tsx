import styled from "styled-components";
import { useTheme } from "../../contexts/theme.context";

interface ToggleProps {
  $isDark: boolean;
}

const ToggleContainer = styled.div<ToggleProps>`
  position: relative;
  width: 60px;
  height: 30px;
  background: ${({ $isDark }) =>
    $isDark ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#e9ecef"};
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }
`;

const ToggleSlider = styled.div<ToggleProps>`
  position: absolute;
  top: 3px;
  left: ${({ $isDark }) => ($isDark ? "33px" : "3px")};
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

  &::after {
    content: "${({ $isDark }) => ($isDark ? "🌙" : "☀️")}";
  }
`;

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <ToggleContainer $isDark={isDarkMode} onClick={toggleDarkMode}>
      <ToggleSlider $isDark={isDarkMode} />
    </ToggleContainer>
  );
};

export default DarkModeToggle;
