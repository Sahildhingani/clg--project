import { AQI_DATA } from "../models/aqiModel.js";
import { MARKER_SCALE, STATE_POSITIONS } from "../../marker-positions.js";

const DOT_RADIUS = 2.6;
const PIN_TIP_OFFSET = 5.2;
const REMOTE_MAP_URL = "https://upload.wikimedia.org/wikipedia/commons/d/dc/India_location_map.svg";
const LOCAL_MAP_FALLBACK = "./india-map-custom.svg";

const mapElement = document.getElementById("indiaMap");
const stateLayer = document.getElementById("stateLayer");

function abbrev(name) {
  return name
    .split(" ")
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function mapPoint(evt) {
  const point = mapElement.createSVGPoint();
  point.x = evt.clientX;
  point.y = evt.clientY;
  const transformed = point.matrixTransform(mapElement.getScreenCTM().inverse());
  return { x: transformed.x, y: transformed.y };
}

function nearestStateFromPoint(x, y) {
  let nearest = null;
  let nearestDist = Number.POSITIVE_INFINITY;

  for (const [name, pos] of Object.entries(STATE_POSITIONS)) {
    const dx = x - pos.x;
    const dy = y - pos.y;
    const dist = Math.hypot(dx, dy);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = name;
    }
  }

  return nearest;
}

export function setupMap(onSelectState) {
  const mapBaseImage = mapElement.querySelector(".india-base");
  if (mapBaseImage) {
    mapBaseImage.setAttribute("href", REMOTE_MAP_URL);
    mapBaseImage.addEventListener("error", () => {
      mapBaseImage.setAttribute("href", LOCAL_MAP_FALLBACK);
    });
  }

  for (const state of AQI_DATA.states) {
    const pos = STATE_POSITIONS[state.name];
    if (!pos) continue;

    const node = document.createElementNS("http://www.w3.org/2000/svg", "g");
    node.classList.add("state-node");
    node.dataset.state = state.name;
    node.setAttribute("transform", `translate(${pos.x}, ${pos.y}) scale(${MARKER_SCALE})`);

    const pin = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pin.setAttribute(
      "d",
      "M0 -3.4 C1.9 -3.4 3.4 -1.9 3.4 0 C3.4 2.2 1.6 3.8 0 5.2 C-1.6 3.8 -3.4 2.2 -3.4 0 C-3.4 -1.9 -1.9 -3.4 0 -3.4 Z"
    );
    pin.setAttribute("class", "state-pin");

    const pinCore = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    pinCore.setAttribute("r", `${DOT_RADIUS * 0.48}`);
    pinCore.setAttribute("class", "state-pin-core");

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("y", `${PIN_TIP_OFFSET + 3}`);
    label.setAttribute("class", "state-label");
    label.textContent = abbrev(state.name);

    node.append(pin, pinCore, label);
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      onSelectState(state.name);
    });
    stateLayer.appendChild(node);
  }

  mapElement.addEventListener("click", (evt) => {
    const { x, y } = mapPoint(evt);
    const nearest = nearestStateFromPoint(x, y);
    if (nearest) onSelectState(nearest);
  });
}

export function setActiveMapNode(name) {
  const nodes = stateLayer.querySelectorAll(".state-node");
  for (const node of nodes) {
    node.classList.toggle("active", node.dataset.state === name);
  }
}
