import React, { useState } from 'react';
import './Tabs.css';

/**
 * Tabs component - Accessible tabbed interface
 * 
 * @param {Object} props - Component props
 * @param {Array} props.tabs - Array of tab objects: [{ id, label, icon?, content }]
 * @param {string} props.defaultTab - Default active tab ID
 * @param {Function} props.onChange - Callback when tab changes
 * @param {string} props.variant - Tab variant: 'default' | 'pills' | 'underline'
 */
const Tabs = ({
  tabs = [],
  defaultTab,
  onChange,
  variant = 'default'
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onChange) onChange(tabId);
  };

  const handleKeyDown = (e, tabId, index) => {
    let newIndex = index;
    
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    const newTabId = tabs[newIndex].id;
    handleTabChange(newTabId);
    
    // Focus the new tab button
    const tabButton = document.querySelector(`[data-tab-id="${newTabId}"]`);
    if (tabButton) tabButton.focus();
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="tabs">
      <div 
        className={`tabs__list tabs__list--${variant}`}
        role="tablist"
        aria-label="Profile sections"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const isDisabled = tab.disabled;
          
          return (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              className={`tabs__tab tabs__tab--${variant} ${isActive ? 'tabs__tab--active' : ''} ${isDisabled ? 'tabs__tab--disabled' : ''}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              aria-disabled={isDisabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !isDisabled && handleTabChange(tab.id)}
              onKeyDown={(e) => !isDisabled && handleKeyDown(e, tab.id, index)}
              disabled={isDisabled}
            >
              {tab.icon && (
                <span className="tabs__tab-icon">
                  {tab.icon}
                </span>
              )}
              <span className="tabs__tab-label">{tab.label}</span>
              {tab.badge && (
                <span className="tabs__tab-badge">{tab.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      <div
        className="tabs__panel"
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
      >
        {activeTabContent}
      </div>
    </div>
  );
};

export default Tabs;

