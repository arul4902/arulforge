const fs = require('fs');
const path = require('path');

// Read portrait and convert to base64
const portraitPath = path.join(__dirname, '..', 'public', 'arul_portrait.jpg');
const portraitBase64 = fs.readFileSync(portraitPath).toString('base64');
const portraitDataUrl = `data:image/jpeg;base64,${portraitBase64}`;

const width = 3840;
const height = 2160;

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background-color: #03060f;">
  <defs>
    <!-- Film Grain Filter -->
    <filter id="film-grain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" result="noise" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.045 0" />
      <feComposite in2="SourceGraphic" in="gl" operator="over" />
    </filter>

    <!-- Holographic Cyan Glow Filters -->
    <filter id="cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur1" />
      <feGaussianBlur stdDeviation="22" result="blur2" />
      <feMerge>
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="14" result="blur1" />
      <feGaussianBlur stdDeviation="45" result="blur2" />
      <feGaussianBlur stdDeviation="90" result="blur3" />
      <feMerge>
        <feMergeNode in="blur3" />
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Volumetric Cone Gradient -->
    <linearGradient id="volumetric-beam" x1="0.5" y1="1" x2="0.5" y2="0">
      <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.45" />
      <stop offset="35%" stop-color="#7DF9FF" stop-opacity="0.22" />
      <stop offset="70%" stop-color="#D7F8FF" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#00D4FF" stop-opacity="0" />
    </linearGradient>

    <!-- Ambient Room Warm Gradient -->
    <radialGradient id="warm-lamp" cx="0.82" cy="0.22" r="0.45">
      <stop offset="0%" stop-color="#FFA447" stop-opacity="0.25" />
      <stop offset="50%" stop-color="#9E4D1A" stop-opacity="0.10" />
      <stop offset="100%" stop-color="#03060f" stop-opacity="0" />
    </radialGradient>

    <!-- Left Ambient Lamp -->
    <radialGradient id="left-lamp" cx="0.15" cy="0.28" r="0.4">
      <stop offset="0%" stop-color="#FFBD73" stop-opacity="0.18" />
      <stop offset="55%" stop-color="#803D14" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#03060f" stop-opacity="0" />
    </radialGradient>

    <!-- Obsidian Table Gradient with Reflection Falloff -->
    <linearGradient id="table-surface" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#040916" />
      <stop offset="25%" stop-color="#071328" />
      <stop offset="60%" stop-color="#050d1e" />
      <stop offset="100%" stop-color="#02040a" />
    </linearGradient>

    <!-- Studio Wall Gradient -->
    <linearGradient id="wall-gradient" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#020409" />
      <stop offset="40%" stop-color="#080e1c" />
      <stop offset="85%" stop-color="#050a14" />
      <stop offset="100%" stop-color="#020409" />
    </linearGradient>

    <!-- Blueprint Gradient for Buildings -->
    <linearGradient id="blueprint-line-v" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#E2F9FF" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#7DF9FF" stop-opacity="0.4" />
    </linearGradient>

    <!-- Blue Shirt Gradient -->
    <linearGradient id="shirt-grad" x1="0.3" y1="0" x2="0.7" y2="1">
      <stop offset="0%" stop-color="#143D75" />
      <stop offset="35%" stop-color="#1A5199" />
      <stop offset="70%" stop-color="#0E2D58" />
      <stop offset="100%" stop-color="#071730" />
    </linearGradient>

    <!-- Cyan reflection on shirt -->
    <linearGradient id="shirt-cyan-reflection" x1="0.5" y1="1" x2="0.5" y2="0">
      <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.6" />
      <stop offset="45%" stop-color="#00D4FF" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#00D4FF" stop-opacity="0" />
    </linearGradient>

    <!-- Clip path for Arul's head & shoulders -->
    <clipPath id="arul-crop">
      <ellipse cx="1920" cy="850" rx="310" ry="380" />
    </clipPath>

    <!-- Vignette Mask -->
    <radialGradient id="vignette-grad" cx="0.5" cy="0.5" r="0.6">
      <stop offset="0%" stop-color="#000000" stop-opacity="0" />
      <stop offset="70%" stop-color="#000000" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.88" />
    </radialGradient>
  </defs>

  <!-- ========================================== -->
  <!-- 1. BACKGROUND: CINEMATIC CONFERENCE ROOM   -->
  <!-- ========================================== -->
  <!-- Studio Wall Base -->
  <rect x="0" y="0" width="${width}" height="1250" fill="url(#wall-gradient)" />

  <!-- Studio Ambient Lighting (Tamil cinema warm tungsten kick) -->
  <rect x="0" y="0" width="${width}" height="1250" fill="url(#warm-lamp)" />
  <rect x="0" y="0" width="${width}" height="1250" fill="url(#left-lamp)" />

  <!-- Background Conference Room Architectural Slats / Acoustic Panels -->
  <g opacity="0.22" stroke="#162238" stroke-width="2.5">
    ${Array.from({ length: 48 }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="1150" />`).join('\n    ')}
  </g>

  <!-- Studio Twilight Windows (Far Right) -->
  <g opacity="0.4">
    <rect x="2750" y="120" width="950" height="980" fill="#061226" rx="8" />
    <!-- Window Panes & City Lights outside -->
    <line x1="2750" y1="420" x2="3700" y2="420" stroke="#0e2344" stroke-width="8" />
    <line x1="2750" y1="720" x2="3700" y2="720" stroke="#0e2344" stroke-width="8" />
    <line x1="3050" y1="120" x2="3050" y2="1100" stroke="#0e2344" stroke-width="8" />
    <line x1="3400" y1="120" x2="3400" y2="1100" stroke="#0e2344" stroke-width="8" />
    <!-- Distant twilight city silhouette through glass -->
    <path d="M2760 1100 L2850 880 L2920 880 L2920 1100 L3000 1100 L3000 820 L3090 820 L3090 1100 L3220 1100 L3220 740 L3310 740 L3310 1100 L3500 1100 L3500 890 L3580 890 L3580 1100 Z" fill="#040914" />
    <!-- Distant warm window speckles in city -->
    <circle cx="2880" cy="940" r="2.5" fill="#FFA447" opacity="0.6" />
    <circle cx="3040" cy="880" r="3" fill="#FFE599" opacity="0.7" />
    <circle cx="3270" cy="790" r="2.5" fill="#7DF9FF" opacity="0.6" />
    <circle cx="3285" cy="830" r="2" fill="#FFA447" opacity="0.5" />
    <circle cx="3540" cy="930" r="3" fill="#FFE599" opacity="0.7" />
  </g>

  <!-- Left Studio Background Elements -->
  <g opacity="0.3">
    <!-- Server Rack / Glass partition -->
    <rect x="180" y="240" width="380" height="880" fill="#040a16" stroke="#0c1a30" stroke-width="4" />
    <line x1="180" y1="460" x2="560" y2="460" stroke="#0c1a30" stroke-width="3" />
    <line x1="180" y1="680" x2="560" y2="680" stroke="#0c1a30" stroke-width="3" />
    <line x1="180" y1="900" x2="560" y2="900" stroke="#0c1a30" stroke-width="3" />
    <!-- Server Status LEDs -->
    <circle cx="230" cy="350" r="4" fill="#00D4FF" opacity="0.8" />
    <circle cx="255" cy="350" r="4" fill="#00D4FF" opacity="0.4" />
    <circle cx="280" cy="350" r="4" fill="#22C55E" opacity="0.9" />
  </g>

  <!-- ========================================== -->
  <!-- 2. ONLOOKERS / TEAM SILHOUETTES IN ROOM   -->
  <!-- ========================================== -->
  <!-- Onlooker 1 (Left background, watching table) -->
  <g opacity="0.75">
    <ellipse cx="980" cy="740" rx="65" ry="85" fill="#030713" />
    <path d="M860 1150 C880 940 920 860 980 840 C1040 860 1080 940 1100 1150 Z" fill="#040916" />
    <!-- Subtle warm rim on shoulder from left lamp -->
    <path d="M875 1120 C895 950 930 875 975 850" stroke="#FFBD73" stroke-width="2.5" fill="none" opacity="0.3" />
    <!-- Cyan bounce from hologram on front collar -->
    <path d="M990 850 C1035 870 1065 950 1085 1120" stroke="#00D4FF" stroke-width="3" fill="none" opacity="0.45" />
  </g>

  <!-- Onlooker 2 (Far left background silhouette) -->
  <g opacity="0.55">
    <ellipse cx="680" cy="790" rx="55" ry="70" fill="#02050e" />
    <path d="M580 1150 C600 970 635 900 680 880 C725 900 760 970 780 1150 Z" fill="#030612" />
  </g>

  <!-- Onlooker 3 (Right background, female architect profile) -->
  <g opacity="0.78">
    <ellipse cx="2860" cy="750" rx="62" ry="80" fill="#030713" />
    <ellipse cx="2890" cy="770" rx="35" ry="45" fill="#030713" /> <!-- Bun hair profile -->
    <path d="M2740 1150 C2765 930 2800 850 2860 835 C2920 850 2960 930 2980 1150 Z" fill="#040916" />
    <!-- Warm backlight from right window -->
    <path d="M2970 1120 C2955 940 2920 860 2870 840" stroke="#FFA447" stroke-width="3.5" fill="none" opacity="0.5" />
    <!-- Cyan glow on face/chest facing hologram -->
    <path d="M2850 840 C2805 855 2770 940 2750 1120" stroke="#00D4FF" stroke-width="3.5" fill="none" opacity="0.55" />
  </g>

  <!-- Onlooker 4 (Far right silhouette observer) -->
  <g opacity="0.5">
    <ellipse cx="3180" cy="800" rx="58" ry="74" fill="#02050f" />
    <path d="M3070 1150 C3090 980 3125 910 3180 890 C3235 910 3270 980 3290 1150 Z" fill="#030612" />
  </g>

  <!-- ========================================== -->
  <!-- 3. CENTRAL HERO FIGURE: ARUL S. LEANING OVER TABLE -->
  <!-- ========================================== -->
  <g id="central-figure">
    <!-- Leaning Torso & Tailored Blue Shirt -->
    <!-- Shoulders & Back Geometry -->
    <path d="M1420 1280 C1460 1020 1560 880 1740 820 L2100 820 C2280 880 2380 1020 2420 1280 Z" fill="url(#shirt-grad)" />

    <!-- Blue Shirt Folds and Seams -->
    <g stroke="#092244" stroke-width="4" fill="none" opacity="0.6">
      <path d="M1680 850 Q1820 950 1920 1060" />
      <path d="M2160 850 Q2020 950 1920 1060" />
      <path d="M1580 960 Q1700 1040 1820 1150" />
      <path d="M2260 960 Q2140 1040 2020 1150" />
    </g>

    <!-- Blue Shirt Tailored Button Placket & Collar -->
    <path d="M1870 820 L1970 820 L1950 1280 L1890 1280 Z" fill="#14396b" />
    <line x1="1920" y1="830" x2="1920" y2="1280" stroke="#0a1e3b" stroke-width="4" />
    <!-- Mother-of-pearl buttons with cyan glint -->
    <circle cx="1920" cy="890" r="6" fill="#D7F8FF" opacity="0.9" />
    <circle cx="1920" cy="980" r="6" fill="#D7F8FF" opacity="0.9" />
    <circle cx="1920" cy="1070" r="6" fill="#D7F8FF" opacity="0.9" />
    <circle cx="1920" cy="1160" r="6" fill="#D7F8FF" opacity="0.9" />

    <!-- Left Arm Leaning Forward onto Obsidian Table -->
    <path d="M1460 1020 L1260 1340 L1380 1370 L1600 1100 Z" fill="url(#shirt-grad)" />
    <!-- Right Arm Leaning Forward onto Obsidian Table -->
    <path d="M2380 1020 L2580 1340 L2460 1370 L2240 1100 Z" fill="url(#shirt-grad)" />

    <!-- Hands on Table (Focused grip/support on dark table) -->
    <!-- Left Hand -->
    <ellipse cx="1270" cy="1350" rx="65" ry="35" fill="#9e7b62" />
    <path d="M1220 1350 C1230 1375 1280 1380 1320 1365 C1325 1350 1300 1335 1250 1335 Z" fill="#bfa188" />
    <!-- Right Hand -->
    <ellipse cx="2570" cy="1350" rx="65" ry="35" fill="#9e7b62" />
    <path d="M2620 1350 C2610 1375 2560 1380 2520 1365 C2515 1350 2540 1335 2590 1335 Z" fill="#bfa188" />

    <!-- Photorealistic Portrait Composition of Arul S. (Masked & Layered) -->
    <g transform="translate(0, -110)">
      <!-- Neck with muscle tone -->
      <path d="M1840 850 L1830 960 C1870 990 1970 990 2010 960 L2000 850 Z" fill="#99755b" />
      <path d="M1855 860 L1850 950 C1885 975 1955 975 1985 950 L1985 860 Z" fill="#b89377" />

      <!-- Photorealistic Portrait Image from public/arul_portrait.jpg -->
      <image
        href="${portraitDataUrl}"
        x="1610"
        y="420"
        width="620"
        height="780"
        clip-path="url(#arul-crop)"
        preserveAspectRatio="xMidYMid slice"
      />

      <!-- Cinematic Rim Lighting & Shading on Arul -->
      <!-- Warm rim light on Arul's right side (from background lamp) -->
      <path d="M2080 580 C2140 680 2150 780 2130 850" stroke="#FFA447" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.45" />

      <!-- Volumetric Cyan Hologram Kick Light on Arul's chin, glasses & chest -->
      <!-- Chin/jawline glow -->
      <path d="M1780 820 C1860 880 1980 880 2060 820" stroke="#00D4FF" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.85" filter="url(#cyan-glow)" />
      <!-- Glasses rim catchlight -->
      <ellipse cx="1870" cy="670" rx="42" ry="32" stroke="#7DF9FF" stroke-width="3" fill="none" opacity="0.9" filter="url(#cyan-glow)" />
      <ellipse cx="1970" cy="670" rx="42" ry="32" stroke="#7DF9FF" stroke-width="3" fill="none" opacity="0.9" filter="url(#cyan-glow)" />
      <!-- Glasses bridge glint -->
      <line x1="1912" y1="665" x2="1928" y2="665" stroke="#FFFFFF" stroke-width="4" filter="url(#cyan-glow)" />
    </g>

    <!-- Cyan reflection across the blue shirt from the rising table hologram -->
    <path d="M1420 1280 C1460 1020 1560 880 1740 820 L2100 820 C2280 880 2380 1020 2420 1280 Z" fill="url(#shirt-cyan-reflection)" />
  </g>

  <!-- ========================================== -->
  <!-- 4. DARK OBSIDIAN CONFERENCE TABLE SURFACE -->
  <!-- ========================================== -->
  <g id="conference-table">
    <!-- Perspective Table Polygon (Low angle perspective) -->
    <polygon points="0,${height} 0,1240 ${width},1240 ${width},${height}" fill="url(#table-surface)" />

    <!-- Table Horizon Rim Highlight (High-gloss beveled edge) -->
    <line x1="0" y1="1240" x2="${width}" y2="1240" stroke="#00D4FF" stroke-width="3.5" opacity="0.75" filter="url(#cyan-glow)" />
    <line x1="0" y1="1240" x2="${width}" y2="1240" stroke="#FFFFFF" stroke-width="1.5" opacity="0.9" />

    <!-- Mirror Reflection of Arul's Hands and Arms on Obsidian Glass -->
    <ellipse cx="1270" cy="1265" rx="55" ry="18" fill="#5c4535" opacity="0.35" />
    <ellipse cx="2570" cy="1265" rx="55" ry="18" fill="#5c4535" opacity="0.35" />
    <ellipse cx="1920" cy="1290" rx="220" ry="35" fill="#0c254a" opacity="0.45" />

    <!-- Isometric Blueprint Grid on Table Surface -->
    <g stroke="#00D4FF" stroke-width="1.2" opacity="0.35">
      ${Array.from({ length: 21 }, (_, i) => {
        const x = i * 192;
        return `<line x1="${x}" y1="1240" x2="${(x - 1920) * 1.6 + 1920}" y2="${height}" />`;
      }).join('\n      ')}
      ${[1270, 1330, 1420, 1540, 1700, 1900, 2130].map(y => `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke-dasharray="12,12" />`).join('\n      ')}
    </g>

    <!-- Technical Target Crosshairs & Calibration Marks on Table -->
    <g stroke="#7DF9FF" stroke-width="1.8" opacity="0.6">
      <!-- Center Emitter Ring -->
      <ellipse cx="1920" cy="1480" rx="340" ry="90" fill="none" stroke="#00D4FF" stroke-width="2" stroke-dasharray="8,6" />
      <ellipse cx="1920" cy="1480" rx="480" ry="130" fill="none" stroke="#00D4FF" stroke-width="1.5" opacity="0.4" />
      <circle cx="1920" cy="1480" r="14" fill="#00D4FF" filter="url(#intense-glow)" />
      <circle cx="1920" cy="1480" r="6" fill="#FFFFFF" />

      <!-- Coordinate Ticks -->
      <line x1="1560" y1="1480" x2="1600" y2="1480" />
      <line x1="2240" y1="1480" x2="2280" y2="1480" />
      <line x1="1920" y1="1380" x2="1920" y2="1400" />
      <line x1="1920" y1="1560" x2="1920" y2="1580" />

      <!-- Small Blueprint Telemetry Labels on Table -->
      <text x="1620" y="1465" font-family="'JetBrains Mono', monospace" font-size="20" fill="#00D4FF" letter-spacing="3">COORDINATES: [11.0168° N, 76.9558° E]</text>
      <text x="1620" y="1505" font-family="'JetBrains Mono', monospace" font-size="18" fill="#7DF9FF" opacity="0.8" letter-spacing="4">BASE_DATUM: 00.000 // EMITTER_OK</text>
      <text x="2180" y="1465" font-family="'JetBrains Mono', monospace" font-size="20" fill="#00D4FF" letter-spacing="3">FREQ: 94.2 THz</text>
      <text x="2180" y="1505" font-family="'JetBrains Mono', monospace" font-size="18" fill="#7DF9FF" opacity="0.8" letter-spacing="4">SCALE: 1:1 ARCH</text>
    </g>
  </g>

  <!-- ========================================== -->
  <!-- 5. VOLUMETRIC UPWARD LIGHT CONE            -->
  <!-- ========================================== -->
  <g id="volumetric-light" opacity="0.85">
    <polygon points="1920,1480 880,200 2960,200" fill="url(#volumetric-beam)" />
    <!-- Secondary Cones -->
    <polygon points="1920,1480 1350,300 2490,300" fill="url(#volumetric-beam)" opacity="0.6" />
    <polygon points="1920,1480 1600,450 2240,450" fill="url(#volumetric-beam)" opacity="0.4" />
  </g>

  <!-- ========================================================== -->
  <!-- 6. TRANSLUCENT WHITE WIREFRAME HOLOGRAM OF CITY & BUILDINGS -->
  <!-- ========================================================== -->
  <!-- Rising upward from the table surface like an architectural blueprint coming to life -->
  <g id="holographic-city">
    <!-- Floor-by-Floor Assembly Guidelines -->
    <g stroke="#00D4FF" stroke-width="1.2" opacity="0.5" stroke-dasharray="6,8">
      ${[1360, 1260, 1160, 1060, 960, 860, 760, 660, 560, 460].map(y => `
        <line x1="1100" y1="${y}" x2="2740" y2="${y}" />
        <text x="2760" y="${y + 5}" font-family="'JetBrains Mono', monospace" font-size="16" fill="#7DF9FF" opacity="0.75">L-${Math.round((1480 - y) / 10)} // +${Math.round((1480 - y) * 0.4)}m</text>
      `).join('\n      ')}
    </g>

    <!-- TOWER 1: CENTRAL COMMAND MONOLITH (AI Architecture / Cloud Structure) -->
    <g id="central-tower" filter="url(#cyan-glow)">
      <!-- Wireframe Faces (Translucent white & cyan edges) -->
      <polygon points="1840,1420 1840,540 2000,500 2000,1380" fill="rgba(0, 212, 255, 0.04)" stroke="#E2F9FF" stroke-width="2.5" />
      <polygon points="2000,500 2000,1380 2140,1440 2140,560" fill="rgba(125, 249, 255, 0.06)" stroke="#7DF9FF" stroke-width="2" />
      <polygon points="1840,540 1920,480 2060,460 2000,500" fill="rgba(255, 255, 255, 0.12)" stroke="#FFFFFF" stroke-width="2.5" />

      <!-- Tower Internal Floor Slabs (Assembling layer by layer) -->
      ${Array.from({ length: 14 }, (_, i) => {
        const y = 1380 - i * 62;
        return `
          <line x1="1840" y1="${y}" x2="2000" y2="${y - 40}" stroke="#E2F9FF" stroke-width="1.5" opacity="0.85" />
          <line x1="2000" y1="${y - 40}" x2="2140" y2="${y}" stroke="#7DF9FF" stroke-width="1.2" opacity="0.7" />
          <!-- Core Data Nodes on Floor -->
          <circle cx="1920" cy="${y - 20}" r="3" fill="#FFFFFF" />
        `;
      }).join('\n      ')}

      <!-- Tower Spire & Antenna -->
      <line x1="1990" y1="460" x2="1990" y2="340" stroke="#FFFFFF" stroke-width="3" />
      <circle cx="1990" cy="340" r="7" fill="#00D4FF" filter="url(#intense-glow)" />
      <circle cx="1990" cy="340" r="3" fill="#FFFFFF" />
      <!-- Pulsing Beacon Wave -->
      <ellipse cx="1990" cy="340" rx="35" ry="10" stroke="#7DF9FF" stroke-width="1.5" fill="none" opacity="0.8" />
    </g>

    <!-- TOWER 2: LEFT ARCHITECTURAL BLOCK (HVAC / Engineering Structure) -->
    <g id="left-tower" filter="url(#cyan-glow)">
      <!-- Main Block Wireframe -->
      <polygon points="1440,1440 1440,680 1620,630 1620,1390" fill="rgba(0, 212, 255, 0.03)" stroke="#E2F9FF" stroke-width="2.2" />
      <polygon points="1620,630 1620,1390 1760,1430 1760,670" fill="rgba(0, 212, 255, 0.05)" stroke="#7DF9FF" stroke-width="1.8" />
      <polygon points="1440,680 1520,620 1680,600 1620,630" fill="rgba(255, 255, 255, 0.08)" stroke="#FFFFFF" stroke-width="2" />

      <!-- Horizontal Ribs & Floor Grids -->
      ${Array.from({ length: 11 }, (_, i) => {
        const y = 1400 - i * 68;
        return `
          <line x1="1440" y1="${y}" x2="1620" y2="${y - 50}" stroke="#E2F9FF" stroke-width="1.4" opacity="0.75" />
          <line x1="1620" y1="${y - 50}" x2="1760" y2="${y}" stroke="#7DF9FF" stroke-width="1.2" opacity="0.6" />
        `;
      }).join('\n      ')}

      <!-- Cantilevered Glass Balcony / Web Section -->
      <polygon points="1380,950 1440,940 1440,1080 1380,1090" fill="rgba(0, 212, 255, 0.08)" stroke="#00D4FF" stroke-width="2" />
      <text x="1395" y="1030" font-family="'JetBrains Mono', monospace" font-size="16" fill="#7DF9FF" transform="rotate(-90 1395,1030)">NEXT.JS</text>
    </g>

    <!-- TOWER 3: RIGHT ARCHITECTURAL BLOCK (Full-Stack / Modern Web Pavilion) -->
    <g id="right-tower" filter="url(#cyan-glow)">
      <!-- Main Right Wireframe -->
      <polygon points="2220,1440 2220,720 2380,670 2380,1390" fill="rgba(0, 212, 255, 0.03)" stroke="#E2F9FF" stroke-width="2.2" />
      <polygon points="2380,670 2380,1390 2520,1430 2520,710" fill="rgba(0, 212, 255, 0.05)" stroke="#7DF9FF" stroke-width="1.8" />
      <polygon points="2220,720 2300,660 2450,640 2380,670" fill="rgba(255, 255, 255, 0.08)" stroke="#FFFFFF" stroke-width="2" />

      <!-- Floor Lines -->
      ${Array.from({ length: 10 }, (_, i) => {
        const y = 1400 - i * 70;
        return `
          <line x1="2220" y1="${y}" x2="2380" y2="${y - 50}" stroke="#E2F9FF" stroke-width="1.4" opacity="0.75" />
          <line x1="2380" y1="${y - 50}" x2="2520" y2="${y}" stroke="#7DF9FF" stroke-width="1.2" opacity="0.6" />
        `;
      }).join('\n      ')}

      <!-- Cantilevered UI Projection -->
      <polygon points="2520,890 2600,880 2600,1020 2520,1030" fill="rgba(0, 212, 255, 0.08)" stroke="#00D4FF" stroke-width="2" />
      <text x="2540" y="970" font-family="'JetBrains Mono', monospace" font-size="16" fill="#7DF9FF" transform="rotate(90 2540,970)">SPRING BOOT</text>
    </g>

    <!-- FLOATING DIGITAL CITY SKYWAYS & DATA CONDUITS -->
    <g id="skyways" stroke="#00D4FF" stroke-width="2" opacity="0.8">
      <!-- Skybridge 1: Left to Center -->
      <line x1="1620" y1="880" x2="1840" y2="840" stroke="#FFFFFF" stroke-width="2.5" />
      <line x1="1620" y1="910" x2="1840" y2="870" stroke="#7DF9FF" stroke-width="1.8" />
      <!-- Vertical Truss wires -->
      ${[0.2, 0.4, 0.6, 0.8].map(t => {
        const x = 1620 + (1840 - 1620) * t;
        const y1 = 880 + (840 - 880) * t;
        const y2 = 910 + (870 - 910) * t;
        return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#00D4FF" stroke-width="1.5" />`;
      }).join('\n      ')}

      <!-- Skybridge 2: Center to Right -->
      <line x1="2140" y1="920" x2="2220" y2="940" stroke="#FFFFFF" stroke-width="2.5" />
      <line x1="2140" y1="950" x2="2220" y2="970" stroke="#7DF9FF" stroke-width="1.8" />

      <!-- Floating Technical UI Window (Metaphorical Browser Screen floating in city) -->
      <g transform="translate(1760, 580)">
        <rect x="0" y="0" width="320" height="200" rx="8" fill="rgba(7, 19, 40, 0.7)" stroke="#00D4FF" stroke-width="2" filter="url(#cyan-glow)" />
        <!-- Browser Top Bar -->
        <rect x="0" y="0" width="320" height="32" rx="8" fill="rgba(0, 212, 255, 0.15)" />
        <circle cx="20" cy="16" r="4.5" fill="#EF4444" />
        <circle cx="36" cy="16" r="4.5" fill="#EAB308" />
        <circle cx="52" cy="16" r="4.5" fill="#22C55E" />
        <rect x="80" y="8" width="180" height="16" rx="4" fill="rgba(255, 255, 255, 0.1)" />
        <text x="110" y="20" font-family="'JetBrains Mono', monospace" font-size="11" fill="#D7F8FF">https://arulforge.com</text>
        <!-- Wireframe Content Blocks inside floating browser -->
        <rect x="20" y="50" width="120" height="24" rx="3" fill="rgba(0, 212, 255, 0.35)" />
        <rect x="20" y="86" width="280" height="8" rx="2" fill="rgba(255, 255, 255, 0.25)" />
        <rect x="20" y="104" width="220" height="8" rx="2" fill="rgba(255, 255, 255, 0.18)" />
        <!-- Interactive CTA wireframe -->
        <rect x="20" y="132" width="100" height="28" rx="4" fill="#00D4FF" />
        <text x="35" y="150" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#03060f">FORGE ↗</text>
        <!-- Floating Connection Spark -->
        <circle cx="320" cy="100" r="5" fill="#FFFFFF" filter="url(#intense-glow)" />
      </g>
    </g>

    <!-- FLOATING BLUEPRINT CALLOUTS & ARCHITECTURAL DIMENSIONS -->
    <g font-family="'JetBrains Mono', monospace" font-size="18" fill="#E2F9FF" letter-spacing="2">
      <!-- Callout 1 (Left) -->
      <g>
        <line x1="1240" y1="620" x2="1440" y2="680" stroke="#00D4FF" stroke-width="1.8" stroke-dasharray="4,4" />
        <circle cx="1240" cy="620" r="5" fill="#00D4FF" />
        <rect x="940" y="590" width="280" height="60" rx="4" fill="rgba(3, 7, 18, 0.85)" stroke="#00D4FF" stroke-width="1.5" />
        <text x="960" y="618" fill="#7DF9FF" font-size="16">NODE: ARCH_01</text>
        <text x="960" y="640" fill="#FFFFFF" font-size="14" opacity="0.8">ENGINEERING RIGOR</text>
      </g>

      <!-- Callout 2 (Right) -->
      <g>
        <line x1="2520" y1="710" x2="2720" y2="650" stroke="#00D4FF" stroke-width="1.8" stroke-dasharray="4,4" />
        <circle cx="2720" cy="650" r="5" fill="#00D4FF" />
        <rect x="2740" y="620" width="290" height="60" rx="4" fill="rgba(3, 7, 18, 0.85)" stroke="#00D4FF" stroke-width="1.5" />
        <text x="2760" y="648" fill="#7DF9FF" font-size="16">STATUS: ASSEMBLING</text>
        <text x="2760" y="670" fill="#FFFFFF" font-size="14" opacity="0.8">REALTIME HOLOGRAPHY</text>
      </g>

      <!-- Technical Elevation Ruler (Left Side) -->
      <g stroke="#00D4FF" stroke-width="1.5" opacity="0.6">
        <line x1="1060" y1="1400" x2="1060" y2="480" />
        ${[1400, 1220, 1040, 860, 680, 500].map((y, idx) => `
          <line x1="1040" y1="${y}" x2="1060" y2="${y}" />
          <text x="970" y="${y + 6}" font-size="14" fill="#00D4FF">+${idx * 60}m</text>
        `).join('\n        ')}
      </g>
    </g>

    <!-- HORIZONTAL SCANLINE & SCANNING BEAM (Wireframe above / Rendered below metaphor) -->
    <g id="scanning-beam">
      <line x1="600" y1="920" x2="3240" y2="920" stroke="#00D4FF" stroke-width="3.5" filter="url(#intense-glow)" opacity="0.9" />
      <line x1="700" y1="920" x2="3140" y2="920" stroke="#FFFFFF" stroke-width="1.8" opacity="0.95" />
      <!-- Scanning Beam Glow Gradient Ribbon -->
      <rect x="600" y="890" width="2640" height="60" fill="url(#shirt-cyan-reflection)" opacity="0.35" />
      <text x="2980" y="910" font-family="'JetBrains Mono', monospace" font-size="16" fill="#FFFFFF" letter-spacing="4">SCAN_BEAM // 120 FPS</text>
    </g>
  </g>

  <!-- ========================================================== -->
  <!-- 7. ANAMORPHIC HORIZONTAL FLARE & VOLUMETRIC ATMOSPHERE     -->
  <!-- ========================================================== -->
  <g id="anamorphic-flare" opacity="0.75" filter="url(#intense-glow)">
    <!-- Horizontal Lens Flare Streak across table emitter -->
    <ellipse cx="1920" cy="1480" rx="1600" ry="8" fill="#00D4FF" opacity="0.85" />
    <ellipse cx="1920" cy="1480" rx="900" ry="4" fill="#FFFFFF" opacity="0.95" />
    <!-- Secondary Flare on Spire -->
    <ellipse cx="1990" cy="340" rx="550" ry="4" fill="#7DF9FF" opacity="0.6" />
  </g>

  <!-- ========================================================== -->
  <!-- 8. CINEMATIC TYPOGRAPHY WATERMARK / STUDIO IDENTITY         -->
  <!-- ========================================================== -->
  <g id="studio-typography" opacity="0.85">
    <text x="180" y="160" font-family="'Orbitron', sans-serif" font-size="34" font-weight="900" fill="#FFFFFF" letter-spacing="8">ARULFORGE</text>
    <text x="180" y="198" font-family="'JetBrains Mono', monospace" font-size="16" fill="#00D4FF" letter-spacing="5">CINEMATIC HOLOGRAPHIC BLUEPRINT // MASTER CAPTURE</text>

    <!-- Right Side Stamp -->
    <text x="3660" y="160" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="16" fill="#8D96A8" letter-spacing="4">FOUNDER: ARUL S.</text>
    <text x="3660" y="195" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="16" fill="#00D4FF" letter-spacing="4">● 4K 35MM FILM GRADE</text>
  </g>

  <!-- ========================================================== -->
  <!-- 9. 35MM FILM VIGNETTE & GRAIN OVERLAY                      -->
  <!-- ========================================================== -->
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#vignette-grad)" pointer-events="none" />
  <rect x="0" y="0" width="${width}" height="${height}" filter="url(#film-grain)" pointer-events="none" opacity="0.5" />
</svg>
`;

const outputPath = path.join(__dirname, '..', 'public', 'cinematic_hero_scene.svg');
fs.writeFileSync(outputPath, svgContent, 'utf8');
console.log('Successfully generated 4K cinematic scene at:', outputPath, 'Size:', svgContent.length);
