import React from 'react';
import './AuthCard.css';

/**
 * AuthCard component - Card wrapper for authentication forms
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Card subtitle
 * @param {React.ReactNode} props.children - Form content
 * @param {React.ReactNode} props.footer - Footer content (links, etc.)
 */
const AuthCard = ({
  title,
  subtitle,
  children,
  footer
}) => {
  return (
    <div className="auth-card">
      {(title || subtitle) && (
        <div className="auth-card__header">
          {title && <h2 className="auth-card__title">{title}</h2>}
          {subtitle && <p className="auth-card__subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="auth-card__body">
        {children}
      </div>

      {footer && (
        <div className="auth-card__footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default AuthCard;

