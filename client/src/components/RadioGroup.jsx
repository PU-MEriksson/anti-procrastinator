function RadioGroup({ label, name, options, selectedValue, onChange }) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <div className="radio-group">
          {options.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => onChange(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    );
  }

  export default RadioGroup;