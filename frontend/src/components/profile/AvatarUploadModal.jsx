import React, { useState, useRef } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import './AvatarUploadModal.css';

/**
 * AvatarUploadModal component - Modal for uploading avatar with drag & drop
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Callback when modal closes
 * @param {Function} props.onUpload - Callback when file is uploaded (receives File object)
 * @param {boolean} props.uploading - Whether upload is in progress
 */
const AvatarUploadModal = ({
  isOpen,
  onClose,
  onUpload,
  uploading = false
}) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước file tối đa 5MB');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleUpload = () => {
    if (selectedFile && onUpload) {
      onUpload(selectedFile);
    }
  };

  const handleClose = () => {
    setPreview(null);
    setSelectedFile(null);
    setIsDragging(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Tải lên avatar"
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={handleClose} disabled={uploading}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            loading={uploading}
          >
            Tải lên
          </Button>
        </>
      }
    >
      <div className="avatar-upload">
        {!preview ? (
          <div
            className={`avatar-upload__dropzone ${isDragging ? 'avatar-upload__dropzone--dragging' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
          >
            <svg className="avatar-upload__icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="avatar-upload__title">
              {isDragging ? 'Thả file vào đây' : 'Kéo thả ảnh vào đây'}
            </p>
            <p className="avatar-upload__subtitle">hoặc</p>
            <Button variant="outline" size="sm">
              Chọn file
            </Button>
            <p className="avatar-upload__hint">
              PNG, JPG, GIF tối đa 5MB
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="avatar-upload__input"
            />
          </div>
        ) : (
          <div className="avatar-upload__preview">
            <div className="avatar-upload__preview-container">
              <img
                src={preview}
                alt="Preview"
                className="avatar-upload__preview-image"
              />
            </div>
            <div className="avatar-upload__preview-info">
              <p className="avatar-upload__preview-name">{selectedFile?.name}</p>
              <p className="avatar-upload__preview-size">
                {(selectedFile?.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setPreview(null);
                setSelectedFile(null);
              }}
              disabled={uploading}
            >
              Chọn ảnh khác
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AvatarUploadModal;

