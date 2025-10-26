import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from './config/api';
import { showError, showSuccess } from './utils/toast';

const AddUser = ({ onUserAdded, editingUser, onCancelEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '' });

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [editingUser]);

  const validateForm = () => {
    const newErrors = { name: '', email: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email không hợp lệ';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Vui lòng kiểm tra lại thông tin');
      return;
    }

    setLoading(true);
    try {
      if (editingUser) {
        await axios.put(API_ENDPOINTS.user(editingUser.id), { name, email });
        showSuccess('Cập nhật người dùng thành công');
      } else {
        await axios.post(API_ENDPOINTS.users, { name, email });
        showSuccess('Thêm người dùng thành công');
      }
      setName('');
      setEmail('');
      setErrors({ name: '', email: '' });
      if (onUserAdded) onUserAdded();
      if (onCancelEdit) onCancelEdit();
    } catch (err) {
      console.error('Lỗi khi lưu người dùng', err);
      showError(editingUser ? 'Không thể cập nhật người dùng' : 'Không thể thêm người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setErrors({ name: '', email: '' });
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="add-user-form">
      <h2 className="form-title">
        {editingUser ? 'Chỉnh Sửa Người Dùng' : 'Thêm Người Dùng'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Họ và Tên</label>
          <input
            id="name"
            type="text"
            placeholder="Nhập họ và tên đầy đủ"
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            className={errors.name ? 'input-error' : ''}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span className="error-message" id="name-error" role="alert">
              {errors.name}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            className={errors.email ? 'input-error' : ''}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span className="error-message" id="email-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? '⏳ Đang xử lý...' : (editingUser ? 'Cập Nhật' : 'Thêm Người Dùng')}
          </button>
          {editingUser && (
            <button type="button" className="btn-cancel" onClick={handleCancel} disabled={loading}>
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

  export default AddUser;
