import React, { useState, forwardRef } from 'react';
import './PasswordInput.css';

/**
 * Calculate password strength score (0-4)
 * 0: Very weak, 1: Weak, 2: Fair, 3: Good, 4: Strong
 */
const calculatePasswordStrength = (password) => {
  if (!password) return 0;
  
  let score = 0;
  
  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  
  // Character variety checks
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++; // Mixed case
  if (/\d/.test(password)) score++; // Numbers
  if (/[^a-zA-Z0-9]/.test(password)) score++; // Special characters
  
  return Math.min(score, 4);
};

/**
 * Get strength label and color based on score
 */
const getStrengthInfo = (score) => {
  const strengthMap = {
    0: { label: '', color: '', width: '0%' },
    1: { label: 'Rất yếu', color: 'very-weak', width: '20%' },
    2: { label: 'Yếu', color: 'weak', width: '40%' },
    3: { label: 'Trung bình', color: 'fair', width: '60%' },
    4: { label: 'Mạnh', color: 'strong', width: '100%' }
  };
  return strengthMap[score] || strengthMap[0];
};

/**
 * PasswordInput component with show/hide toggle and strength meter
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.value - Password value
 * @param {Function} props.onChange - Change handler
 * @param {boolean} props.showStrength - Show password strength meter
 * @param {boolean} props.showRequirements - Show password requirements checklist
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Mark as required
 * @param {string} props.placeholder - Placeholder text
 */
const PasswordInput = forwardRef(({
  label = 'Mật khẩu',
  value = '',
  onChange,
  showStrength = false,
  showRequirements = false,
  error,
  required = false,
  placeholder = 'Nhập mật khẩu',
  ...rest
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const strength = calculatePasswordStrength(value);
  const strengthInfo = getStrengthInfo(strength);

  // Password requirements
  const requirements = [
    { label: 'Ít nhất 8 ký tự', test: (pwd) => pwd.length >= 8 },
    { label: 'Chữ hoa và chữ thường', test: (pwd) => /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) },
    { label: 'Ít nhất 1 số', test: (pwd) => /\d/.test(pwd) },
    { label: 'Ít nhất 1 ký tự đặc biệt', test: (pwd) => /[^a-zA-Z0-9]/.test(pwd) }
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input">
      {label && (
        <label className="password-input__label">
          {label}
          {required && <span className="password-input__required">*</span>}
        </label>
      )}

      <div className={`password-input__wrapper ${error ? 'password-input__wrapper--error' : ''}`}>
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className="password-input__field"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          {...rest}
        />
        
        <button
          type="button"
          className="password-input__toggle"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          tabIndex={-1}
        >
          {showPassword ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {error && (
        <p className="password-input__error">{error}</p>
      )}

      {showStrength && value && (
        <div className="password-strength">
          <div className="password-strength__bar">
            <div 
              className={`password-strength__fill password-strength__fill--${strengthInfo.color}`}
              style={{ width: strengthInfo.width }}
            />
          </div>
          {strengthInfo.label && (
            <p className={`password-strength__label password-strength__label--${strengthInfo.color}`}>
              {strengthInfo.label}
            </p>
          )}
        </div>
      )}

      {showRequirements && isFocused && value && (
        <ul className="password-requirements">
          {requirements.map((req, index) => {
            const isMet = req.test(value);
            return (
              <li 
                key={index} 
                className={`password-requirements__item ${isMet ? 'password-requirements__item--met' : ''}`}
              >
                <svg className="password-requirements__icon" viewBox="0 0 20 20" fill="currentColor">
                  {isMet ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  )}
                </svg>
                <span>{req.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;

