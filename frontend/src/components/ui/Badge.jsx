import React from 'react';
import './Badge.css';

/**
 * Badge component for status indicators and labels
 * 
 * @param {Object} props - Component props
 * @param {('primary'|'secondary'|'success'|'warning'|'error'|'info'|'gray')} props.variant - Badge color variant
 * @param {('sm'|'md'|'lg')} props.size - Badge size
 * @param {boolean} props.dot - Show dot indicator
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} props.className - Additional CSS classes
 */
const Badge = ({
  variant = 'primary',
  size = 'md',
  dot = false,
  children,
  className = '',
  ...rest
}) => {
  const badgeClass = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    dot && 'badge--dot',
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClass} {...rest}>
      {dot && <span className="badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
};

export default Badge;

