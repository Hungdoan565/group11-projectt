import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { showError, showSuccess } from '../utils/toast';
import { forgotPassword } from '../services/authService';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import './ForgotPassword.css';

const schema = z.object({
  email: z.string().email('Email không hợp lệ')
});

const ForgotPasswordPage = () => {
  const [step, setStep] = useState('input'); // 'input' | 'success'
  const [resetToken, setResetToken] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm({
    resolver: zodResolver(schema)
  });

  const emailValue = watch('email', '');

  const onSubmit = async ({ email }) => {
    try {
      const { resetToken } = await forgotPassword(email);
      setResetToken(resetToken);
      setSubmittedEmail(email);
      setStep('success');
      showSuccess('Đã gửi yêu cầu đặt lại mật khẩu');
      if (resetToken) console.log('Reset token:', resetToken);
    } catch (err) {
      showError(err?.response?.data?.message || 'Không thể tạo token đặt lại');
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(resetToken);
    showSuccess('Đã copy token vào clipboard');
  };

  return (
    <AuthLayout
      title="Khôi phục tài khoản"
      subtitle="Đừng lo lắng, chúng tôi sẽ giúp bạn lấy lại quyền truy cập"
      features={[
        'Quy trình đơn giản và nhanh chóng',
        'Bảo mật với token hết hạn',
        'Hỗ trợ 24/7',
        'Không cần thông tin cá nhân'
      ]}
    >
      <AuthCard
        title={step === 'input' ? 'Quên mật khẩu?' : 'Kiểm tra email của bạn'}
        subtitle={
          step === 'input'
            ? 'Nhập email để nhận hướng dẫn đặt lại mật khẩu'
            : 'Chúng tôi đã gửi token đặt lại mật khẩu'
        }
        footer={
          <div className="forgot-password__footer">
            <Link to="/login" className="forgot-password__back-link">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Quay lại đăng nhập
            </Link>
          </div>
        }
      >
        {step === 'input' ? (
          <form onSubmit={handleSubmit(onSubmit)} className="forgot-password__form">
            <div className="forgot-password__illustration">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="var(--color-primary-100)" />
                <path
                  d="M100 60C88.954 60 80 68.954 80 80V90H70C65.582 90 62 93.582 62 98V130C62 134.418 65.582 138 70 138H130C134.418 138 138 134.418 138 130V98C138 93.582 134.418 90 130 90H120V80C120 68.954 111.046 60 100 60Z"
                  fill="var(--color-primary-500)"
                />
                <circle cx="100" cy="110" r="8" fill="white" />
                <rect x="96" y="110" width="8" height="12" rx="2" fill="white" />
                <path
                  d="M85 90V80C85 71.716 91.716 65 100 65C108.284 65 115 71.716 115 80V90"
                  stroke="var(--color-primary-700)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="forgot-password__form-group">
              <Input
                label="Email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                state={errors.email ? 'error' : 'default'}
                error={errors.email?.message}
                leftIcon={
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
            >
              Gửi yêu cầu
            </Button>
          </form>
        ) : (
          <div className="forgot-password__success">
            <div className="forgot-password__success-icon">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="var(--color-success-100)" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M100 140C122.091 140 140 122.091 140 100C140 77.909 122.091 60 100 60C77.909 60 60 77.909 60 100C60 122.091 77.909 140 100 140ZM113.536 88.464C115.488 90.416 115.488 93.584 113.536 95.536L98.536 110.536C96.584 112.488 93.416 112.488 91.464 110.536L84.464 103.536C82.512 101.584 82.512 98.416 84.464 96.464C86.416 94.512 89.584 94.512 91.536 96.464L95 99.928L106.464 88.464C108.416 86.512 111.584 86.512 113.536 88.464Z"
                  fill="var(--color-success-500)"
                />
              </svg>
            </div>

            <div className="forgot-password__success-content">
              <p className="forgot-password__success-text">
                Chúng tôi đã gửi token đặt lại mật khẩu đến email:
              </p>
              <p className="forgot-password__success-email">{submittedEmail}</p>

              {resetToken && (
                <div className="forgot-password__token-box">
                  <p className="forgot-password__token-label">Reset Token:</p>
                  <div className="forgot-password__token-display">
                    <code className="forgot-password__token-code">{resetToken}</code>
                    <button
                      type="button"
                      onClick={copyToken}
                      className="forgot-password__copy-btn"
                      title="Copy token"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <div className="forgot-password__instructions">
                <p className="forgot-password__instructions-title">Bước tiếp theo:</p>
                <ol className="forgot-password__instructions-list">
                  <li>Copy token ở trên</li>
                  <li>Truy cập trang đặt lại mật khẩu</li>
                  <li>Nhập token và mật khẩu mới</li>
                </ol>
              </div>

              <Link to="/reset-password" className="forgot-password__reset-link-btn">
                <Button variant="primary" size="lg" fullWidth>
                  Đặt lại mật khẩu ngay
                </Button>
              </Link>

              <button
                type="button"
                onClick={() => setStep('input')}
                className="forgot-password__resend-btn"
              >
                Gửi lại yêu cầu
              </button>
            </div>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
