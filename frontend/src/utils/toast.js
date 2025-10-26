import toast from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#10b981',
      color: '#fff',
      fontWeight: '600',
      borderRadius: '10px',
      padding: '16px',
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#ef4444',
      color: '#fff',
      fontWeight: '600',
      borderRadius: '10px',
      padding: '16px',
    },
  });
};

export const showConfirm = (message, onConfirm) => {
  return new Promise((resolve) => {
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: 0, fontWeight: '600', color: '#1e293b' }}>{message}</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              resolve(false);
            }}
            style={{
              padding: '8px 16px',
              background: '#e2e8f0',
              color: '#475569',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Hủy
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              resolve(true);
              if (onConfirm) onConfirm();
            }}
            style={{
              padding: '8px 16px',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: '#fff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        minWidth: '320px',
      },
    });
  });
};

export const showLoading = (message = 'Đang xử lý...') => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#22c55e',
      color: '#fff',
      fontWeight: '600',
      borderRadius: '10px',
      padding: '16px',
    },
  });
};

export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};
