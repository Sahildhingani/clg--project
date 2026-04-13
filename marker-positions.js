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

export const MARKER_SCALE = 4.6;

const LEGACY_MAP_WIDTH = 900;
const LEGACY_MAP_HEIGHT = 900;
const MAP_WIDTH = 1500;
const MAP_HEIGHT = 1614.844;
const MARKER_X_SCALE = MAP_WIDTH / LEGACY_MAP_WIDTH;
const MARKER_Y_SCALE = MAP_HEIGHT / LEGACY_MAP_HEIGHT;
const GLOBAL_MARKER_SHIFT_X = -42;
const GLOBAL_MARKER_SHIFT_Y = 0;

// Add per-state fine tuning here.
export const STATE_MARKER_OFFSETS = {
  "Ladakh": { x: -18, y: -22 },
  "Jammu and Kashmir": { x: -18, y: -10 },
  "Himachal Pradesh": { x: -8, y: -10 },
  "Punjab": { x: -12, y: -4 },
  "Chandigarh": { x: -4, y: -3 },
  "Uttarakhand": { x: 6, y: -8 },
  "Haryana": { x: -8, y: 0 },
  "Delhi": { x: -2, y: 0 },
  "Rajasthan": { x: -20, y: 8 },
  "Uttar Pradesh": { x: 10, y: 4 },
  "Bihar": { x: 8, y: 2 },
  "Sikkim": { x: 6, y: -6 },
  "Assam": { x: 16, y: 2 },
  "Arunachal Pradesh": { x: 18, y: -10 },
  "Nagaland": { x: 16, y: 2 },
  "Manipur": { x: 18, y: 0 },
  "Mizoram": { x: 16, y: 8 },
  "Tripura": { x: 12, y: 6 },
  "Meghalaya": { x: 10, y: 2 },
  "West Bengal": { x: 6, y: 8 },
  "Jharkhand": { x: 0, y: 6 },
  "Odisha": { x: 8, y: 10 },
  "Chhattisgarh": { x: 0, y: 8 },
  "Madhya Pradesh": { x: -6, y: 8 },
  "Gujarat": { x: -16, y: 10 },
  "Dadra and Nagar Haveli and Daman and Diu": { x: -10, y: 10 },
  "Maharashtra": { x: -10, y: 16 },
  "Goa": { x: -6, y: 10 },
  "Telangana": { x: 4, y: 10 },
  "Andhra Pradesh": { x: 14, y: 20 },
  "Karnataka": { x: -2, y: 16 },
  "Kerala": { x: 0, y: 22 },
  "Tamil Nadu": { x: 14, y: 18 },
  "Puducherry": { x: 14, y: 18 },
  "Andaman and Nicobar Islands": { x: 28, y: 10 },
  "Lakshadweep": { x: -12, y: 10 }
};

function calibrateMarkerPosition(pos, stateName) {
  const x = pos.x * MARKER_X_SCALE;
  const y = pos.y * MARKER_Y_SCALE;
  const stateOffset = STATE_MARKER_OFFSETS[stateName] || { x: 0, y: 0 };
  return {
    x: x + GLOBAL_MARKER_SHIFT_X + stateOffset.x,
    y: y + GLOBAL_MARKER_SHIFT_Y + stateOffset.y
  };
}

export const STATE_POSITIONS = Object.fromEntries(
  Object.entries(RAW_STATE_POSITIONS).map(([name, pos]) => [name, calibrateMarkerPosition(pos, name)])
);
