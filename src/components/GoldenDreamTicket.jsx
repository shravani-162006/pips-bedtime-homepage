import React, { useState, useRef, useEffect } from 'react';
import { soundFx } from '../utils/audio';

export default function GoldenDreamTicket() {
  const [dreamerName, setDreamerName] = useState('Little Dreamer');
  const [dreamClass, setDreamClass] = useState('First Class Cosmic Slumber');
  const [dreamDestination, setDreamDestination] = useState('Cloud Sector 7 (Star Hammock Valley)');
  const [ticketId, setTicketId] = useState('PIP-2026-9874');
  const [isStamped, setIsStamped] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const canvasRef = useRef(null);

  // Generate unique ticket number on load
  useEffect(() => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setTicketId(`PIP-2026-${randomDigits}`);
  }, []);

  // Draw crisp high-res 2x canvas for download
  const renderCanvasTicket = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 1000;
    const height = 480;

    canvas.width = width;
    canvas.height = height;

    // Background Gradient: Deep Midnight Indigo to Gold Accent
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#120f2e');
    bgGrad.addColorStop(0.5, '#1e1948');
    bgGrad.addColorStop(1, '#2c1e4a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Golden metallic border
    ctx.strokeStyle = '#f5c542';
    ctx.lineWidth = 8;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    // Inner thin border
    ctx.strokeStyle = '#ffd875';
    ctx.lineWidth = 2;
    ctx.strokeRect(26, 26, width - 52, height - 52);

    // Perforation vertical divider
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = '#ffd875';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(760, 26);
    ctx.lineTo(760, height - 26);
    ctx.stroke();
    ctx.setLineDash([]);

    // Header Tagline
    ctx.fillStyle = '#ffd875';
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.fillText('★ THE MIDNIGHT NURSERY · OFFICIAL BOARDING PASS ★', 48, 58);

    // Main Ticket Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px "Trebuchet MS", sans-serif';
    ctx.fillText("PIP'S GOLDEN DREAM TICKET", 48, 102);

    ctx.fillStyle = '#c4b5fd';
    ctx.font = 'italic 16px "Georgia", serif';
    ctx.fillText('"I build the dreams you fall asleep inside" — Pip, Dream Engineer', 48, 128);

    // Divider Line
    ctx.strokeStyle = 'rgba(245, 197, 66, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(48, 146);
    ctx.lineTo(720, 146);
    ctx.stroke();

    // Passenger / Dreamer Name
    ctx.fillStyle = '#ffd875';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText('PASSENGER / DREAMER:', 48, 185);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "Georgia", serif';
    ctx.fillText(dreamerName || 'Little Dreamer', 48, 222);

    // Dream Class
    ctx.fillStyle = '#ffd875';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText('SLUMBER CLASS:', 48, 268);

    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 20px "Trebuchet MS", sans-serif';
    ctx.fillText(dreamClass, 48, 298);

    // Destination
    ctx.fillStyle = '#ffd875';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText('DESTINATION:', 380, 268);

    ctx.fillStyle = '#e9d5ff';
    ctx.font = 'bold 18px "Trebuchet MS", sans-serif';
    ctx.fillText(dreamDestination, 380, 298);

    // Seat & Gate
    ctx.fillStyle = '#ffd875';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText('SEAT: STAR-01   |   GATE: MOONBEAM-A   |   FLIGHT: 98-DREAM', 48, 350);

    // Official Wax Stamp Circle on the left
    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(620, 205, 52, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
    ctx.fill();

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 11px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MIDNIGHT NURSERY', 620, 185);
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('💤', 620, 212);
    ctx.font = 'bold 11px "Courier New", monospace';
    ctx.fillText('APPROVED SLUMBER', 620, 232);
    ctx.restore();

    // Barcode Simulation (Left section footer)
    ctx.fillStyle = '#ffffff';
    const barcodeStartX = 48;
    const barcodeY = 385;
    const barWidths = [3, 1, 4, 2, 1, 5, 2, 3, 1, 4, 2, 6, 2, 1, 4, 2, 3, 5, 2, 1, 3, 2, 4, 1, 5, 2];
    let currX = barcodeStartX;
    for (let i = 0; i < 40; i++) {
      const w = barWidths[i % barWidths.length];
      ctx.fillRect(currX, barcodeY, w, 40);
      currX += w + 3;
    }
    ctx.font = '12px "Courier New", monospace';
    ctx.fillText(ticketId, 48, 442);

    // --- RIGHT COUPON STUB ---
    ctx.fillStyle = '#ffd875';
    ctx.font = 'bold 15px "Courier New", monospace';
    ctx.fillText('STUB / TEAR OFF', 790, 58);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "Trebuchet MS", sans-serif';
    ctx.fillText('NURSERY FLIGHT', 790, 95);

    ctx.fillStyle = '#c4b5fd';
    ctx.font = '13px "Courier New", monospace';
    ctx.fillText('NAME:', 790, 140);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Georgia", serif';
    ctx.fillText((dreamerName || 'Dreamer').slice(0, 15), 790, 165);

    ctx.fillStyle = '#c4b5fd';
    ctx.font = '13px "Courier New", monospace';
    ctx.fillText('CLASS:', 790, 205);
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 14px "Trebuchet MS", sans-serif';
    ctx.fillText('FIRST CLASS', 790, 228);

    ctx.fillStyle = '#c4b5fd';
    ctx.font = '13px "Courier New", monospace';
    ctx.fillText('TICKET ID:', 790, 270);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText(ticketId, 790, 292);

    // Mini QR / Stamp box on stub
    ctx.strokeStyle = '#ffd875';
    ctx.lineWidth = 2;
    ctx.strokeRect(790, 330, 90, 90);
    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⭐', 835, 386);
    ctx.font = '10px "Courier New", monospace';
    ctx.fillStyle = '#ffd875';
    ctx.fillText('VALID FOR 1 NIGHT', 835, 436);
  };

  const handleDownload = () => {
    soundFx.playTicketStampSound();
    setIsStamped(true);
    renderCanvasTicket();

    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `pips_golden_dream_ticket_${ticketId.toLowerCase()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    }, 200);
  };

  return (
    <div className="golden-ticket-window win95-window" id="dream-ticket-office">
      <div className="win-titlebar">
        <span className="win-icon">🎟️</span>
        <span className="win-title-text">MIDNIGHT_NURSERY_GOLDEN_TICKET_OFFICE.EXE</span>
        <div className="win-controls">
          <span className="win-btn">_</span>
          <span className="win-btn">□</span>
          <span className="win-btn">✕</span>
        </div>
      </div>

      <div className="win-content golden-ticket-body">
        {/* Header */}
        <div className="ticket-header-box">
          <span className="ticket-special-badge">★ HACKATHON WINNER EXCLUSIVE: DOWNLOADABLE ARTIFACT ★</span>
          <h3 className="ticket-title">Official Golden Bedtime Ticket Generator</h3>
          <p className="ticket-subtitle">
            Personalize your official boarding pass for tonight's slumber flight.
            Renders a crisp 2x resolution vintage gold certificate ready to save and print!
          </p>
        </div>

        {/* Input Configuration Form */}
        <div className="ticket-form-grid">
          <div className="ticket-input-group">
            <label htmlFor="dreamer-name-input" className="ticket-label">
              👤 Passenger / Dreamer Name:
            </label>
            <input
              id="dreamer-name-input"
              type="text"
              className="retro-input ticket-text-input"
              value={dreamerName}
              maxLength={28}
              onChange={(e) => setDreamerName(e.target.value)}
              placeholder="e.g. Hackathon Judge, Shravani..."
            />
          </div>

          <div className="ticket-input-group">
            <label htmlFor="dream-class-select" className="ticket-label">
              ✨ Slumber Class:
            </label>
            <select
              id="dream-class-select"
              className="retro-select ticket-select"
              value={dreamClass}
              onChange={(e) => setDreamClass(e.target.value)}
            >
              <option value="First Class Cosmic Slumber">🌟 First Class Cosmic Slumber</option>
              <option value="Marshmallow Cloud Express">☁️ Marshmallow Cloud Express</option>
              <option value="Lavender Tea Sweet Dreams VIP">🫖 Lavender Tea Sweet Dreams VIP</option>
              <option value="Star Hammock Whimsical Sleeper">🌙 Star Hammock Whimsical Sleeper</option>
            </select>
          </div>

          <div className="ticket-input-group">
            <label htmlFor="dream-dest-select" className="ticket-label">
              🌌 Dream Flight Destination:
            </label>
            <select
              id="dream-dest-select"
              className="retro-select ticket-select"
              value={dreamDestination}
              onChange={(e) => setDreamDestination(e.target.value)}
            >
              <option value="Cloud Sector 7 (Star Hammock Valley)">Cloud Sector 7 (Star Hammock Valley)</option>
              <option value="The Glowing Moon Spire">The Glowing Moon Spire</option>
              <option value="Stardust Chimney Rooftops">Stardust Chimney Rooftops</option>
              <option value="The Deep Lavender Slumber Lagoon">The Deep Lavender Slumber Lagoon</option>
            </select>
          </div>
        </div>

        {/* Interactive Live Ticket Preview Card */}
        <div className="golden-ticket-preview-card">
          <div className="ticket-foil-sheen"></div>
          
          <div className="preview-ticket-main">
            <div className="preview-top-line">
              <span>★ MIDNIGHT NURSERY BEDTIME PASS ★</span>
              <span className="preview-ticket-id">{ticketId}</span>
            </div>

            <div className="preview-title-block">
              <h4 className="preview-ticket-h4">PIP'S GOLDEN DREAM TICKET</h4>
              <p className="preview-motto">"I build the dreams you fall asleep inside."</p>
            </div>

            <div className="preview-data-row">
              <div className="data-col">
                <span className="data-lbl">PASSENGER:</span>
                <span className="data-val data-name">{dreamerName || 'Little Dreamer'}</span>
              </div>
              <div className="data-col">
                <span className="data-lbl">CLASS:</span>
                <span className="data-val data-class">{dreamClass}</span>
              </div>
            </div>

            <div className="preview-data-row secondary">
              <div className="data-col">
                <span className="data-lbl">DESTINATION:</span>
                <span className="data-val">{dreamDestination}</span>
              </div>
              <div className="data-col">
                <span className="data-lbl">SEAT & GATE:</span>
                <span className="data-val">STAR-01 · GATE MOONBEAM-A</span>
              </div>
            </div>

            {/* Official Wax Seal Stamp */}
            <div className={`preview-wax-seal ${isStamped ? 'stamped-anim' : ''}`}>
              <span>💤</span>
              <small>APPROVED</small>
            </div>

            {/* Barcode */}
            <div className="preview-barcode">
              <div className="barcode-bars"></div>
              <span>AUTHENTICITY HASH: #PIP-NURSERY-TRACK-1</span>
            </div>
          </div>

          <div className="preview-ticket-perforation"></div>

          <div className="preview-ticket-stub">
            <div className="stub-header">BOARDING STUB</div>
            <div className="stub-name">{dreamerName || 'Dreamer'}</div>
            <div className="stub-info">GATE A · SEAT 01</div>
            <div className="stub-id">{ticketId}</div>
            <div className="stub-star-seal">⭐</div>
          </div>
        </div>

        {/* Action Button & Confirmation */}
        <div className="ticket-actions-bar">
          <button
            className="retro-btn download-ticket-btn"
            onClick={handleDownload}
            id="download-golden-ticket-btn"
          >
            📥 Download My Golden Ticket (High-Res PNG)
          </button>

          {downloadSuccess && (
            <div className="ticket-success-message" role="alert">
              🎉 <strong>Bedtime Ticket Downloaded!</strong> Sleep tight tonight under Cloud Sector 7!
            </div>
          )}
        </div>

        {/* Hidden Canvas used for generating the 2x PNG */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}
