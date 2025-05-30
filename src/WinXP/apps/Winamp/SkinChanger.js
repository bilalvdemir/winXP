import React, { useEffect } from 'react';

// Skin Changer Component - Sadece skin değiştirmek için kullanılır
const SkinChanger = ({ skinUrl, skinName, onClose }) => {
  useEffect(() => {
    // Winamp instance'ını bul ve skin'i değiştir
    const changeWinampSkin = () => {
      console.log(`Changing Winamp skin to: ${skinName}`);

      // Global webamp instance'ı ara
      if (window.webamp && window.webamp.setSkinFromUrl) {
        window.webamp.setSkinFromUrl(skinUrl);
        console.log(`✅ Skin changed to: ${skinName}`);
      } else {
        // DOM'da webamp elementini ara
        const webampElement = document.querySelector('#webamp');
        if (webampElement && webampElement._webamp) {
          webampElement._webamp.setSkinFromUrl(skinUrl);
          console.log(`✅ Skin changed to: ${skinName}`);
        } else {
          // Webamp henüz yüklenmemiş olabilir, biraz bekleyip tekrar dene
          setTimeout(() => {
            if (window.webamp && window.webamp.setSkinFromUrl) {
              window.webamp.setSkinFromUrl(skinUrl);
              console.log(`✅ Skin changed to: ${skinName} (delayed)`);
            } else {
              console.warn('❌ Webamp instance not found');
            }
          }, 1000);
        }
      }
    };

    changeWinampSkin();

    // Skin değiştirildikten sonra pencereyi kapat
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 100);
  }, [skinUrl, skinName, onClose]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0078d4, #106ebe)',
        color: 'white',
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '12px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '10px' }}>🎨</div>
        <div>Applying skin:</div>
        <div style={{ fontWeight: 'bold', marginTop: '5px' }}>{skinName}</div>
      </div>
    </div>
  );
};

export default SkinChanger;