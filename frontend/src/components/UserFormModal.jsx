import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { showError, showSuccess } from '../utils/toast';
import './UserFormModal.css';
import { createUser, updateUser } from '../services/userService';

const userSchema = z.object({
  name: z.string()
    .min(1, 'Vui lòng nhập họ và tên')
    .min(3, 'Tên phải có ít nhất 3 ký tự')
    .max(100, 'Tên không quá 100 ký tự'),
  email: z.string()
    .min(1, 'Vui lòng nhập email')
    .email('Email không hợp lệ')
    .max(255, 'Email không quá 255 ký tự'),
});

const UserFormModal = ({ isOpen, onClose, editingUser, onSuccess }) => {
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset, 
    setValue 
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (editingUser) {
      setValue('name', editingUser.name);
      setValue('email', editingUser.email);
    } else {
      reset();
    }
  }, [editingUser, setValue, reset]);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const onSubmit = async (data) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, data);
        showSuccess('Cập nhật người dùng thành công');
      } else {
        await createUser(data);
        showSuccess('Thêm người dùng thành công');
      }
      reset();
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error('Lỗi khi lưu người dùng', err);
      showError(editingUser ? 'Không thể cập nhật người dùng' : 'Không thể thêm người dùng');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {editingUser ? 'Chỉnh Sửa Người Dùng' : 'Thêm Người Dùng Mới'}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Đóng"
            type="button"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="modal-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Họ và Tên</label>
            <input
              {...register('name')}
              ref={(e) => {
                register('name').ref(e);
                firstInputRef.current = e;
              }}
              id="name"
              type="text"
              placeholder="Nhập họ và tên đầy đủ"
              className={errors.name ? 'input-error' : ''}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span className="error-message" id="name-error" role="alert">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="example@email.com"
              className={errors.email ? 'input-error' : ''}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span className="error-message" id="email-error" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? '⏳ Đang xử lý...' : (editingUser ? 'Cập Nhật' : 'Thêm Người Dùng')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
