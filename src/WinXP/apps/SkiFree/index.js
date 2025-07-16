import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

function SkiFree() {
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

  return (
    <Container ref={containerRef}>
      <Header>
        <span>SkiFree</span>
        <div className="instructions">
          Use arrow keys or mouse to control the skier. Press F to go faster.
        </div>
      </Header>
      <IframeContainer>
        <iframe
          ref={iframeRef}
          src="https://basicallydan.github.io/skifree.js"
          title="SkiFree"
          frameBorder="0"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          referrerPolicy="no-referrer"
          loading="lazy"
          importance="high"
          allow="fullscreen"
          crossOrigin="anonymous"
        />
      </IframeContainer>
    </Container>
  );
}

const Header = styled.div`
  background: #f0f0f0;
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  font-family: 'Tahoma', sans-serif;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  .instructions {
    font-size: 10px;
    color: #666;
  }
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
  background: #fff;
  display: flex;
  flex-direction: column;
`;

export default SkiFree;
