import React, { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/dashboard/HeroSection';
import StatsGrid from '../components/dashboard/StatsGrid';
import EnhancedEmptyState from '../components/dashboard/EnhancedEmptyState';
import UserTable from '../components/UserTable';
import UserFormModal from '../components/UserFormModal';
import './UsersPage.css';

/**
 * Main dashboard page for user management
 * Displays hero section, stats, and user table with CRUD operations
 */
const UsersPage = () => {
  const [reload, setReload] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleUserAdded = useCallback(() => {
    setReload(prev => !prev);
    setIsModalOpen(false);
  }, []);

  const handleEditUser = useCallback((user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingUser(null);
  }, []);

  const handleOpenModal = useCallback(() => {
    setEditingUser(null);
    setIsModalOpen(true);
  }, []);

  const handleUserCountChange = useCallback((count) => {
    setUserCount(count);
  }, []);

  const handleUsersChange = useCallback((usersList) => {
    setUsers(usersList);
    setIsLoading(false);
  }, []);

  const handleLearnMore = useCallback(() => {
    // Scroll to stats section or show info modal
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Bỏ qua đến nội dung chính
      </a>

      <Navbar
        userCount={userCount}
        onAddClick={handleOpenModal}
      />

      {/* Hero Section */}
      <HeroSection
        onAddUser={handleOpenModal}
        onLearnMore={handleLearnMore}
      />

      <main id="main-content" className="main-content">
        <div className="container">
          {/* Stats Grid with loading state */}
          {isLoading ? (
            <StatsGridSkeleton />
          ) : (
            <StatsGrid users={users} />
          )}

          {/* User Table or Empty State */}
          {!isLoading && userCount === 0 ? (
            <EnhancedEmptyState onAddUser={handleOpenModal} />
          ) : (
            <UserTable
              key={reload}
              onEditUser={handleEditUser}
              onUserCountChange={handleUserCountChange}
              onUsersChange={handleUsersChange}
            />
          )}
        </div>
      </main>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingUser={editingUser}
        onSuccess={handleUserAdded}
      />
    </>
  );
};

/**
 * Skeleton loading component for Stats Grid
 * Displays placeholder cards while data is being fetched
 */
const StatsGridSkeleton = () => {
  return (
    <div className="stats-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="stats-card stats-card-skeleton">
          <div className="skeleton-header">
            <div className="skeleton-title"></div>
          </div>
          <div className="skeleton-value"></div>
          <div className="skeleton-icon"></div>
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
