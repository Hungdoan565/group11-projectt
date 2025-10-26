import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './HomePage.css';

/**
 * Home page for regular users
 * Displays welcome message and quick links
 */
const HomePage = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar userCount={0} />
      
      <div className="home-page">
        <div className="home-container">
          {/* Hero Section */}
          <section className="home-hero">
            <div className="home-hero__badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <span>Hệ thống quản lý người dùng</span>
            </div>

            <h1 className="home-hero__title">
              Chào mừng, <span className="home-hero__name">{user?.name}</span>!
            </h1>

            <p className="home-hero__description">
              Quản lý thông tin cá nhân của bạn một cách dễ dàng và bảo mật.
              Cập nhật hồ sơ, thay đổi mật khẩu và theo dõi hoạt động của bạn.
            </p>

            <div className="home-hero__actions">
              <Link to="/profile" className="home-btn home-btn--primary">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Xem hồ sơ
              </Link>
            </div>
          </section>

          {/* Features Grid */}
          <section className="home-features">
            <h2 className="home-features__title">Tính năng nổi bật</h2>
            
            <div className="home-features__grid">
              <Link to="/profile" className="home-feature-card">
                <div className="home-feature-card__icon home-feature-card__icon--blue">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="home-feature-card__title">Thông tin cá nhân</h3>
                <p className="home-feature-card__description">
                  Cập nhật và quản lý thông tin cá nhân của bạn
                </p>
              </Link>

              <Link to="/profile" className="home-feature-card">
                <div className="home-feature-card__icon home-feature-card__icon--green">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="home-feature-card__title">Bảo mật</h3>
                <p className="home-feature-card__description">
                  Thay đổi mật khẩu và bảo vệ tài khoản của bạn
                </p>
              </Link>

              <div className="home-feature-card home-feature-card--disabled">
                <div className="home-feature-card__icon home-feature-card__icon--purple">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="home-feature-card__title">Tùy chọn</h3>
                <p className="home-feature-card__description">
                  Tính năng đang được phát triển...
                </p>
                <span className="home-feature-card__badge">Sắp ra mắt</span>
              </div>

              <div className="home-feature-card home-feature-card--disabled">
                <div className="home-feature-card__icon home-feature-card__icon--orange">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="home-feature-card__title">Hoạt động</h3>
                <p className="home-feature-card__description">
                  Theo dõi lịch sử hoạt động của bạn
                </p>
                <span className="home-feature-card__badge">Sắp ra mắt</span>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="home-stats">
            <div className="home-stat-card">
              <div className="home-stat-card__icon">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="home-stat-card__content">
                <p className="home-stat-card__label">Ngày tham gia</p>
                <p className="home-stat-card__value">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'Không rõ'}
                </p>
              </div>
            </div>

            <div className="home-stat-card">
              <div className="home-stat-card__icon">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="home-stat-card__content">
                <p className="home-stat-card__label">Vai trò</p>
                <p className="home-stat-card__value">
                  {user?.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                </p>
              </div>
            </div>

            <div className="home-stat-card">
              <div className="home-stat-card__icon">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="home-stat-card__content">
                <p className="home-stat-card__label">Trạng thái</p>
                <p className="home-stat-card__value">Đang hoạt động</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;

