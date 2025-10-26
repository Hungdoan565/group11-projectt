import React, { useEffect, useState, useMemo } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { showError, showSuccess, showConfirm } from '../utils/toast';
import TableToolbar from './TableToolbar';
import SkeletonRow from './SkeletonRow';
import './UserTable.css';
import { getUsers, deleteUser as deleteUserApi } from '../services/userService';

const UserTable = ({ onEditUser, onUserCountChange, onUsersChange }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      if (onUserCountChange) {
        onUserCountChange(data.length);
      }
      if (onUsersChange) {
        onUsersChange(data);
      }
    } catch (err) {
      // Nếu chưa đăng nhập (401), không hiện toast lỗi để UI cũ vẫn hiển thị "Chưa có người dùng"
      if (err?.response?.status !== 401) {
        console.error('Lỗi khi lấy danh sách người dùng', err);
        showError('Không thể tải danh sách người dùng');
      }
      setUsers([]);
      if (onUserCountChange) onUserCountChange(0);
      if (onUsersChange) onUsersChange([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = await showConfirm(`Bạn có chắc muốn xóa người dùng "${name}"?`);
    if (!confirmed) return;

    try {
      await deleteUserApi(id);
      const newUsers = users.filter(user => user.id !== id);
      setUsers(newUsers);
      if (onUserCountChange) {
        onUserCountChange(newUsers.length);
      }
      if (onUsersChange) {
        onUsersChange(newUsers);
      }
      showSuccess(`Đã xóa người dùng "${name}"`);
    } catch (err) {
      console.error('Lỗi khi xóa người dùng', err);
      showError('Không thể xóa người dùng');
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Filter and sort logic
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'email-asc':
          return a.email.localeCompare(b.email);
        case 'email-desc':
          return b.email.localeCompare(a.email);
        case 'date-desc':
          return b.id.localeCompare(a.id); // Assuming ID correlates with creation time
        case 'date-asc':
          return a.id.localeCompare(b.id);
        default:
          return 0;
      }
    });

    return result;
  }, [users, searchQuery, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedUsers.length / pageSize) || 1;
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedUsers, currentPage, pageSize]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, pageSize]);

  if (loading) {
    return (
      <div className="user-table-container">
        <TableToolbar
          searchQuery=""
          onSearchChange={() => {}}
          sortBy="name-asc"
          onSortChange={() => {}}
          totalCount={0}
          currentPage={1}
          pageSize={10}
          onPageSizeChange={() => {}}
          onPageChange={() => {}}
          totalPages={1}
        />
        <div className="table-wrapper">
          <table className="user-table" role="table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Họ và Tên</th>
                <th>Email</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (filteredAndSortedUsers.length === 0 && searchQuery) {
    return (
      <div className="user-table-container">
        <TableToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={users.length}
          currentPage={1}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          onPageChange={setCurrentPage}
          totalPages={1}
        />
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">Không tìm thấy kết quả</h3>
          <p className="empty-state-text">
            Không có người dùng nào phù hợp với từ khóa "{searchQuery}"
          </p>
          <button className="btn-secondary" onClick={() => setSearchQuery('')}>
            Xóa tìm kiếm
          </button>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="user-table-container">
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3 className="empty-state-title">Chưa có người dùng</h3>
          <p className="empty-state-text">
            Bắt đầu thêm người dùng đầu tiên vào hệ thống
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-table-container">
      <TableToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={filteredAndSortedUsers.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
      />
      
      <div className="table-wrapper">
        <table className="user-table" role="table">
          <thead>
            <tr>
              <th scope="col">Avatar</th>
              <th scope="col">Họ và Tên</th>
              <th scope="col">Email</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="user-row">
                <td>
                  <div className="user-avatar">{getInitials(user.name)}</div>
                </td>
                <td>
                  <div className="user-name">{user.name}</div>
                </td>
                <td>
                  <div className="user-email">{user.email}</div>
                </td>
                <td>
                  <div className="user-actions">
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => onEditUser(user)}
                      title="Chỉnh sửa người dùng"
                      aria-label={`Chỉnh sửa người dùng ${user.name}`}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(user.id, user.name)}
                      title="Xóa người dùng"
                      aria-label={`Xóa người dùng ${user.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-footer">
        <div className="footer-info">
          <span className="footer-text">
            Tổng số: <strong>{users.length}</strong> người dùng
          </span>
          <span className="footer-separator">•</span>
          <span className="footer-text">
            Hiển thị: <strong>{paginatedUsers.length}</strong> trên trang này
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
