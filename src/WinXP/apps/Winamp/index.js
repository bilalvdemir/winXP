import React, { useEffect, useRef, useState } from 'react';
import Webamp from 'webamp';
import { initialTracks } from './config';

function Winamp({ onClose, onMinimize }) {
  const ref = useRef(null);
  const webamp = useRef(null);
  const [isReady, setIsReady] = useState(true);

  // Create butterchurn options
  const getButterchurnOptions = (startWithMilkdropHidden = true) => {
    return {
      importButterchurn: () => {
        console.log('Dynamic importing butterchurn...');
        return import(
          /* webpackChunkName: "butterchurn" */
          'butterchurn'
        );
      },
      importConvertPreset: () => {
        return import(
          /* webpackChunkName: "milkdrop-preset-converter" */
          'milkdrop-preset-converter-aws'
        );
      },
      presetConverterEndpoint:
        'https://p2tpeb5v8b.execute-api.us-east-2.amazonaws.com/default/milkdropShaderConverter',
      getPresets: async () => {
        console.log('Loading presets asynchronously...');
        try {
          // URL parametrelerini kontrol et
          if ('URLSearchParams' in window) {
            const params = new URLSearchParams(window.location.search);
            const butterchurnPresetUrlParam = params.get(
              'butterchurnPresetUrl',
            );
            const butterchurnPresetMapUrlParam = params.get(
              'butterchurnPresetMapUrl',
            );

            if (butterchurnPresetUrlParam || butterchurnPresetMapUrlParam) {
              console.log('URL parameters detected for presets');
              // URL parametreleri varsa bunları kullan
            }
          }

          // Default presets yükle
          const presets = await import(
            /* webpackChunkName: "butterchurn-presets" */
            'butterchurn-presets'
          );

          console.log('Presets imported successfully');

          // Object.entries kullanarak çalışan projedeki gibi
          const presetArray = Object.entries(
            presets.default || presets.getPresets(),
          ).map(([name, preset]) => {
            return {
              name: name.replace(/\.milk$/, ''),
              butterchurnPresetObject: preset,
            };
          });

          console.log(`Loaded ${presetArray.length} presets`);
          return presetArray.slice(0, 50); // İlk 50 preset
        } catch (error) {
          console.error('Error loading presets:', error);
          return [];
        }
      },
      butterchurnOpen: !startWithMilkdropHidden,
    };
  };

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    webamp.current = new Webamp({
      initialTracks,
      enableHotkeys: true,
      __butterchurnOptions: getButterchurnOptions(false),
      __initialWindowLayout: {
        main: { position: { x: 0, y: 0 } },
        equalizer: { position: { x: 0, y: 116 } },
        playlist: { position: { x: 0, y: 232 }, size: [0, 4] },
      },
      //   {
      //   importButterchurn: () => Promise.resolve(butterchurn),
      //   getPresets: () => {
      //     const presets = butterchurnPresets.getPresets();
      //     const presetKeys = Object.keys(presets);
      //     const presetArray = presetKeys.map(name => ({
      //       name,
      //       butterchurnPresetObject: presets[name],
      //     }));
      //     return Promise.resolve(presetArray);
      //   },
      //   butterchurnOpen: false,
      // },
    });

    webamp.current.renderWhenReady(target).then(() => {
      const webampElement = document.querySelector('#webamp');
      if (webampElement) {
        target.appendChild(webampElement);
      }
      setIsReady(true);

      // Force butterchurn to initialize properly
      setTimeout(() => {
        if (webamp.current && webamp.current._actionEmitter) {
          // Try to trigger butterchurn initialization
          const event = new CustomEvent('webamp-butterchurn-init');
          window.dispatchEvent(event);
        }
      }, 1000);
    });

    return () => {
      if (webamp.current) {
        webamp.current.dispose();
        webamp.current = null;
      }
      setIsReady(false);
    };
  }, []);

  useEffect(() => {
    if (webamp.current & isReady) {
      webamp.current.onClose(onClose);
      webamp.current.onMinimize(onMinimize);
    }
  }, [isReady, onClose, onMinimize]);

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
      }}
      ref={ref}
    />
  );
}

export default Winamp;
