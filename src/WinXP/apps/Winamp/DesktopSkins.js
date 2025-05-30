import React from 'react';
import SkinIcon from './SkinIcon';
import { availableSkins } from './availableSkins';

const DesktopSkins = ({ webamp, show = true }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(192, 192, 192, 0.9)',
        border: '2px outset #c0c0c0',
        borderRadius: '4px',
        padding: '10px',
        maxHeight: '70vh',
        overflowY: 'auto',
        zIndex: 1002,
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div
        style={{
          fontSize: '12px',
          fontWeight: 'bold',
          marginBottom: '10px',
          textAlign: 'center',
          color: '#000',
          borderBottom: '1px solid #999',
          paddingBottom: '5px',
        }}
      >
        Available Skins
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
          gap: '5px',
          maxWidth: '300px',
        }}
      >
        {availableSkins.map((skin, index) => (
          <SkinIcon key={index} webamp={webamp} skin={skin} />
        ))}
      </div>
    </div>
  );
};

export default DesktopSkins;
