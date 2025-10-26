import React, { useMemo } from 'react';
import StatsCard from './StatsCard';
import './StatsGrid.css';

const StatsGrid = ({ users = [] }) => {
  // Calculate stats from users array
  const stats = useMemo(() => {
    const total = users.length;
    
    // Count admin users (assuming users have a 'role' property)
    const adminCount = users.filter(user => user.role === 'admin').length;
    
    // Active users (for demo, we'll consider all users as active)
    // In real app, this would check last login time
    const activeCount = total;
    
    // New users today (for demo, we'll use a percentage)
    // In real app, this would check createdAt date
    const newToday = Math.floor(total * 0.1); // 10% of total as demo

    return {
      total,
      active: activeCount,
      admin: adminCount,
      newToday
    };
  }, [users]);

  const statsData = [
    {
      title: 'Tổng người dùng',
      value: stats.total,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      gradient: 'gradient-1',
      trend: stats.total > 0 ? { value: '+12%', isPositive: true } : null
    },
    {
      title: 'Đang hoạt động',
      value: stats.active,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
      gradient: 'gradient-2',
      trend: stats.active > 0 ? { value: '+8%', isPositive: true } : null
    },
    {
      title: 'Quản trị viên',
      value: stats.admin,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      gradient: 'gradient-3',
      trend: null
    },
    {
      title: 'Mới hôm nay',
      value: stats.newToday,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <line x1="20" y1="8" x2="20" y2="14"/>
          <line x1="23" y1="11" x2="17" y2="11"/>
        </svg>
      ),
      gradient: 'gradient-4',
      trend: stats.newToday > 0 ? { value: '+5', isPositive: true } : null
    }
  ];

  return (
    <div className="stats-grid">
      {statsData.map((stat, index) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          gradient={stat.gradient}
          trend={stat.trend}
          delay={index * 100}
        />
      ))}
    </div>
  );
};

export default StatsGrid;

