import React from 'react';
import Button from '../ui/Button';
import './EnhancedEmptyState.css';

const EnhancedEmptyState = ({ onAddUser }) => {
  return (
    <div className="enhanced-empty-state">
      <div className="empty-state-card">
        {/* Illustration */}
        <div className="empty-state-illustration">
          <svg viewBox="0 0 200 200" fill="none" className="empty-state-svg">
            {/* Desk */}
            <rect x="40" y="120" width="120" height="8" rx="4" fill="#e5e7eb"/>
            
            {/* Laptop */}
            <g className="laptop-group">
              {/* Screen */}
              <rect x="70" y="80" width="60" height="40" rx="2" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
              <rect x="75" y="85" width="50" height="30" rx="1" fill="#fff"/>
              
              {/* Screen content - empty user list */}
              <line x1="80" y1="90" x2="115" y2="90" stroke="#e5e7eb" strokeWidth="2"/>
              <line x1="80" y1="97" x2="115" y2="97" stroke="#e5e7eb" strokeWidth="2"/>
              <line x1="80" y1="104" x2="115" y2="104" stroke="#e5e7eb" strokeWidth="2"/>
              
              {/* Empty icon on screen */}
              <circle cx="100" cy="100" r="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5"/>
              <path d="M 97 100 L 103 100 M 100 97 L 100 103" stroke="#9ca3af" strokeWidth="1.5"/>
              
              {/* Keyboard */}
              <rect x="65" y="120" width="70" height="3" rx="1.5" fill="#d1d5db"/>
            </g>

            {/* Floating elements */}
            <g className="floating-elements">
              {/* User icon 1 */}
              <g className="float-icon float-icon-1" opacity="0.4">
                <circle cx="30" cy="60" r="8" fill="#22c55e"/>
                <path d="M 20 80 Q 20 70 30 70 Q 40 70 40 80" fill="#22c55e"/>
              </g>
              
              {/* User icon 2 */}
              <g className="float-icon float-icon-2" opacity="0.4">
                <circle cx="170" cy="50" r="8" fill="#0f766e"/>
                <path d="M 160 70 Q 160 60 170 60 Q 180 60 180 70" fill="#0f766e"/>
              </g>
              
              {/* Plus icon */}
              <g className="float-icon float-icon-3" opacity="0.5">
                <circle cx="160" cy="100" r="10" fill="#14b8a6" opacity="0.2"/>
                <path d="M 160 95 L 160 105 M 155 100 L 165 100" stroke="#14b8a6" strokeWidth="2"/>
              </g>
            </g>

            {/* Decorative dots */}
            <circle cx="50" cy="140" r="2" fill="#d1d5db" className="dot dot-1"/>
            <circle cx="150" cy="135" r="2" fill="#d1d5db" className="dot dot-2"/>
            <circle cx="100" cy="145" r="2" fill="#d1d5db" className="dot dot-3"/>
          </svg>
        </div>

        {/* Content */}
        <div className="empty-state-content">
          <div className="empty-state-icon-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>

          <h2 className="empty-state-title">Bắt đầu xây dựng cộng đồng!</h2>
          
          <p className="empty-state-description">
            Hệ thống của bạn đang chờ người dùng đầu tiên. 
            Hãy thêm họ ngay bây giờ để bắt đầu quản lý cộng đồng của bạn.
          </p>

          {/* CTA Button */}
          <div className="empty-state-actions">
            <Button 
              variant="primary" 
              size="lg"
              onClick={onAddUser}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Thêm người dùng đầu tiên
            </Button>
          </div>

          {/* Tips */}
          <div className="empty-state-tips">
            <div className="tip-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <p className="tip-text">
              <strong>Mẹo:</strong> Bạn có thể chỉnh sửa hoặc xóa người dùng bất kỳ lúc nào sau khi thêm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedEmptyState;

