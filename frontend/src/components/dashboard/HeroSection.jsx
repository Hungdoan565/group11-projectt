import React from 'react';
import Button from '../ui/Button';
import './HeroSection.css';

/**
 * Hero Section component for the dashboard homepage
 * Displays welcome message, features, and call-to-action buttons
 */
const HeroSection = ({ onAddUser, onLearnMore }) => {
  return (
    <section className="hero-section">
      {/* Decorative background circles */}
      <div className="hero-circle hero-circle-1"></div>
      <div className="hero-circle hero-circle-2"></div>
      <div className="hero-circle hero-circle-3"></div>

      <div className="hero-container">
        {/* Left: Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <span>Hệ thống quản lý hiện đại</span>
          </div>

          <h1 className="hero-title">
            Chào mừng đến với
            <span className="hero-title-highlight"> User Manager</span>
          </h1>

          <p className="hero-description">
            Quản lý người dùng một cách dễ dàng, nhanh chóng và hiệu quả.
            Hệ thống được thiết kế với giao diện hiện đại, trực quan và đầy đủ tính năng.
          </p>

          <div className="hero-features">
            <div className="hero-feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Quản lý dễ dàng</span>
            </div>
            <div className="hero-feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Bảo mật cao</span>
            </div>
            <div className="hero-feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Giao diện hiện đại</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta">
            <Button
              variant="secondary"
              size="lg"
              onClick={onAddUser}
              leftIcon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              }
            >
              Thêm người dùng ngay
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onLearnMore}
              leftIcon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              }
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="hero-illustration">
          <div className="hero-graphic">
            {/* Animated users icon */}
            <svg className="hero-icon" viewBox="0 0 200 200" fill="none">
              {/* Background circle */}
              <circle cx="100" cy="100" r="90" fill="url(#heroGradient1)" opacity="0.1"/>
              
              {/* Main user icon */}
              <g className="hero-icon-main">
                <circle cx="100" cy="75" r="25" fill="url(#heroGradient2)"/>
                <path d="M 60 140 Q 60 110 100 110 Q 140 110 140 140 L 140 160 L 60 160 Z" fill="url(#heroGradient2)"/>
              </g>

              {/* Secondary users */}
              <g className="hero-icon-secondary" opacity="0.6">
                <circle cx="50" cy="85" r="15" fill="url(#heroGradient3)"/>
                <path d="M 30 125 Q 30 105 50 105 Q 70 105 70 125 L 70 135 L 30 135 Z" fill="url(#heroGradient3)"/>
              </g>

              <g className="hero-icon-secondary" opacity="0.6">
                <circle cx="150" cy="85" r="15" fill="url(#heroGradient4)"/>
                <path d="M 130 125 Q 130 105 150 105 Q 170 105 170 125 L 170 135 L 130 135 Z" fill="url(#heroGradient4)"/>
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e"/>
                  <stop offset="100%" stopColor="#0f766e"/>
                </linearGradient>
                <linearGradient id="heroGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e"/>
                  <stop offset="100%" stopColor="#16a34a"/>
                </linearGradient>
                <linearGradient id="heroGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f766e"/>
                  <stop offset="100%" stopColor="#0d9488"/>
                </linearGradient>
                <linearGradient id="heroGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6"/>
                  <stop offset="100%" stopColor="#0f766e"/>
                </linearGradient>
              </defs>
            </svg>

            {/* Floating particles */}
            <div className="hero-particle hero-particle-1"></div>
            <div className="hero-particle hero-particle-2"></div>
            <div className="hero-particle hero-particle-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

