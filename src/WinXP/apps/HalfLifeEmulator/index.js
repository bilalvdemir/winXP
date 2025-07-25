import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

function HalfLifeEmulator() {
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

  // Half-Life Deathmatch URL
  const gameUrl = 'https://x8bitrain.github.io/webXash/';

  return (
    <Container ref={containerRef}>
      <LoadingOverlay id="loading-overlay">
        <LoadingText>Half-Life Deathmatch yükleniyor...</LoadingText>
      </LoadingOverlay>
      <IframeContainer>
        <iframe
          ref={iframeRef}
          src={gameUrl}
          title="Half-Life Deathmatch"
          frameBorder="0"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads"
          referrerPolicy="no-referrer"
          loading="lazy"
          importance="high"
          allow="fullscreen; autoplay; microphone; camera; cross-origin-isolated"
          crossOrigin="anonymous"
          onLoad={() => {
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) {
              loadingOverlay.style.display = 'none';
            }
          }}
        />
      </IframeContainer>
    </Container>
  );
}

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingText = styled.div`
  color: #fff;
  font-size: 18px;
  font-family: 'Tahoma', sans-serif;
`;

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
  background: #000;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default HalfLifeEmulator;
