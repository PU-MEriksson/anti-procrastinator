function TextInput({ id, label, value, onChange, placeholder, required = false }) {
    return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <input
            type="text"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
          />
        </div>
    );
}

export default TextInput;