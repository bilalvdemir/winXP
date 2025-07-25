// Emulator Controls Component
class EmulatorControls {
  constructor() {
    this.createControlsElement();
  }

  createControlsElement() {
    // CSS stillerini ekle
    this.addStyles();
    
    // Controls elementini oluştur
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'emulator-controls';
    controlsDiv.innerHTML = this.getControlsHTML();
    
    // Body'ye ekle
    document.body.appendChild(controlsDiv);
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .emulator-controls {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px;
        border-radius: 8px;
        font-size: 12px;
        z-index: 1000;
        cursor: pointer;
        transition: all 0.3s ease;
        max-width: 200px;
      }

      .emulator-controls:hover {
        background: rgba(0, 0, 0, 0.95);
        transform: scale(1.05);
      }

      .emulator-controls-tooltip {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        background: rgba(0, 0, 0, 0.95);
        color: white;
        padding: 15px;
        border-radius: 8px;
        font-size: 11px;
        z-index: 1001;
        width: 320px;
        margin-top: 5px;
        border: 1px solid #333;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
      }

      .console-image {
        width: 100%;
        max-width: 280px;
        height: auto;
        margin-bottom: 15px;
        border-radius: 5px;
        border: 1px solid #444;
      }

      .emulator-controls:hover .emulator-controls-tooltip {
        display: block;
      }

      .control-section {
        margin-bottom: 12px;
      }

      .control-section h4 {
        margin: 0 0 6px 0;
        color: #ffd700;
        font-size: 12px;
        border-bottom: 1px solid #444;
        padding-bottom: 2px;
      }

      .control-item {
        display: flex;
        justify-content: space-between;
        margin: 3px 0;
        font-size: 10px;
      }

      .control-key {
        font-weight: bold;
        color: #87ceeb;
        min-width: 80px;
      }

      .control-desc {
        color: #ddd;
      }
    `;
    document.head.appendChild(style);
  }

  getControlsHTML() {
    return `
      <strong>🎮 Kontroller</strong>
      <div class="emulator-controls-tooltip">
        <img src="./console.webp" alt="NES Controller" class="console-image" />
        <div class="control-section">
          <h4>🕹️ Oyun Kontrolleri</h4>
          <div class="control-item">
            <span class="control-key">←↑↓→</span>
            <span class="control-desc">Hareket</span>
          </div>
          <div class="control-item">
            <span class="control-key">Z</span>
            <span class="control-desc">X Düğmesi (Zıplama)</span>
          </div>
          <div class="control-item">
            <span class="control-key">X</span>
            <span class="control-desc">O Düğmesi (Koşma/Ateş)</span>
          </div>
          <div class="control-item">
            <span class="control-key">A</span>
            <span class="control-desc">▢ Düğmesi (Kare)</span>
          </div>
          <div class="control-item">
            <span class="control-key">S</span>
            <span class="control-desc">△ Düğmesi (Üçgen)</span>
          </div>
          <div class="control-item">
            <span class="control-key">Enter</span>
            <span class="control-desc">Start</span>
          </div>
          <div class="control-item">
            <span class="control-key">V</span>
            <span class="control-desc">Select</span>
          </div>
        </div>
        
        <div class="control-section">
          <h4>🎯 Omuz Düğmeleri</h4>
          <div class="control-item">
            <span class="control-key">Q</span>
            <span class="control-desc">Sol Üst (L)</span>
          </div>
          <div class="control-item">
            <span class="control-key">E</span>
            <span class="control-desc">Sağ Üst (R)</span>
          </div>
          <div class="control-item">
            <span class="control-key">Tab</span>
            <span class="control-desc">Sol Alt (L2)</span>
          </div>
          <div class="control-item">
            <span class="control-key">R</span>
            <span class="control-desc">Sağ Alt (R2)</span>
          </div>
        </div>

        <div class="control-section">
          <h4>💾 Emülatör Kontrolleri</h4>
          <div class="control-item">
            <span class="control-key">1</span>
            <span class="control-desc">Hızlı Kaydet</span>
          </div>
          <div class="control-item">
            <span class="control-key">2</span>
            <span class="control-desc">Hızlı Yükle</span>
          </div>
          <div class="control-item">
            <span class="control-key">3</span>
            <span class="control-desc">Kayıt Slotu Değiştir</span>
          </div>
          <div class="control-item">
            <span class="control-key">+</span>
            <span class="control-desc">Hızlı İleri Sar</span>
          </div>
          <div class="control-item">
            <span class="control-key">Space</span>
            <span class="control-desc">Yavaş Hareket</span>
          </div>
          <div class="control-item">
            <span class="control-key">-</span>
            <span class="control-desc">Geri Sar</span>
          </div>
        </div>

        <div class="control-section">
          <h4>🕹️ Analog Çubuklar</h4>
          <div class="control-item">
            <span class="control-key">TFGH</span>
            <span class="control-desc">Sol Analog</span>
          </div>
          <div class="control-item">
            <span class="control-key">IJKL</span>
            <span class="control-desc">Sağ Analog</span>
          </div>
        </div>
      </div>
    `;
  }
}

// Component'i otomatik olarak başlat
document.addEventListener('DOMContentLoaded', function() {
  new EmulatorControls();
});
