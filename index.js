import indiaAirQualityData from "./data.js";
import { MARKER_SCALE, STATE_POSITIONS } from "./marker-positions.js";

const YEARS = indiaAirQualityData.years;
const POLLUTANTS = indiaAirQualityData.pollutants;

const DOT_RADIUS = 2.6;
const PIN_TIP_OFFSET = 5.2;
const REMOTE_MAP_URL = "https://upload.wikimedia.org/wikipedia/commons/d/dc/India_location_map.svg";
const LOCAL_MAP_FALLBACK = "./india-map-custom.svg";

const mapElement = document.getElementById("indiaMap");
const stateLayer = document.getElementById("stateLayer");
const placeTitle = document.getElementById("placeTitle");
const currentAqiEl = document.getElementById("currentAqi");
const currentStatusEl = document.getElementById("currentStatus");
const trendLabelEl = document.getElementById("trendLabel");
const trendChartEl = document.getElementById("trendChart");
const pollutantBodyEl = document.getElementById("pollutantBody");
const forecastTextEl = document.getElementById("forecastText");

let activeStateName = null;

const mapBaseImage = mapElement.querySelector(".india-base");
if (mapBaseImage) {
  mapBaseImage.setAttribute("href", REMOTE_MAP_URL);
  mapBaseImage.addEventListener("error", () => {
    mapBaseImage.setAttribute("href", LOCAL_MAP_FALLBACK);
  });
}

function average(nums) {
  return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}

function getStateByName(name) {
  return indiaAirQualityData.states.find((s) => s.name === name);
}

function yearPollutantAverage(state, year, pollutant) {
  return average(state.districts.map((d) => d.data[year][pollutant]));
}

function stateYearProfile(state, year) {
  const profile = {};
  for (const pollutant of POLLUTANTS) {
    profile[pollutant] = yearPollutantAverage(state, year, pollutant);
  }
  return profile;
}

function estimateAqi(profile) {
  const score =
    profile["PM2.5"] * 1.25 +
    profile.PM10 * 0.42 +
    profile.NO2 * 0.8 +
    profile.SO2 * 0.55 +
    profile.CO * 24 +
    profile.O3 * 0.62;
  return Math.max(0, Math.min(500, Math.round(score)));
}

function getAqiClass(aqi) {
  if (aqi <= 50) return { label: "Good", className: "status-good" };
  if (aqi <= 100) return { label: "Moderate", className: "status-moderate" };
  if (aqi <= 200) return { label: "Poor", className: "status-poor" };
  if (aqi <= 300) return { label: "Very Poor", className: "status-very-poor" };
  return { label: "Severe", className: "status-severe" };
}

function stateTrend(name) {
  const state = getStateByName(name);
  return YEARS.map((year) => {
    const profile = stateYearProfile(state, year);
    return {
      year,
      profile,
      aqi: estimateAqi(profile)
    };
  });
}

function trendSummary(values) {
  const first = values[0].aqi;
  const last = values[values.length - 1].aqi;
  const delta = last - first;
  if (delta < -4) return `Improving (${delta})`;
  if (delta > 4) return `Worsening (+${delta})`;
  return "Stable";
}

function twoYearForecast(values) {
  const first = values[0].aqi;
  const last = values[values.length - 1].aqi;
  const annualChange = (last - first) / (values.length - 1);
  const forecastAqi = Math.round(last + annualChange * 2);
  return Math.max(0, Math.min(500, forecastAqi));
}

function abbrev(name) {
  return name
    .split(" ")
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function createMapNodes() {
  for (const state of indiaAirQualityData.states) {
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
      selectState(state.name);
    });
    stateLayer.appendChild(node);
  }
}

function setActiveMapNode(name) {
  const nodes = stateLayer.querySelectorAll(".state-node");
  for (const node of nodes) {
    node.classList.toggle("active", node.dataset.state === name);
  }
}

function renderTrend(values) {
  trendChartEl.innerHTML = "";
  const maxAqi = Math.max(...values.map((v) => v.aqi), 1);

  for (const item of values) {
    const card = document.createElement("article");
    card.className = "bar-card";
    const heightPct = Math.max(5, Math.round((item.aqi / maxAqi) * 100));
    card.innerHTML = `
      <div class="bar-rail"><div class="bar-fill" style="height:${heightPct}%"></div></div>
      <span class="bar-year">${item.year}</span>
      <strong class="bar-value">AQI ${item.aqi}</strong>
    `;
    trendChartEl.appendChild(card);
  }
}

function renderPollutants(profile2025) {
  pollutantBodyEl.innerHTML = "";
  for (const pollutant of POLLUTANTS) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${pollutant}</td><td>${profile2025[pollutant].toFixed(2)}</td>`;
    pollutantBodyEl.appendChild(row);
  }
}

function selectState(stateName) {
  const series = stateTrend(stateName);
  const current = series[series.length - 1];
  const stateClass = getAqiClass(current.aqi);
  const forecastAqi = twoYearForecast(series);
  const forecastClass = getAqiClass(forecastAqi);

  activeStateName = stateName;
  setActiveMapNode(stateName);

  placeTitle.textContent = `${stateName} AQI Overview`;
  currentAqiEl.textContent = `${current.aqi}`;
  currentStatusEl.textContent = stateClass.label;
  currentStatusEl.className = stateClass.className;
  trendLabelEl.textContent = trendSummary(series);

  renderTrend(series);
  renderPollutants(current.profile);

  forecastTextEl.textContent =
    `If current trend continues, projected AQI for 2027 is ${forecastAqi} (${forecastClass.label}).`;
  forecastTextEl.className = `forecast-text ${forecastClass.className}`;
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

function mapPoint(evt) {
  const pt = mapElement.createSVGPoint();
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  const transformed = pt.matrixTransform(mapElement.getScreenCTM().inverse());
  return { x: transformed.x, y: transformed.y };
}

mapElement.addEventListener("click", (evt) => {
  const { x, y } = mapPoint(evt);
  const nearest = nearestStateFromPoint(x, y);
  if (nearest) selectState(nearest);
});

createMapNodes();
selectState("Delhi");






