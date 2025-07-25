import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

function MarioEmulator() {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && iframeRef.current) {
      const updateIframeSize = () => {
        if (containerRef.current && iframeRef.current) {
          const {
            width,
            height,
          } = containerRef.current.getBoundingClientRect();
          iframeRef.current.style.width = `${width}px`;
          iframeRef.current.style.height = `${height}px`;
        }
      };

      // Initial size update
      updateIframeSize();

      // Update size on window resize
      window.addEventListener('resize', updateIframeSize);

      // Add a small delay to ensure the iframe loads properly
      setTimeout(updateIframeSize, 500);

      return () => {
        window.removeEventListener('resize', updateIframeSize);
      };
    }
  }, []);

  // Public klasöründeki mario-emulator.html dosyasını kullan
  const gameUrl = '/winamp-xp/mario-emulator.html';

  return (
    <Container ref={containerRef}>
      <IframeContainer>
        <iframe
          ref={iframeRef}
          src={gameUrl}
          title="Super Mario Bros NES Emulator"
          frameBorder="0"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads"
          referrerPolicy="no-referrer"
          loading="lazy"
          importance="high"
          allow="fullscreen; autoplay; microphone; camera; cross-origin-isolated"
          crossOrigin="anonymous"
        />
      </IframeContainer>
    </Container>
  );
}
const IframeContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

export default MarioEmulator;
