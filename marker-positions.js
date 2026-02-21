const RAW_STATE_POSITIONS = {
  "Ladakh": { x: 330, y: 60 },
  "Jammu and Kashmir": { x: 360, y: 140 },
  "Himachal Pradesh": { x: 405, y: 185 },
  "Punjab": { x: 380, y: 230 },
  "Chandigarh": { x: 410, y: 245 },
  "Uttarakhand": { x: 455, y: 215 },
  "Haryana": { x: 430, y: 270 },
  "Delhi": { x: 458, y: 285 },
  "Rajasthan": { x: 360, y: 330 },
  "Uttar Pradesh": { x: 510, y: 305 },
  "Bihar": { x: 590, y: 320 },
  "Sikkim": { x: 640, y: 280 },
  "Assam": { x: 700, y: 300 },
  "Arunachal Pradesh": { x: 760, y: 260 },
  "Nagaland": { x: 730, y: 342 },
  "Manipur": { x: 732, y: 378 },
  "Mizoram": { x: 715, y: 420 },
  "Tripura": { x: 680, y: 390 },
  "Meghalaya": { x: 680, y: 332 },
  "West Bengal": { x: 620, y: 360 },
  "Jharkhand": { x: 570, y: 385 },
  "Odisha": { x: 600, y: 450 },
  "Chhattisgarh": { x: 522, y: 430 },
  "Madhya Pradesh": { x: 470, y: 400 },
  "Gujarat": { x: 300, y: 410 },
  "Dadra and Nagar Haveli and Daman and Diu": { x: 320, y: 450 },
  "Maharashtra": { x: 405, y: 510 },
  "Goa": { x: 360, y: 580 },
  "Telangana": { x: 522, y: 525 },
    "Andhra Pradesh": { x: 565, y: 595 },
  "Karnataka": { x: 450, y: 625 },
  "Kerala": { x: 460, y: 760 },
  "Tamil Nadu": { x: 540, y: 760 },
  "Puducherry": { x: 575, y: 748 },
  "Andaman and Nicobar Islands": { x: 760, y: 760 },
  "Lakshadweep": { x: 300, y: 720 }
};

export const MARKER_SCALE = 2.8;

const MAP_WIDTH = 900;
const MAP_HEIGHT = 900;
const MARKER_X_SCALE = 0.94;
const MARKER_Y_SCALE = 0.97;
const MARKER_X_OFFSET = -30;
const MARKER_Y_OFFSET = 14;

// Add per-state fine tuning here.
export const STATE_MARKER_OFFSETS = {
  "Ladakh": { x: -25, y: 0 }
};

function calibrateMarkerPosition(pos, stateName) {
  const x = (pos.x - MAP_WIDTH / 2) * MARKER_X_SCALE + MAP_WIDTH / 2 + MARKER_X_OFFSET;
  const y = (pos.y - MAP_HEIGHT / 2) * MARKER_Y_SCALE + MAP_HEIGHT / 2 + MARKER_Y_OFFSET;
  const stateOffset = STATE_MARKER_OFFSETS[stateName] || { x: 0, y: 0 };
  return { x: x + stateOffset.x, y: y + stateOffset.y };
}

export const STATE_POSITIONS = Object.fromEntries(
  Object.entries(RAW_STATE_POSITIONS).map(([name, pos]) => [name, calibrateMarkerPosition(pos, name)])
);
