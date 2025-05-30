import React from 'react';
import DesktopIcon from './DesktopIcon';
// Paint file icon - basit bir paint brush ikonu
import iconSmall from './icons/paint-file-32x32.png';

const SkinIcon = ({ webamp, skin }) => {
  const handleOpen = () => {
    console.log(`Skin changed to: ${skin.name}`);

    // Webamp instance'ına skin uygula
    if (webamp && webamp.setSkinFromUrl) {
      webamp.setSkinFromUrl(skin.url);
    } else if (webamp && webamp.current && webamp.current.setSkinFromUrl) {
      webamp.current.setSkinFromUrl(skin.url);
    } else {
      console.warn('Webamp setSkinFromUrl method not available');
    }
  };

  return (
    <DesktopIcon
      iconUrl={iconSmall}
      name={`${skin.name}.wsz`}
      onOpen={handleOpen}
    />
  );
};

export default SkinIcon;
