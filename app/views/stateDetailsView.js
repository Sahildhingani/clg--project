import {
  AQI_DATA,
  MONTHS,
  POLLUTANTS,
  YEARS,
  dominantPollutants,
  forecastConfidenceLabel,
  getAqiClass,
  monthlyShiftSummary,
  trendSummary
} from "../models/aqiModel.js";

const refs = {
  pageTitle: document.getElementById("statePageTitle"),
  pageSubtitle: document.getElementById("statePageSubtitle"),
  currentAqi: document.getElementById("stateCurrentAqi"),
  currentStatus: document.getElementById("stateCurrentStatus"),
  yearlyTrend: document.getElementById("stateYearlyTrend"),
  peakMonth: document.getElementById("statePeakMonth"),
  lineChart: document.getElementById("stateLineChart"),
  barChart: document.getElementById("stateBarChart"),
  monthlyTableBody: document.getElementById("monthlyTableBody"),
  yearlyTableBody: document.getElementById("yearlyTableBody"),
  pollutantMatrixHead: document.getElementById("pollutantMatrixHead"),
  pollutantMatrixBody: document.getElementById("pollutantMatrixBody"),
  districtTableBody: document.getElementById("districtTableBody"),
  recommendationList: document.getElementById("stateRecommendationList"),
  lineSummary: document.getElementById("lineChartSummary"),
  barSummary: document.getElementById("barChartSummary"),
  districtSummary: document.getElementById("districtSummary"),
  confidence: document.getElementById("stateConfidence")
};

function formatValue(value) {
  return value < 10 ? value.toFixed(2) : value.toFixed(1);
}

function renderMonthlyLineChart(values) {
  refs.lineChart.innerHTML = "";
  const maxAqi = Math.max(...values.map((item) => item.aqi), 1);
  const minAqi = Math.min(...values.map((item) => item.aqi), maxAqi);
  const range = Math.max(1, maxAqi - minAqi);
  const getLeftPct = (index) => (values.length === 1 ? 50 : 4 + (index / (values.length - 1)) * 92);
  const points = values
    .map((item, index) => {
      const x = getLeftPct(index);
      const y = 10 + ((maxAqi - item.aqi) / range) * 72;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "detail-line-chart__svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");

  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", points);
  svg.appendChild(polyline);
  refs.lineChart.appendChild(svg);

  for (const [index, item] of values.entries()) {
    const point = document.createElement("div");
    point.className = "detail-line-chart__point";
    point.style.left = `${getLeftPct(index)}%`;
    point.style.top = `${10 + ((maxAqi - item.aqi) / range) * 72}%`;
    point.innerHTML = `
      <span class="detail-line-chart__dot" aria-hidden="true"></span>
      <span class="detail-line-chart__value">${item.aqi}</span>
      <span class="detail-line-chart__label">${item.month}</span>
    `;
    refs.lineChart.appendChild(point);
  }
}

function renderYearlyBarChart(values) {
  refs.barChart.innerHTML = "";
  const maxAqi = Math.max(...values.map((item) => item.aqi), 1);

  for (const item of values) {
    const bar = document.createElement("article");
    bar.className = "detail-bar-card";
    bar.innerHTML = `
      <div class="detail-bar-card__rail">
        <div class="detail-bar-card__fill" style="height:${Math.max(8, Math.round((item.aqi / maxAqi) * 100))}%"></div>
      </div>
      <strong>${item.year}</strong>
      <span>AQI ${item.aqi}</span>
    `;
    refs.barChart.appendChild(bar);
  }
}

function renderMonthlyTable(values) {
  refs.monthlyTableBody.innerHTML = "";
  for (const item of values) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.month}</td><td>${item.aqi}</td>`;
    refs.monthlyTableBody.appendChild(row);
  }
}

function renderYearlyTable(values) {
  refs.yearlyTableBody.innerHTML = "";
  for (const item of values) {
    const row = document.createElement("tr");
    const topDrivers = dominantPollutants(item.profile, 2).join(", ");
    row.innerHTML = `<td>${item.year}</td><td>${item.aqi}</td><td>${topDrivers}</td>`;
    refs.yearlyTableBody.appendChild(row);
  }
}

function renderPollutantMatrix(values) {
  refs.pollutantMatrixHead.innerHTML = `<tr><th>Pollutant</th>${YEARS.map((year) => `<th>${year}</th>`).join("")}</tr>`;
  refs.pollutantMatrixBody.innerHTML = "";

  for (const pollutant of POLLUTANTS) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pollutant}</td>
      ${values.map((item) => `<td>${formatValue(item.profile[pollutant])}</td>`).join("")}
    `;
    refs.pollutantMatrixBody.appendChild(row);
  }
}

function renderDistrictTable(rows) {
  refs.districtTableBody.innerHTML = "";
  for (const rowData of rows) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${rowData.district}</td>
      <td>${rowData.year}</td>
      <td>${formatValue(rowData["PM2.5"])}</td>
      <td>${formatValue(rowData.PM10)}</td>
      <td>${formatValue(rowData.NO2)}</td>
      <td>${formatValue(rowData.SO2)}</td>
      <td>${formatValue(rowData.CO)}</td>
      <td>${formatValue(rowData.O3)}</td>
    `;
    refs.districtTableBody.appendChild(row);
  }
}

function renderRecommendations(items) {
  refs.recommendationList.innerHTML = "";
  for (const text of items) {
    const li = document.createElement("li");
    li.textContent = text;
    refs.recommendationList.appendChild(li);
  }
}

export function renderStateDetails(stateName, yearlySeries, monthlySeries, districtRows, recommendations) {
  const current = yearlySeries[yearlySeries.length - 1];
  const currentStatus = getAqiClass(current.aqi);
  const monthlySummary = monthlyShiftSummary(monthlySeries);
  const districtNames = [...new Set(districtRows.map((row) => row.district))];

  document.title = `${stateName} AQI Details | India AQI Atlas`;
  refs.pageTitle.textContent = `${stateName} AQI Details`;
  refs.pageSubtitle.textContent =
    `Complete state dataset for ${YEARS.join(", ")}, including current-year monthly AQI, yearly AQI trend, pollutant averages, and district values.`;
  refs.currentAqi.textContent = current.aqi;
  refs.currentStatus.textContent = currentStatus.label;
  refs.currentStatus.className = `status-badge ${currentStatus.className}`;
  refs.yearlyTrend.textContent = trendSummary(yearlySeries);
  refs.peakMonth.textContent = `${monthlySummary.peakMonth} (${monthlySummary.peakAqi})`;
  refs.confidence.textContent = forecastConfidenceLabel();

  renderMonthlyLineChart(monthlySeries);
  renderYearlyBarChart(yearlySeries);
  renderMonthlyTable(monthlySeries);
  renderYearlyTable(yearlySeries);
  renderPollutantMatrix(yearlySeries);
  renderDistrictTable(districtRows);
  renderRecommendations(recommendations);

  refs.lineSummary.textContent =
    `${YEARS[YEARS.length - 1]} month-wise AQI line graph for ${stateName}. Lowest visible period is compared against the peak month ${monthlySummary.peakMonth}.`;
  refs.barSummary.textContent =
    `Bar graph of yearly AQI from ${YEARS[0]} to ${YEARS[YEARS.length - 1]}. Current AQI class: ${currentStatus.label}.`;
  refs.districtSummary.textContent =
    `${stateName} dataset includes ${districtNames.length} districts and ${districtRows.length} district-year records. Unit: ${AQI_DATA.unit}.`;
}

