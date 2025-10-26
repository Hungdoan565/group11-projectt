import React from 'react';
import './AuthLayout.css';

/**
 * AuthLayout component - Split-screen layout for authentication pages
 * Left side: Illustration/branding
 * Right side: Form container
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form content (right side)
 * @param {string} props.title - Title for left side
 * @param {string} props.subtitle - Subtitle for left side
 * @param {Array<string>} props.features - Feature list for left side
 */
const AuthLayout = ({
  children,
  title = 'Quản lý người dùng',
  subtitle = 'Hệ thống quản lý người dùng hiện đại với authentication và phân quyền',
  features = [
    'Xác thực an toàn với JWT',
    'Phân quyền dựa trên vai trò',
    'Quản lý thông tin cá nhân',
    'Upload và quản lý avatar'
  ]
}) => {
  return (
    <div className="auth-layout">
      {/* Left side - Branding & Illustration */}
      <div className="auth-layout__left">
        <div className="auth-layout__branding">
          <div className="auth-layout__logo">
            <div className="auth-layout__logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="currentColor"
                  opacity="0.3"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="auth-layout__logo-text">Group 11</span>
          </div>

          <h1 className="auth-layout__title">{title}</h1>
          <p className="auth-layout__subtitle">{subtitle}</p>

          <ul className="auth-layout__features">
            {features.map((feature, index) => (
              <li key={index} className="auth-layout__feature">
                <svg
                  className="auth-layout__feature-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative elements */}
        <div className="auth-layout__decoration">
          <div className="auth-layout__circle auth-layout__circle--1"></div>
          <div className="auth-layout__circle auth-layout__circle--2"></div>
          <div className="auth-layout__circle auth-layout__circle--3"></div>
        </div>
      </div>

      {/* Right side - Form container */}
      <div className="auth-layout__right">
        <div className="auth-layout__form-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

