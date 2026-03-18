import {
  AQI_DATA,
  POLLUTANTS,
  YEARS,
  clusterLabel,
  dominantPollutants,
  forecastConfidenceLabel,
  getAqiClass,
  trendSummary
} from "../models/aqiModel.js";
import {
  applyMetricCard,
  createForecastCard,
  createPollutantHighlightCard,
  createPollutantRow,
  createRecommendationItem,
  createTrendCard
} from "./components/dashboardComponents.js";

const refs = {
  placeTitle: document.getElementById("placeTitle"),
  currentAqi: document.getElementById("currentAqi"),
  currentStatus: document.getElementById("currentStatus"),
  currentStatusBadge: document.getElementById("currentStatusBadge"),
  trendLabel: document.getElementById("trendLabel"),
  trendChart: document.getElementById("trendChart"),
  forecastChart: document.getElementById("forecastChart"),
  pollutantBody: document.getElementById("pollutantBody"),
  pollutantHighlights: document.getElementById("pollutantHighlights"),
  modelNote: document.getElementById("modelNote"),
  forecastText: document.getElementById("forecastText"),
  recommendationList: document.getElementById("recommendationList"),
  summaryHeadline: document.getElementById("summaryHeadline"),
  summaryText: document.getElementById("summaryText"),
  insightDrivers: document.getElementById("insightDrivers"),
  insightProjection: document.getElementById("insightProjection"),
  insightChange: document.getElementById("insightChange"),
  insightConfidence: document.getElementById("insightConfidence"),
  focusCallout: document.getElementById("focusCallout")
};

function formatPollutantValue(value) {
  return value < 10 ? value.toFixed(2) : value.toFixed(1);
}

function renderTrend(values) {
  refs.trendChart.innerHTML = "";
  const maxAqi = Math.max(...values.map((value) => value.aqi), 1);

  for (const item of values) {
    const heightPct = Math.max(5, Math.round((item.aqi / maxAqi) * 100));
    refs.trendChart.appendChild(createTrendCard(item, heightPct));
  }
}

function renderForecast(values) {
  refs.forecastChart.innerHTML = "";
  const maxAqi = Math.max(...values.map((value) => value.aqi), 1);

  for (const item of values) {
    const stateClass = getAqiClass(item.aqi);
    const widthPct = Math.max(8, Math.round((item.aqi / maxAqi) * 100));
    refs.forecastChart.appendChild(createForecastCard(item, stateClass, widthPct));
  }
}

function renderPollutants(profile) {
  refs.pollutantBody.innerHTML = "";
  for (const pollutant of POLLUTANTS) {
    refs.pollutantBody.appendChild(createPollutantRow(pollutant, profile[pollutant]));
  }
}

function renderPollutantHighlights(profile) {
  refs.pollutantHighlights.innerHTML = "";
  const highlights = Object.entries(profile)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  for (const [pollutant, value] of highlights) {
    refs.pollutantHighlights.appendChild(
      createPollutantHighlightCard(pollutant, formatPollutantValue(value), AQI_DATA.unit)
    );
  }
}

function renderRecommendations(items) {
  refs.recommendationList.innerHTML = "";
  for (const item of items) {
    refs.recommendationList.appendChild(createRecommendationItem(item));
  }
}

export function renderDashboard(stateName, series, forecastSeries, recommendations) {
  const current = series[series.length - 1];
  const stateClass = getAqiClass(current.aqi);
  const firstForecast = forecastSeries[0];
  const lastForecast = forecastSeries[forecastSeries.length - 1];
  const lastForecastClass = getAqiClass(lastForecast.aqi);
  const topDrivers = dominantPollutants(current.profile, 2);
  const trendDelta = lastForecast.aqi - current.aqi;
  const direction = trendDelta < 0 ? "improve" : trendDelta > 0 ? "worsen" : "stay similar";
  const signedChange = trendDelta > 0 ? `+${trendDelta}` : `${trendDelta}`;

  refs.placeTitle.textContent = `${stateName} AQI Overview`;
  applyMetricCard(refs.currentAqi, `${current.aqi}`);
  applyMetricCard(refs.currentStatus, stateClass.label);
  refs.currentStatus.className = stateClass.className;
  refs.currentStatusBadge.textContent = stateClass.label;
  refs.currentStatusBadge.className = `status-badge ${stateClass.className}`;
  applyMetricCard(refs.trendLabel, trendSummary(series));

  renderTrend(series);
  renderForecast(forecastSeries);
  renderPollutants(current.profile);
  renderPollutantHighlights(current.profile);
  renderRecommendations(recommendations);

  refs.summaryHeadline.textContent =
    `${stateName} is currently in the ${stateClass.label.toLowerCase()} AQI band, with ${topDrivers.join(" and ")} leading the pollution mix.`;
  refs.summaryText.textContent =
    `The model expects AQI to ${direction} from ${firstForecast.year} to ${lastForecast.year}. By ${lastForecast.year}, the projected AQI is ${lastForecast.aqi}.`;
  applyMetricCard(refs.insightDrivers, topDrivers.join(", "));
  applyMetricCard(refs.insightProjection, `${lastForecast.aqi} (${lastForecastClass.label})`);
  applyMetricCard(refs.insightChange, `${signedChange} AQI by ${lastForecast.year}`);
  applyMetricCard(refs.insightConfidence, forecastConfidenceLabel());
  refs.focusCallout.textContent = `Primary focus for ${stateName}: ${clusterLabel(stateName)}.`;
  refs.forecastText.textContent =
    `The in-browser regression model estimates AQI may reach ${lastForecast.aqi} in ${lastForecast.year} for ${stateName} if the current pollutant trajectory continues. That keeps the state in the ${lastForecastClass.label.toLowerCase()} band.`;
  refs.forecastText.className = `forecast-text ${lastForecastClass.className}`;
  refs.modelNote.textContent =
    `Model used: simple linear regression trained on ${YEARS.join(", ")} state-average pollutant values, then converted into AQI for 2026-2030.`;
}
