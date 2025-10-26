import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Plus, Zap, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Avatar from './ui/Avatar';
import './Navbar.css';

/**
 * Navigation bar component with conditional rendering based on auth state
 * - Unauthenticated: Shows Login/Signup buttons
 * - Authenticated: Shows user count, add button, and user menu dropdown
 */
const Navbar = ({ userCount, onAddClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

  const handleLogoClick = () => {
    if (user) {
      // Nếu đã đăng nhập, về trang tương ứng với role
      navigate(user.role === 'admin' ? '/admin/users' : '/profile');
    } else {
      // Nếu chưa đăng nhập, về trang chủ
      navigate('/');
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={handleLogoClick} style={{ cursor: 'pointer' }} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && handleLogoClick()}>
          <div className="navbar-logo" aria-hidden="true">
            <Zap size={28} />
          </div>
          <div className="navbar-title-group">
            <h1 className="navbar-title">User Manager</h1>
            <p className="navbar-subtitle">Hệ thống quản lý người dùng</p>
          </div>
        </div>

        <div className="navbar-actions">
          {user ? (
            // Authenticated: Show user count, add button, and user menu
            <>
              <div className="user-count-badge" aria-live="polite" aria-label={`Tổng số người dùng: ${userCount}`}>
                <Users size={16} className="user-count-icon" aria-hidden="true" />
                <span className="user-count-text">
                  <strong>{userCount}</strong> người dùng
                </span>
              </div>

              <button
                className="btn-primary"
                onClick={onAddClick}
                aria-label="Thêm người dùng mới"
              >
                <Plus size={18} aria-hidden="true" />
                <span className="btn-text">Thêm người dùng</span>
              </button>

              {/* User Menu Dropdown */}
              <div className="user-menu" ref={dropdownRef}>
                <button
                  className="user-menu-trigger"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  <Avatar
                    src={user.avatar}
                    name={user.name}
                    size="sm"
                    showStatus={false}
                  />
                  <span className="user-menu-name">{user.name}</span>
                  <ChevronDown
                    size={16}
                    className={`user-menu-chevron ${isDropdownOpen ? 'open' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="user-menu-dropdown" role="menu">
                    <div className="user-menu-header">
                      <div className="user-menu-info">
                        <p className="user-menu-info-name">{user.name}</p>
                        <p className="user-menu-info-email">{user.email}</p>
                        {user.role === 'admin' && (
                          <span className="user-menu-badge">Admin</span>
                        )}
                      </div>
                    </div>

                    <div className="user-menu-divider" />

                    <button
                      className="user-menu-item"
                      onClick={handleProfileClick}
                      role="menuitem"
                    >
                      <User size={16} aria-hidden="true" />
                      <span>Trang cá nhân</span>
                    </button>

                    <button
                      className="user-menu-item"
                      onClick={handleProfileClick}
                      role="menuitem"
                    >
                      <Settings size={16} aria-hidden="true" />
                      <span>Cài đặt</span>
                    </button>

                    <div className="user-menu-divider" />

                    <button
                      className="user-menu-item user-menu-item--danger"
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      <LogOut size={16} aria-hidden="true" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Unauthenticated: Show Login/Signup buttons
            <>
              <Link to="/login" className="btn-secondary">
                Đăng nhập
              </Link>
              <Link to="/signup" className="btn-primary">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
