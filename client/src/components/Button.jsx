function Button({ type = "button", onClick, disabled = false, children }) {
    return (
      <button 
        type={type} 
        onClick={onClick} 
        disabled={disabled}
        className="submit-button"
      >
        {children}
      </button>
    );
  }
  
  export default Button;