import { apiClient } from '../config/api';

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const loadTokenFromStorage = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const signup = async (payload) => {
  const res = await apiClient.post('/auth/signup', payload);
  const { token, user } = res.data;
  setAuthToken(token);
  return { token, user };
};

export const login = async (payload) => {
  const res = await apiClient.post('/auth/login', payload);
  const { token, user } = res.data;
  setAuthToken(token);
  return { token, user };
};

export const logout = async () => {
  try { await apiClient.post('/auth/logout'); } catch (_) {}
  setAuthToken(null);
};

export const getProfile = async () => {
  const res = await apiClient.get('/profile');
  return res.data;
};

export const updateProfile = async (payload) => {
  const res = await apiClient.put('/profile', payload);
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await apiClient.post('/auth/forgot-password', { email });
  return res.data; // { message, resetToken }
};

export const resetPassword = async (token, password) => {
  const res = await apiClient.post('/auth/reset-password', { token, password });
  return res.data;
};

export const uploadAvatar = async (file) => {
  const fd = new FormData();
  fd.append('avatar', file);
  const res = await apiClient.post('/upload/avatar', fd, { 
    headers: { 'Content-Type': 'multipart/form-data' } 
  });
  return res.data; // { url }
};

export const uploadCover = async (file) => {
  const fd = new FormData();
  fd.append('cover', file);
  const res = await apiClient.post('/upload/cover', fd, { 
    headers: { 'Content-Type': 'multipart/form-data' } 
  });
  return res.data; // { url }
};
