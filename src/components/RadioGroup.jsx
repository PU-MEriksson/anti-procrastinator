import styled from '@emotion/styled';

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const GroupLabel = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #333;
`;

const RadioGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f0f4ff;
  }
`;

const RadioInput = styled.input`
  margin-right: 0.75rem;
  cursor: pointer;
  
  &:checked + span {
    font-weight: 500;
    color: #4479D4;
  }
`;

const RadioText = styled.span`
  font-size: 1rem;
`;

function RadioGroup({ label, name, options, selectedValue, onChange }) {
    return (
      <FormGroup>
        <GroupLabel>{label}</GroupLabel>
        <RadioGroupContainer>
          {options.map((option) => (
            <RadioLabel key={option.value}>
              <RadioInput
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => onChange(option.value)}
              />
              <RadioText>{option.label}</RadioText>
            </RadioLabel>
          ))}
        </RadioGroupContainer>
      </FormGroup>
    );
  }

export default RadioGroup;