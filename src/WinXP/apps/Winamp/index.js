import React, { useEffect, useRef, useState } from 'react';
import Webamp from 'webamp';
import { initialTracks } from './config';

// Çalışan projedeki regex patterns
const KNOWN_PRESET_URLS_REGEXES = [
  /^https:\/\/unpkg\.com\/butterchurn-presets\/.*\.json$/,
  /^https:\/\/unpkg\.com\/butterchurn-presets-weekly\/.*\.json$/,
  /^https:\/\/archive\.org\/cors\/md_.*\.json$/,
  /^https:\/\/s3-us-east-2\.amazonaws\.com\/butterchurn-presets\/.*\.json$/,
];

function presetNameFromURL(url) {
  try {
    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const presetName = lastPart.substring(0, lastPart.length - 5); // remove .milk or .json
    return decodeURIComponent(presetName);
  } catch (e) {
    console.error(e);
    return url;
  }
}

async function loadButterchurnPresetMapURL(url) {
  const resp = await fetch(url);
  const namesToPresetUrls = await resp.json();
  return Object.keys(namesToPresetUrls).map(name => {
    return { name, butterchurnPresetUrl: namesToPresetUrls[name] };
  });
}

function Winamp({ onClose, onMinimize }) {
  const ref = useRef(null);
  const webamp = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Çalışan projedeki exact implementation
  const getButterchurnOptions = (startWithMilkdropHidden = false) => {
    return {
      importButterchurn: () => {
        console.log('Dynamic importing butterchurn...');
        return import(
          /* webpackChunkName: "butterchurn" */
          'butterchurn'
        );
      },
      importConvertPreset: () => {
        console.log('Importing preset converter...');
        return import(
          /* webpackChunkName: "milkdrop-preset-converter" */
          'milkdrop-preset-converter-aws'
        );
      },
      presetConverterEndpoint:
        'https://p2tpeb5v8b.execute-api.us-east-2.amazonaws.com/default/milkdropShaderConverter',
      getPresets: async () => {
        console.log('Loading presets asynchronously...');

        // URL parameter handling (çalışan projedeki gibi)
        if ('URLSearchParams' in window) {
          const params = new URLSearchParams(window.location.search);
          const butterchurnPresetUrlParam = params.get('butterchurnPresetUrl');
          const butterchurnPresetMapUrlParam = params.get(
            'butterchurnPresetMapUrl',
          );
          const milkdropPresetUrl = params.get('milkdropPresetUrl');

          if (butterchurnPresetMapUrlParam) {
            if (
              !KNOWN_PRESET_URLS_REGEXES.some(pattern =>
                pattern.test(butterchurnPresetMapUrlParam),
              )
            ) {
              console.error(
                'Unsupported URL passed as butterchurnPresetMapUrl query param.',
              );
            } else {
              return loadButterchurnPresetMapURL(butterchurnPresetMapUrlParam);
            }
          } else if (butterchurnPresetUrlParam) {
            if (
              !KNOWN_PRESET_URLS_REGEXES.some(pattern =>
                pattern.test(butterchurnPresetUrlParam),
              )
            ) {
              console.error(
                'Unsupported URL passed as butterchurnPresetUrl query param.',
              );
            } else {
              return [
                {
                  name: presetNameFromURL(butterchurnPresetUrlParam),
                  butterchurnPresetUrl: butterchurnPresetUrlParam,
                },
              ];
            }
          } else if (milkdropPresetUrl) {
            throw new Error('We still need to implement this');
          }
        }

        try {
          // Default presets yükle - AYNEN çalışan projedeki gibi
          const presets = await import(
            /* webpackChunkName: "butterchurn-presets" */
            'butterchurn-presets'
          );

          console.log('Presets imported successfully');

          // CRITICAL: Çalışan projedeki exact mapping
          const presetArray = Object.entries(presets.default).map(
            ([name, preset]) => {
              return {
                name,
                butterchurnPresetObject: preset,
              };
            },
          );

          console.log(`Loaded ${presetArray.length} presets`);

          // TÜM preset'leri döndür, limit koyma!
          return presetArray;
        } catch (error) {
          console.error('Error loading presets:', error);
          return [];
        }
      },
      butterchurnOpen: !startWithMilkdropHidden,
    };
  };

  // Milkdrop pencerelerini yeniden konumlandır
  const repositionMilkdropWindows = () => {
    console.log('Repositioning milkdrop windows...');

    const selectors = [
      '[data-title*="ilkdrop"]',
      '[class*="milkdrop"]',
      '[class*="butterchurn"]',
      '[class*="visualizer"]',
      '.webamp-window[data-title*="Milkdrop"]',
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element) {
          element.style.position = 'fixed';
          element.style.left = '450px';
          element.style.top = '50px';
          element.style.zIndex = '1001';
          console.log('Milkdrop window repositioned');
        }
      });
    });

    // Canvas elementlerini de kontrol et
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
      if (canvas.width > 200 && canvas.height > 150) {
        const parent = canvas.closest('.webamp-window') || canvas.parentElement;
        if (parent && !parent.querySelector('.webamp-main')) {
          parent.style.position = 'fixed';
          parent.style.left = '450px';
          parent.style.top = '50px';
          parent.style.zIndex = '1001';
          console.log('Canvas parent repositioned');
        }
      }
    });
  };

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    console.log('Creating Webamp instance with full preset support...');

    webamp.current = new Webamp({
      initialTracks,
      enableHotkeys: true,
      __butterchurnOptions: getButterchurnOptions(false), // Başlangıçta açık
      __initialWindowLayout: {
        main: { position: { x: 50, y: 50 } },
        equalizer: { position: { x: 50, y: 166 } },
        playlist: { position: { x: 50, y: 282 }, size: [0, 4] },
        milkdrop: {
          position: { left: 0, top: 348 },
        },
      },
    });

    webamp.current
      .renderWhenReady(target)
      .then(() => {
        console.log('Webamp rendered successfully');
        const webampElement = document.querySelector('#webamp');
        if (webampElement) {
          target.appendChild(webampElement);
        }
        setIsReady(true);

        // Positioning delay
        setTimeout(() => {
          repositionMilkdropWindows();
        }, 1500);
      })
      .catch(error => {
        console.error('Error rendering Webamp:', error);
      });

    return () => {
      if (webamp.current) {
        try {
          webamp.current.dispose();
        } catch (error) {
          console.error('Error disposing Webamp:', error);
        }
        webamp.current = null;
      }
      setIsReady(false);
    };
  }, []);

  useEffect(() => {
    if (webamp.current && isReady) {
      webamp.current.onClose(onClose);
      webamp.current.onMinimize(onMinimize);
    }
  }, [isReady, onClose, onMinimize]);

  // MutationObserver ile dinamik elementleri takip et
  useEffect(() => {
    if (!isReady) return;

    const observer = new MutationObserver(mutations => {
      let shouldReposition = false;

      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            const isMilkdropElement =
              node.getAttribute &&
              (node
                .getAttribute('data-title')
                ?.toLowerCase()
                .includes('milkdrop') ||
                node.className?.includes('milkdrop') ||
                node.className?.includes('butterchurn'));

            if (
              isMilkdropElement ||
              node.querySelector?.('canvas[width][height]')
            ) {
              shouldReposition = true;
            }
          }
        });
      });

      if (shouldReposition) {
        setTimeout(repositionMilkdropWindows, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [isReady]);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          pointerEvents: 'none',
        }}
        ref={ref}
      />

      {/* Milkdrop positioning için global CSS */}
      <style jsx global>{`
        /* Milkdrop window styling */
        [data-title*='ilkdrop'],
        [class*='milkdrop'],
        [class*='butterchurn'],
        [class*='visualizer'] {
          position: fixed !important;
          left: 450px !important;
          top: 50px !important;
          z-index: 1001 !important;
        }

        /* Canvas için styling */
        canvas[width][height] {
          background: #000 !important;
          display: block !important;
        }

        /* Webamp pointer events */
        #webamp * {
          pointer-events: auto !important;
        }

        /* Milkdrop window border */
        .webamp-window[data-title*='Milkdrop'] {
          border: 2px outset #c0c0c0 !important;
          background: #c0c0c0 !important;
        }
      `}</style>
    </>
  );
}

export default Winamp;
