import styled from '@emotion/styled';

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #4479D4;
  }
`;

function TextInput({ id, label, value, onChange, placeholder, required = false }) {
    return (
        <FormGroup>
          <Label htmlFor={id}>{label}</Label>
          <Input
            type="text"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
          />
        </FormGroup>
    );
}

export default TextInput;