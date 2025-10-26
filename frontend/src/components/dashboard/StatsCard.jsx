import React, { useState, useEffect } from 'react';
import './StatsCard.css';

/**
 * Stats Card component with animated counter
 * Displays a metric with icon, value, and optional trend indicator
 */
const StatsCard = ({
  title,
  value,
  icon,
  gradient = 'gradient-1',
  trend = null, // { value: '+12%', isPositive: true }
  delay = 0
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Animated counter effect using requestAnimationFrame for better performance
  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1000, 1);

      setDisplayValue(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value]);

  const trendLabel = trend
    ? `${trend.isPositive ? 'Tăng' : 'Giảm'} ${trend.value}`
    : '';

  return (
    <div
      className={`stats-card stats-card-${gradient}`}
      style={{ animationDelay: `${delay}ms` }}
      role="region"
      aria-label={`${title}: ${value}${trendLabel ? `, ${trendLabel}` : ''}`}
      tabIndex="0"
    >
      <div className="stats-card-content">
        <div className="stats-card-header">
          <h3 className="stats-card-title">{title}</h3>
          {trend && (
            <span
              className={`stats-card-trend ${trend.isPositive ? 'positive' : 'negative'}`}
              aria-label={trendLabel}
            >
              {trend.value}
            </span>
          )}
        </div>

        <div className="stats-card-value-wrapper">
          <span className="stats-card-value" aria-live="polite">
            {displayValue.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="stats-card-icon" aria-hidden="true">
        {icon}
      </div>

      {/* Decorative gradient overlay */}
      <div className="stats-card-overlay" aria-hidden="true"></div>
    </div>
  );
};

export default StatsCard;

