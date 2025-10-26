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
import './Signup.css';

const schema = z.object({
  name: z.string().min(2, 'Tên tối thiểu 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
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

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm({
    resolver: zodResolver(schema)
  });

  const passwordValue = watch('password', '');
  const confirmPasswordValue = watch('confirmPassword', '');

  const onSubmit = async (data) => {
    if (!acceptTerms) {
      showError('Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }

    try {
      const { confirmPassword, ...signupData } = data;
      const user = await signup(signupData);
      showSuccess('Đăng ký thành công');
      if (user.role === 'admin') navigate('/admin/users');
      else navigate('/profile');
    } catch (err) {
      showError(err?.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <AuthLayout
      title="Tạo tài khoản mới"
      subtitle="Bắt đầu hành trình quản lý hiệu quả"
      features={[
        'Tạo tài khoản miễn phí',
        'Quản lý thông tin cá nhân',
        'Bảo mật với JWT',
        'Hỗ trợ 24/7'
      ]}
    >
      <AuthCard
        title="Đăng ký"
        subtitle="Tạo tài khoản để bắt đầu"
        footer={
          <div className="signup__footer-links">
            <p className="signup__footer-text">
              Đã có tài khoản?{' '}
              <Link to="/login" className="signup__link">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="signup__form">
          <div className="signup__form-group">
            <Input
              label="Họ và tên"
              type="text"
              placeholder="Nguyễn Văn A"
              {...register('name')}
              state={errors.name ? 'error' : 'default'}
              error={errors.name?.message}
              leftIcon={
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              }
            />
          </div>

          <div className="signup__form-group">
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

          <div className="signup__form-group">
            <PasswordInput
              label="Mật khẩu"
              placeholder="Tạo mật khẩu mạnh"
              value={passwordValue}
              {...register('password')}
              error={errors.password?.message}
              showStrength={true}
              showRequirements={true}
            />
          </div>

          <div className="signup__form-group">
            <PasswordInput
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu"
              value={confirmPasswordValue}
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>

          <div className="signup__terms">
            <label className="signup__checkbox">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <span>
                Tôi đồng ý với{' '}
                <a href="#" className="signup__terms-link">Điều khoản sử dụng</a>
                {' '}và{' '}
                <a href="#" className="signup__terms-link">Chính sách bảo mật</a>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            disabled={!acceptTerms}
          >
            Tạo tài khoản
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default SignupPage;
