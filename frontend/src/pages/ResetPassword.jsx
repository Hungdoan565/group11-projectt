import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../utils/toast';
import { resetPassword } from '../services/authService';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import Input from '../components/ui/Input';
import PasswordInput from '../components/auth/PasswordInput';
import Button from '../components/ui/Button';
import './ResetPassword.css';

const schema = z.object({
  token: z.string().min(10, 'Token không hợp lệ'),
  password: z.string()
    .min(8, 'Mật khẩu tối thiểu 8 ký tự')
    .regex(/[a-z]/, 'Phải có chữ thường')
    .regex(/[A-Z]/, 'Phải có chữ hoa')
    .regex(/\d/, 'Phải có số'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
});

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm({
    resolver: zodResolver(schema)
  });

  const passwordValue = watch('password', '');
  const confirmPasswordValue = watch('confirmPassword', '');

  const onSubmit = async ({ token, password }) => {
    try {
      await resetPassword(token, password);
      setIsSuccess(true);
      showSuccess('Đổi mật khẩu thành công');

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      showError(err?.response?.data?.message || 'Đổi mật khẩu thất bại');
    }
  };

  return (
    <AuthLayout
      title="Đặt lại mật khẩu"
      subtitle="Tạo mật khẩu mới để bảo vệ tài khoản của bạn"
      features={[
        'Mật khẩu mạnh và an toàn',
        'Mã hóa end-to-end',
        'Token hết hạn sau 1 giờ',
        'Thông báo qua email'
      ]}
    >
      <AuthCard
        title={isSuccess ? 'Thành công!' : 'Đặt lại mật khẩu'}
        subtitle={
          isSuccess
            ? 'Mật khẩu của bạn đã được cập nhật'
            : 'Nhập token và mật khẩu mới'
        }
        footer={
          !isSuccess && (
            <div className="reset-password__footer">
              <p className="reset-password__footer-text">
                Chưa có token?{' '}
                <Link to="/forgot-password" className="reset-password__link">
                  Yêu cầu đặt lại
                </Link>
              </p>
            </div>
          )
        }
      >
        {isSuccess ? (
          <div className="reset-password__success">
            <div className="reset-password__success-icon">
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

            <div className="reset-password__success-content">
              <p className="reset-password__success-text">
                Mật khẩu của bạn đã được đặt lại thành công!
              </p>
              <p className="reset-password__success-subtext">
                Bạn có thể đăng nhập với mật khẩu mới ngay bây giờ.
              </p>

              <div className="reset-password__redirect-info">
                <svg className="reset-password__redirect-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Tự động chuyển đến trang đăng nhập sau 3 giây...</span>
              </div>

              <Link to="/login" className="reset-password__login-link-btn">
                <Button variant="primary" size="lg" fullWidth>
                  Đăng nhập ngay
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="reset-password__form">
            <div className="reset-password__illustration">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="var(--color-primary-100)" />
                <path
                  d="M100 60C88.954 60 80 68.954 80 80V90H70C65.582 90 62 93.582 62 98V130C62 134.418 65.582 138 70 138H130C134.418 138 138 134.418 138 130V98C138 93.582 134.418 90 130 90H120V80C120 68.954 111.046 60 100 60Z"
                  fill="var(--color-success-500)"
                />
                <circle cx="100" cy="110" r="8" fill="white" />
                <path
                  d="M96 110L98 112L104 106"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M85 90V80C85 71.716 91.716 65 100 65C108.284 65 115 71.716 115 80V90"
                  stroke="var(--color-success-700)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="reset-password__form-group">
              <Input
                label="Reset Token"
                type="text"
                placeholder="Nhập token từ email"
                {...register('token')}
                state={errors.token ? 'error' : 'default'}
                error={errors.token?.message}
                leftIcon={
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                  </svg>
                }
              />
            </div>

            <div className="reset-password__form-group">
              <PasswordInput
                label="Mật khẩu mới"
                placeholder="Tạo mật khẩu mạnh"
                value={passwordValue}
                {...register('password')}
                error={errors.password?.message}
                showStrength={true}
                showRequirements={true}
              />
            </div>

            <div className="reset-password__form-group">
              <PasswordInput
                label="Xác nhận mật khẩu"
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPasswordValue}
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
            >
              Đặt lại mật khẩu
            </Button>
          </form>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
