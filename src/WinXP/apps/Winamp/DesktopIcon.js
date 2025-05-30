import React, { useState } from 'react';

const DesktopIcon = ({ iconUrl, name, onOpen }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 200);
  };

  const handleDoubleClick = () => {
    if (onOpen) {
      onOpen();
    }
  };

  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px',
        margin: '4px',
        cursor: 'pointer',
        userSelect: 'none',
        borderRadius: '4px',
        backgroundColor: isSelected ? 'rgba(0, 123, 255, 0.3)' : 'transparent',
        border: isSelected ? '1px dotted #007bff' : '1px solid transparent',
        minWidth: '80px',
        maxWidth: '100px',
        textAlign: 'center',
      }}
    >
      <img
        src={iconUrl}
        alt={name}
        style={{
          width: '32px',
          height: '32px',
          marginBottom: '4px',
        }}
        draggable={false}
      />
      <span
        style={{
          fontSize: '11px',
          color: '#000',
          wordWrap: 'break-word',
          textShadow: '1px 1px 1px rgba(255, 255, 255, 0.8)',
          lineHeight: '1.2',
        }}
      >
        {name}
      </span>
    </div>
  );
};

export default DesktopIcon;
