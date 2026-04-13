import { AQI_DATA, YEARS, allStateRankings } from "./app/models/aqiModel.js";

function renderStateCard(item, index, label) {
  return `
    <article class="state-preview-card">
      <div class="state-preview-card__head">
        <span class="state-preview-card__rank">${label} ${index + 1}</span>
        <span class="state-preview-card__status ${item.status.className}">${item.status.label}</span>
      </div>
      <strong>${item.name}</strong>
      <p>AQI ${item.aqi}</p>
    </article>
  `;
}

function renderBandRow(label, count, total, className) {
  const width = total ? Math.max(6, Math.round((count / total) * 100)) : 0;
  return `
    <article class="band-row">
      <div class="band-row__head">
        <span class="band-row__label ${className}">${label}</span>
        <strong>${count}</strong>
      </div>
      <div class="band-row__track">
        <div class="band-row__fill ${className}" style="width:${width}%"></div>
      </div>
    </article>
  `;
}

function average(nums) {
  return nums.reduce((sum, value) => sum + value, 0) / nums.length;
}

function initHomePage() {
  const stateCountEl = document.getElementById("stateCount");
  const yearRangeEl = document.getElementById("yearRange");
  const topStatesEl = document.getElementById("topStates");
  const cleanStatesEl = document.getElementById("cleanStates");
  const avgAqiEl = document.getElementById("avgAqi");
  const worstStateEl = document.getElementById("worstState");
  const worstStateTextEl = document.getElementById("worstStateText");
  const bestStateEl = document.getElementById("bestState");
  const bestStateTextEl = document.getElementById("bestStateText");
  const poorOrWorseCountEl = document.getElementById("poorOrWorseCount");
  const bandBreakdownEl = document.getElementById("bandBreakdown");
  const topRangeEl = document.getElementById("topRange");
  const bottomRangeEl = document.getElementById("bottomRange");
  const aqiSpreadEl = document.getElementById("aqiSpread");

  if (
    !stateCountEl ||
    !yearRangeEl ||
    !topStatesEl ||
    !cleanStatesEl ||
    !avgAqiEl ||
    !worstStateEl ||
    !worstStateTextEl ||
    !bestStateEl ||
    !bestStateTextEl ||
    !poorOrWorseCountEl ||
    !bandBreakdownEl ||
    !topRangeEl ||
    !bottomRangeEl ||
    !aqiSpreadEl
  ) {
    return;
  }

  const ranking = allStateRankings();
  const topStates = ranking.slice(0, 3);
  const cleanerStates = [...ranking].reverse().slice(0, 3);
  const aqiValues = ranking.map((item) => item.aqi);
  const worstState = ranking[0];
  const bestState = ranking[ranking.length - 1];
  const poorOrWorseCount = ranking.filter((item) =>
    ["Poor", "Very Poor", "Severe"].includes(item.status.label)
  ).length;
  const topFive = ranking.slice(0, 5).map((item) => item.aqi);
  const bottomFive = ranking.slice(-5).map((item) => item.aqi);
  const distribution = [
    { label: "Good", className: "status-good" },
    { label: "Moderate", className: "status-moderate" },
    { label: "Poor", className: "status-poor" },
    { label: "Very Poor", className: "status-very-poor" },
    { label: "Severe", className: "status-severe" }
  ].map((band) => ({
    ...band,
    count: ranking.filter((item) => item.status.label === band.label).length
  }));

  stateCountEl.textContent = `${AQI_DATA.states.length}+`;
  yearRangeEl.textContent = `${YEARS[0]}-${YEARS[YEARS.length - 1]}`;
  topStatesEl.innerHTML = topStates.map((item, index) => renderStateCard(item, index, "High")).join("");
  cleanStatesEl.innerHTML = cleanerStates.map((item, index) => renderStateCard(item, index, "Low")).join("");
  avgAqiEl.textContent = `${Math.round(average(aqiValues))}`;
  worstStateEl.textContent = worstState.name;
  worstStateTextEl.textContent = `Current AQI ${worstState.aqi} (${worstState.status.label})`;
  bestStateEl.textContent = bestState.name;
  bestStateTextEl.textContent = `Current AQI ${bestState.aqi} (${bestState.status.label})`;
  poorOrWorseCountEl.textContent = `${poorOrWorseCount}`;
  bandBreakdownEl.innerHTML = distribution
    .map((band) => renderBandRow(band.label, band.count, ranking.length, band.className))
    .join("");
  topRangeEl.textContent = `${Math.min(...topFive)}-${Math.max(...topFive)} AQI`;
  bottomRangeEl.textContent = `${Math.min(...bottomFive)}-${Math.max(...bottomFive)} AQI`;
  aqiSpreadEl.textContent = `${worstState.aqi - bestState.aqi} AQI`;
}

initHomePage();
