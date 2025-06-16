import React, { useEffect, useRef, useState } from 'react';
import Webamp from 'webamp';
import { initialTracks } from './config';
import DesktopSkins from './DesktopSkins';
import { availableSkins } from './availableSkins';

// Çalışan projedeki regex patterns
const KNOWN_PRESET_URLS_REGEXES = [
  /^https:\/\/unpkg\.com\/butterchurn-presets\/.*\.json$/,
  /^https:\/\/unpkg\.com\/butterchurn-presets-weekly\/.*\.json$/,
  /^https:\/\/archive\.org\/cors\/md_.*\.json$/,
  /^https:\/\/s3-us-east-2\.amazonaws\.com\/butterchurn-presets\/.*\.json$/,
];
// Safari detection utility
const isSafari = () => {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent;
  const isSafariUA =
    /Safari/.test(userAgent) &&
    !/Chrome/.test(userAgent) &&
    !/Chromium/.test(userAgent);

  return isSafariUA;
};

// Enhanced localStorage wrapper with Safari polling support
const createStorageWrapper = () => {
  if (typeof window === 'undefined') return;

  const originalSetItem = localStorage.setItem;
  const isSafariBrowser = isSafari();

  localStorage.setItem = function(key, value) {
    const oldValue = this.getItem(key);
    originalSetItem.apply(this, arguments);

    // Custom event dispatch for all browsers
    window.dispatchEvent(
      new CustomEvent('localStorageChange', {
        detail: { key, newValue: value, oldValue },
      }),
    );

    // Safari-specific: Also store in a temporary object for polling
    if (isSafariBrowser) {
      if (!window._safariLocalStorageCache) {
        window._safariLocalStorageCache = {};
      }
      window._safariLocalStorageCache[key] = value;
    }
  };
};

// Enhanced custom hook with Safari polling
function useLocalStorageListener(key) {
  const [value, setValue] = useState(() => localStorage.getItem(key));
  const isSafariBrowser = isSafari();
  const pollingIntervalRef = useRef(null);
  const lastKnownValueRef = useRef(localStorage.getItem(key));

  useEffect(() => {
    // Standard event listeners for non-Safari browsers
    const handleStorageChange = e => {
      if (e.key === key) {
        setValue(e.newValue);
        lastKnownValueRef.current = e.newValue;
      }
    };

    const handleCustomStorage = e => {
      if (e.detail.key === key) {
        setValue(e.detail.newValue);
        lastKnownValueRef.current = e.detail.newValue;
      }
    };

    // Safari polling mechanism
    const startSafariPolling = () => {
      if (!isSafariBrowser) return;

      console.log(`🍎 Starting Safari localStorage polling for key: ${key}`);

      pollingIntervalRef.current = setInterval(() => {
        try {
          console.log(
            `🍎 Checking Safari localStorage polling for key: ${key}`,
          );
          const currentValue = localStorage.getItem(key);
          const lastValue = lastKnownValueRef.current;

          // Check if value has changed
          if (currentValue !== lastValue) {
            console.log(`🔄 Safari polling detected change for ${key}:`, {
              old: lastValue,
              new: currentValue,
            });

            setValue(currentValue);
            lastKnownValueRef.current = currentValue;
          }
        } catch (error) {
          console.error('Safari localStorage polling error:', error);
        }
      }, 1000); // 1000ms interval as requested
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleCustomStorage);

    // Start Safari polling if needed
    if (isSafariBrowser) {
      startSafariPolling();
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorage);

      // Clean up Safari polling
      if (pollingIntervalRef.current) {
        console.log(`🛑 Stopping Safari localStorage polling for key: ${key}`);
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [key, isSafariBrowser]);

  // Update ref when value changes from external sources
  useEffect(() => {
    lastKnownValueRef.current = value;
  }, [value]);

  return value;
}

// App başlangıcında wrapper'ı initialize et
if (typeof window !== 'undefined' && !window.storageWrapperInitialized) {
  createStorageWrapper();
  window.storageWrapperInitialized = true;

  // Log Safari detection
  if (isSafari()) {
    console.log('🍎 Safari detected - localStorage polling enabled');
  } else {
    console.log('🌐 Non-Safari browser - using standard localStorage events');
  }
}

function presetNameFromURL(url) {
  try {
    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const presetName = lastPart.substring(0, lastPart.length - 5);
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
  const [showSkins, setShowSkins] = useState(true);

  const getButterchurnOptions = (startWithMilkdropHidden = false) => {
    // Geçici olarak Butterchurn'ü devre dışı bırak
    const DISABLE_BUTTERCHURN = false; // true yaparak tamamen kapatabilirsin

    if (DISABLE_BUTTERCHURN) {
      console.log('🚫 Butterchurn disabled for debugging');
      return null; // Butterchurn olmadan çalıştır
    }

    return {
      importButterchurn: () => {
        console.log('Dynamic importing butterchurn...');
        return import('butterchurn');
      },
      importConvertPreset: () => {
        console.log('Importing preset converter...');
        return import('milkdrop-preset-converter-aws');
      },
      presetConverterEndpoint:
        'https://p2tpeb5v8b.execute-api.us-east-2.amazonaws.com/default/milkdropShaderConverter',
      getPresets: async () => {
        console.log('🔄 Loading presets asynchronously...');

        // URL parameter handling
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
          // Default presets yükle
          const presets = await import('butterchurn-presets');
          console.log('📦 Presets imported successfully');

          // Güvenli preset listesi - bilinen çalışan preset'ler
          const safePresets = [
            'Geiss - Reaction Diffusion 2', //gözeneklere hücrelere dalan
            'Geiss - Thumb Drum', // mürekkep
            'martin - acid wiring', // çember çizgi dalgalı
            'martin - angel flight', // parıltılı aynalı oda
            'martin - chain breaker', // havai fişek
            'martin - disco mix 4', // neon koridorda süzül
            // 'martin - fruit machine', // eski ama çok durgun dandik
            'Flexi - alien fish pond', // balıklar
            'Flexi - area 51', // 3d bir görsel içinde dönüyor
            'Flexi - mindblob mix', // kırmızı mavili ebru sanatı gibi
            '_Geiss - Artifact 01', // resim paletinde fırtına
            'Rovastar - Oozing Resistance', // rgb ying yang
            'Zylot - Star Ornament', // en bilinen 3 lü dönen içgen
          ];

          // KRITIK: Sadece güvenli preset'leri yükle
          const presetArray = Object.entries(presets.default)
            .map(([name, preset]) => {
              try {
                // Sadece güvenli listede olan preset'leri al
                // if (!safePresets.includes(name)) {
                //   return null;
                // }

                console.log(`✅ Loading safe preset: ${name}`);
                return {
                  name,
                  butterchurnPresetObject: preset,
                };
              } catch (error) {
                console.error(`❌ Error processing preset ${name}:`, error);
                return null;
              }
            })
            .filter(Boolean);

          console.log(
            `✅ Loaded ${presetArray.length} safe presets out of ${
              Object.keys(presets.default).length
            } total`,
          );

          return presetArray;
        } catch (error) {
          console.error('❌ Error loading presets:', error);
          return [];
        }
      },
      butterchurnOpen: !startWithMilkdropHidden,
    };
  };

  // Milkdrop pencerelerini yeniden konumlandır
  const repositionMilkdropWindows = () => {
    console.log('🔄 Repositioning milkdrop windows...');

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
          element.style.zIndex = '1001';
          console.log('✅ Milkdrop window repositioned');
        }
      });
    });

    // Canvas elementlerini de kontrol et
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
      if (canvas.width > 200 && canvas.height > 150) {
        const parent = canvas.closest('.webamp-window') || canvas.parentElement;
        if (parent && !parent.querySelector('.webamp-main')) {
          parent.style.zIndex = '1001';
          console.log('✅ Canvas parent repositioned');
        }
      }
    });
  };

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    console.log('🚀 Creating Webamp instance with validated presets...');

    webamp.current = new Webamp({
      initialTracks,
      enableHotkeys: true,
      availableSkins, // Skin listesini Webamp'a ekle
      __butterchurnOptions: getButterchurnOptions(false),
      __initialWindowLayout: {
        main: { position: { x: 0, y: 0 } },
        equalizer: { position: { x: 0, y: 116 } },
        playlist: { position: { x: 0, y: 232 }, size: [0, 8] },
        milkdrop: {
          position: { x: 275, y: 0 },
          size: [4, 8],
        },
      },
    });

    webamp.current
      .renderWhenReady(target)
      .then(() => {
        console.log('✅ Webamp rendered successfully');
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
        console.error('❌ Error rendering Webamp:', error);
      });

    return () => {
      if (webamp.current) {
        try {
          webamp.current.dispose();
        } catch (error) {
          console.error('❌ Error disposing Webamp:', error);
        }
        webamp.current = null;
      }
      setIsReady(false);
    };
  }, []);

  const skinUrl = useLocalStorageListener('winampSkinUrl');

  useEffect(() => {
    if (webamp.current && isReady && skinUrl) {
      webamp.current.setSkinFromUrl(skinUrl);
    }
  }, [skinUrl, isReady]);

  useEffect(() => {
    if (webamp.current && isReady) {
      const skinUrl = localStorage.getItem('winampSkinUrl');
      if (skinUrl) {
        webamp.current.setSkinFromUrl(skinUrl);
      }
    }
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

  // Keyboard shortcut for toggling skins panel
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        setShowSkins(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

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

      {/* Desktop Skins Panel */}
      {isReady && <DesktopSkins webamp={webamp} show={showSkins} />}

      {/* Toggle Button for Skins Panel */}
      {isReady && (
        <button
          onClick={() => setShowSkins(prev => !prev)}
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 1003,
            background: '#c0c0c0',
            border: '2px outset #c0c0c0',
            padding: '5px 10px',
            fontSize: '12px',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
        >
          {showSkins ? 'Hide Skins' : 'Show Skins'}
        </button>
      )}

      {/* Milkdrop positioning için global CSS */}
      <style>{`
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

        /* Desktop icon hover effects */
        .desktop-icon:hover {
          background-color: rgba(0, 123, 255, 0.1) !important;
        }

        .desktop-icon.selected {
          background-color: rgba(0, 123, 255, 0.3) !important;
          border: 1px dotted #007bff !important;
        }
      `}</style>
    </>
  );
}

export default Winamp;
