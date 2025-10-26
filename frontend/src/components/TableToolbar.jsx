import React from 'react';
import { Search, X } from 'lucide-react';
import './TableToolbar.css';

const TableToolbar = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange,
  totalCount,
  currentPage,
  pageSize,
  onPageSizeChange,
  onPageChange,
  totalPages
}) => {
  return (
    <div className="table-toolbar">
      <div className="toolbar-left">
        <div className="search-box">
          <Search className="search-icon" size={18} aria-hidden="true" />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Tìm kiếm người dùng"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Xóa tìm kiếm"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      
      <div className="toolbar-right">
        <div className="sort-dropdown">
          <label htmlFor="sort-select" className="sort-label">
            Sắp xếp:
          </label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sắp xếp người dùng"
          >
            <option value="name-asc">Tên (A-Z)</option>
            <option value="name-desc">Tên (Z-A)</option>
            <option value="email-asc">Email (A-Z)</option>
            <option value="email-desc">Email (Z-A)</option>
            <option value="date-desc">Mới nhất</option>
            <option value="date-asc">Cũ nhất</option>
          </select>
        </div>
        
        <div className="pagination-info">
          <span className="pagination-text">
            Hiển thị <strong>{Math.min((currentPage - 1) * pageSize + 1, totalCount)}</strong>-
            <strong>{Math.min(currentPage * pageSize, totalCount)}</strong> / <strong>{totalCount}</strong>
          </span>
        </div>
        
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Trang trước"
          >
            ‹
          </button>
          <span className="pagination-current">
            {currentPage} / {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Trang sau"
          >
            ›
          </button>
        </div>
        
        <div className="page-size-dropdown">
          <label htmlFor="page-size-select" className="page-size-label">
            Mỗi trang:
          </label>
          <select
            id="page-size-select"
            className="page-size-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Số dòng mỗi trang"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TableToolbar;
