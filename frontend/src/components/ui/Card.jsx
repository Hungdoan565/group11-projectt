import React from 'react';
import './Card.css';

/**
 * Card component with flexible header, body, and footer sections
 * 
 * @param {Object} props - Component props
 * @param {('default'|'bordered'|'elevated')} props.variant - Card style variant
 * @param {React.ReactNode} props.header - Card header content
 * @param {React.ReactNode} props.children - Card body content
 * @param {React.ReactNode} props.footer - Card footer content
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler (makes card clickable)
 */
const Card = ({
  variant = 'default',
  header,
  children,
  footer,
  className = '',
  onClick,
  ...rest
}) => {
  const cardClass = [
    'card',
    `card--${variant}`,
    onClick && 'card--clickable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClass} 
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      {header && (
        <div className="card__header">
          {header}
        </div>
      )}
      
      <div className="card__body">
        {children}
      </div>
      
      {footer && (
        <div className="card__footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;

