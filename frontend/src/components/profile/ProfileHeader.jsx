import React, { useState } from 'react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import './ProfileHeader.css';

/**
 * ProfileHeader component - Profile header with cover photo and avatar
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - User object
 * @param {Function} props.onAvatarClick - Callback when avatar is clicked
 * @param {Function} props.onCoverClick - Callback when cover is clicked
 */
const ProfileHeader = ({
  user,
  onAvatarClick,
  onCoverClick
}) => {
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [isCoverHovered, setIsCoverHovered] = useState(false);

  const stats = [
    { label: 'Ngày tham gia', value: new Date(user?.createdAt).toLocaleDateString('vi-VN') },
    { label: 'Vai trò', value: user?.role === 'admin' ? 'Quản trị viên' : 'Người dùng' },
    { label: 'Trạng thái', value: 'Đang hoạt động' }
  ];

  return (
    <div className="profile-header">
      {/* Cover photo */}
      <div
        className="profile-header__cover"
        onMouseEnter={() => setIsCoverHovered(true)}
        onMouseLeave={() => setIsCoverHovered(false)}
        onClick={onCoverClick}
        role="button"
        tabIndex={0}
        aria-label="Thay đổi ảnh bìa"
      >
        {user?.coverPhoto && (
          <img 
            src={user.coverPhoto} 
            alt="Cover" 
            className="profile-header__cover-image"
          />
        )}
        <div className="profile-header__cover-gradient" />
        {isCoverHovered && (
          <div className="profile-header__cover-overlay">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <span>Thay đổi ảnh bìa</span>
          </div>
        )}
      </div>

      {/* Profile info */}
      <div className="profile-header__info">
        <div className="profile-header__avatar-wrapper">
          <div
            className="profile-header__avatar-container"
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
            onClick={onAvatarClick}
            role="button"
            tabIndex={0}
            aria-label="Thay đổi avatar"
          >
            <Avatar
              src={user?.avatar}
              name={user?.name}
              size="2xl"
              status="online"
              showStatus={true}
            />
            {isAvatarHovered && (
              <div className="profile-header__avatar-overlay">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="profile-header__details">
          <div className="profile-header__name-section">
            <h1 className="profile-header__name">{user?.name}</h1>
            {user?.role === 'admin' && (
              <Badge variant="primary" size="sm">
                Admin
              </Badge>
            )}
          </div>
          <p className="profile-header__email">{user?.email}</p>
        </div>

        <div className="profile-header__stats">
          {stats.map((stat, index) => (
            <div key={index} className="profile-header__stat">
              <span className="profile-header__stat-label">{stat.label}</span>
              <span className="profile-header__stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

