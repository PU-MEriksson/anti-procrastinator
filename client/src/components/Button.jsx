import styled from '@emotion/styled';

const StyledButton = styled.button`
  background-color: #4479D4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  width: 100%;
  margin-top: 1rem;
  
  &:hover {
    background-color: #2563eb;
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

function Button({ type = "button", onClick, disabled = false, children }) {
    return (
      <StyledButton 
        type={type} 
        onClick={onClick} 
        disabled={disabled}
      >
        {children}
      </StyledButton>
    );
  }
  
  export default Button;