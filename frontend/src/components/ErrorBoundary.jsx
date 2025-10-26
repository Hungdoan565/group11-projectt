import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%)',
          padding: '20px',
        }}>
          <div style={{
            background: '#fff',
            padding: '48px',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '24px' }}>⚠️</div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '12px',
            }}>
              Đã xảy ra lỗi
            </h1>
            <p style={{
              color: '#64748b',
              marginBottom: '24px',
              lineHeight: '1.6',
            }}>
              Ứng dụng gặp sự cố không mong muốn. Vui lòng tải lại trang hoặc liên hệ hỗ trợ.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
background: 'var(--color-primary-500)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)',
              }}
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
