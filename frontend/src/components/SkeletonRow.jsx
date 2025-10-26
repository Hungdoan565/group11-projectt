import React from 'react';
import './SkeletonRow.css';

const SkeletonRow = () => {
  return (
    <tr className="skeleton-row">
      <td>
        <div className="skeleton skeleton-avatar"></div>
      </td>
      <td>
        <div className="skeleton skeleton-text skeleton-text-long"></div>
      </td>
      <td>
        <div className="skeleton skeleton-text skeleton-text-medium"></div>
      </td>
      <td>
        <div className="skeleton-actions">
          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </td>
    </tr>
  );
};

export default SkeletonRow;
