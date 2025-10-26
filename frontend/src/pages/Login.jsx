import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showError, showSuccess } from '../utils/toast';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import Input from '../components/ui/Input';
import PasswordInput from '../components/auth/PasswordInput';
import Button from '../components/ui/Button';
import './Login.css';

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Tối thiểu 6 ký tự'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm({
    resolver: zodResolver(schema)
  });

  const passwordValue = watch('password', '');

  const onSubmit = async (data) => {
    try {
      const user = await login(data);
      showSuccess('Đăng nhập thành công');
      if (user.role === 'admin') navigate('/admin/users');
      else navigate('/profile');
    } catch (err) {
      showError(err?.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <AuthLayout
      title="Chào mừng trở lại!"
      subtitle="Đăng nhập để tiếp tục quản lý hệ thống"
    >
      <AuthCard
        title="Đăng nhập"
        subtitle="Nhập thông tin tài khoản của bạn"
        footer={
          <div className="login__footer-links">
            <p className="login__footer-text">
              Chưa có tài khoản?{' '}
              <Link to="/signup" className="login__link">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="login__form">
          <div className="login__form-group">
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

          <div className="login__form-group">
            <PasswordInput
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              value={passwordValue}
              {...register('password')}
              error={errors.password?.message}
            />
          </div>

          <div className="login__options">
            <label className="login__checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <Link to="/forgot-password" className="login__forgot-link">
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
          >
            Đăng nhập
          </Button>

          <div className="login__divider">
            <span>hoặc</span>
          </div>

          <div className="login__social">
            <button type="button" className="login__social-btn login__social-btn--google">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Đăng nhập với Google</span>
            </button>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
