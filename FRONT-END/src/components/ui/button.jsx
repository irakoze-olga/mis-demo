import React from 'react';
import '../../styles/components.css';

const Button = ({ children, variant = 'primary', size = 'medium', icon, isLoading, className, ...props }) => {
  const buttonClass = `btn btn-${variant} btn-${size} ${isLoading ? 'loading' : ''} ${className || ''}`;
  
  return (
    <button className={buttonClass} disabled={isLoading} {...props}>
      {isLoading ? (
        <span className="btn-loader"></span>
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;