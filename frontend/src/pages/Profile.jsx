import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { showError, showSuccess } from '../utils/toast';
import { useAuth } from '../context/AuthContext';
import { updateProfile, uploadAvatar, uploadCover } from '../services/authService';
import ProfileLayout from '../components/profile/ProfileLayout';
import ProfileHeader from '../components/profile/ProfileHeader';
import AvatarUploadModal from '../components/profile/AvatarUploadModal';
import Tabs from '../components/ui/Tabs';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import PasswordInput from '../components/auth/PasswordInput';
import Button from '../components/ui/Button';
import './Profile.css';

const personalInfoSchema = z.object({
  name: z.string().min(2, 'Tên tối thiểu 2 ký tự'),
});

const securitySchema = z.object({
  currentPassword: z.string().min(1, 'Vui lòng nhập mật khẩu hiện tại'),
  newPassword: z.string()
    .min(8, 'Mật khẩu tối thiểu 8 ký tự')
    .regex(/[a-z]/, 'Phải có chữ thường')
    .regex(/[A-Z]/, 'Phải có chữ hoa')
    .regex(/\d/, 'Phải có số'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
});

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const personalForm = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: { name: user?.name || '' },
  });

  const securityForm = useForm({
    resolver: zodResolver(securitySchema),
  });

  const onPersonalInfoSubmit = async (data) => {
    try {
      const updated = await updateProfile({ name: data.name });
      setUser(updated);
      showSuccess('Cập nhật thông tin thành công');
    } catch (err) {
      showError(err?.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  const onSecuritySubmit = async (data) => {
    try {
      await updateProfile({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      showSuccess('Đổi mật khẩu thành công');
      securityForm.reset();
    } catch (err) {
      showError(err?.response?.data?.message || 'Đổi mật khẩu thất bại');
    }
  };

  const handleAvatarUpload = async (file) => {
    try {
      setUploading(true);
      const { url } = await uploadAvatar(file);
      const updated = await updateProfile({ avatar: url });
      setUser(updated);
      showSuccess('Cập nhật avatar thành công');
      setIsAvatarModalOpen(false);
    } catch (err) {
      showError('Upload avatar thất bại');
    } finally {
      setUploading(false);
    }
  };

  const handleCoverUpload = async (file) => {
    try {
      setUploading(true);
      const { url } = await uploadCover(file);
      const updated = await updateProfile({ coverPhoto: url });
      setUser(updated);
      showSuccess('Cập nhật ảnh bìa thành công');
      setIsCoverModalOpen(false);
    } catch (err) {
      showError('Upload ảnh bìa thất bại');
    } finally {
      setUploading(false);
    }
  };

  if (!user) return null;

  const tabs = [
    {
      id: 'personal',
      label: 'Thông tin cá nhân',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      ),
      content: (
        <Card>
          <form onSubmit={personalForm.handleSubmit(onPersonalInfoSubmit)} className="profile__form">
            <div className="profile__form-group">
              <Input
                label="Họ và tên"
                type="text"
                placeholder="Nguyễn Văn A"
                {...personalForm.register('name')}
                state={personalForm.formState.errors.name ? 'error' : 'default'}
                error={personalForm.formState.errors.name?.message}
                leftIcon={
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                }
              />
            </div>

            <div className="profile__form-group">
              <Input
                label="Email"
                type="email"
                value={user.email}
                disabled
                helperText="Email không thể thay đổi"
                leftIcon={
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
              />
            </div>

            <div className="profile__form-actions">
              <Button
                type="submit"
                variant="primary"
                loading={personalForm.formState.isSubmitting}
              >
                Lưu thay đổi
              </Button>
            </div>
          </form>
        </Card>
      )
    },
    {
      id: 'security',
      label: 'Bảo mật',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      content: (
        <Card>
          <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="profile__form">
            <div className="profile__form-group">
              <PasswordInput
                label="Mật khẩu hiện tại"
                placeholder="Nhập mật khẩu hiện tại"
                value={securityForm.watch('currentPassword', '')}
                {...securityForm.register('currentPassword')}
                error={securityForm.formState.errors.currentPassword?.message}
              />
            </div>

            <div className="profile__form-group">
              <PasswordInput
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
                value={securityForm.watch('newPassword', '')}
                {...securityForm.register('newPassword')}
                error={securityForm.formState.errors.newPassword?.message}
                showStrength={true}
                showRequirements={true}
              />
            </div>

            <div className="profile__form-group">
              <PasswordInput
                label="Xác nhận mật khẩu mới"
                placeholder="Nhập lại mật khẩu mới"
                value={securityForm.watch('confirmPassword', '')}
                {...securityForm.register('confirmPassword')}
                error={securityForm.formState.errors.confirmPassword?.message}
              />
            </div>

            <div className="profile__form-actions">
              <Button
                type="submit"
                variant="primary"
                loading={securityForm.formState.isSubmitting}
              >
                Đổi mật khẩu
              </Button>
            </div>
          </form>
        </Card>
      )
    },
    {
      id: 'preferences',
      label: 'Tùy chọn',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      content: (
        <Card>
          <div className="profile__preferences">
            <p className="profile__preferences-text">Tính năng đang được phát triển...</p>
          </div>
        </Card>
      )
    },
    {
      id: 'activity',
      label: 'Hoạt động',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      content: (
        <Card>
          <div className="profile__activity">
            <p className="profile__activity-text">Chưa có hoạt động nào được ghi nhận.</p>
          </div>
        </Card>
      )
    }
  ];

  return (
    <ProfileLayout activeSection={activeTab}>
      <div className="profile">
        <ProfileHeader
          user={user}
          onAvatarClick={() => setIsAvatarModalOpen(true)}
          onCoverClick={() => setIsCoverModalOpen(true)}
        />

        <Tabs
          tabs={tabs}
          defaultTab="personal"
          onChange={setActiveTab}
          variant="underline"
        />
      </div>

      {/* Avatar Upload Modal */}
      <AvatarUploadModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onUpload={handleAvatarUpload}
        uploading={uploading}
      />

      {/* Cover Photo Upload Modal */}
      <AvatarUploadModal
        isOpen={isCoverModalOpen}
        onClose={() => setIsCoverModalOpen(false)}
        onUpload={handleCoverUpload}
        uploading={uploading}
      />
    </ProfileLayout>
  );
};

export default ProfilePage;
