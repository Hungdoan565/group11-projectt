import React, { useState } from 'react';
import './Avatar.css';

/**
 * Avatar component with image, fallback initials, and status indicator
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Avatar image URL
 * @param {string} props.alt - Alt text for image
 * @param {string} props.name - User name (used for fallback initials)
 * @param {('xs'|'sm'|'md'|'lg'|'xl'|'2xl')} props.size - Avatar size
 * @param {('online'|'offline'|'away'|'busy')} props.status - Status indicator
 * @param {boolean} props.showStatus - Show status indicator
 * @param {string} props.className - Additional CSS classes
 */
const Avatar = ({
  src,
  alt,
  name = '',
  size = 'md',
  status,
  showStatus = false,
  className = '',
  ...rest
}) => {
  const [imageError, setImageError] = useState(false);

  // Generate initials from name (first letter of first two words)
  const getInitials = (name) => {
    if (!name) return '?';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  const avatarClass = [
    'avatar',
    `avatar--${size}`,
    className
  ].filter(Boolean).join(' ');

  const showImage = src && !imageError;
  const initials = getInitials(name);

  return (
    <div className={avatarClass} {...rest}>
      <div className="avatar__wrapper">
        {showImage ? (
          <img
            src={src}
            alt={alt || name}
            className="avatar__image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="avatar__fallback">
            <span className="avatar__initials">{initials}</span>
          </div>
        )}
      </div>
      
      {showStatus && status && (
        <span 
          className={`avatar__status avatar__status--${status}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

export default Avatar;

