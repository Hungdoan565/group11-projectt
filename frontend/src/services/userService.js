import { apiClient } from '../config/api';

export const getUsers = async () => {
  const res = await apiClient.get('/users');
  return res.data;
};

export const createUser = async (payload) => {
  const res = await apiClient.post('/users', payload);
  return res.data;
};

export const updateUser = async (id, payload) => {
  const res = await apiClient.put(`/users/${id}`, payload);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await apiClient.delete(`/users/${id}`);
  return res.data;
};
