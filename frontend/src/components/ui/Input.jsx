import React, { forwardRef } from 'react';
import './Input.css';

/**
 * Input component with label, icons, validation states, and helper text
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Input label text
 * @param {string} props.placeholder - Input placeholder
 * @param {('text'|'email'|'password'|'number'|'tel'|'url')} props.type - Input type
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.onBlur - Blur handler
 * @param {Function} props.onFocus - Focus handler
 * @param {boolean} props.disabled - Disable input
 * @param {boolean} props.required - Mark as required
 * @param {('default'|'error'|'success')} props.state - Validation state
 * @param {string} props.error - Error message
 * @param {string} props.helperText - Helper text below input
 * @param {React.ReactNode} props.leftIcon - Icon on the left
 * @param {React.ReactNode} props.rightIcon - Icon on the right
 * @param {string} props.className - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const Input = forwardRef(({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  state = 'default',
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  ...rest
}, ref) => {
  const inputWrapperClass = [
    'input-wrapper',
    `input-wrapper--${state}`,
    disabled && 'input-wrapper--disabled',
    leftIcon && 'input-wrapper--has-left-icon',
    rightIcon && 'input-wrapper--has-right-icon',
  ].filter(Boolean).join(' ');

  const inputClass = [
    'input',
    className
  ].filter(Boolean).join(' ');

  // Use error message if state is error and error prop is provided
  const displayHelperText = state === 'error' && error ? error : helperText;

  return (
    <div className="input-field">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-label__required" aria-label="required">*</span>}
        </label>
      )}
      
      <div className={inputWrapperClass}>
        {leftIcon && (
          <span className="input-icon input-icon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          aria-invalid={state === 'error'}
          aria-describedby={displayHelperText ? 'input-helper-text' : undefined}
          {...rest}
        />
        
        {rightIcon && (
          <span className="input-icon input-icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>
      
      {displayHelperText && (
        <p 
          id="input-helper-text" 
          className={`input-helper-text input-helper-text--${state}`}
        >
          {displayHelperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

