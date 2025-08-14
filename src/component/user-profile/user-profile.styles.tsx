import styled from "styled-components";

export const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);

  @media screen and (max-width: 768px) {
    margin: 1rem;
    padding: 1rem;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
`;

export const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--accent-primary) 0%,
    var(--accent-secondary) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-right: 1.5rem;
  box-shadow: 0 4px 12px 0 rgba(102, 126, 234, 0.2);
`;

export const ProfileInfo = styled.div`
  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 1rem;
  }
`;

export const ProfileSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);

  h3 {
    margin: 0 0 1.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    background: linear-gradient(
      90deg,
      var(--accent-primary) 0%,
      var(--accent-secondary) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    button {
      align-self: flex-start;
      margin-top: 0.5rem;
    }
  }
`;

export const MessageText = styled.div`
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-size: 0.9rem;
  text-align: center;
  background: rgba(102, 126, 234, 0.1);
  color: var(--accent-primary);
  border: 1px solid rgba(102, 126, 234, 0.2);
`;
