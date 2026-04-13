export function createTrendCard(item, heightPct) {
  const card = document.createElement("article");
  card.className = "bar-card";
  card.innerHTML = `
    <div class="bar-rail"><div class="bar-fill" style="height:${heightPct}%"></div></div>
    <span class="bar-year">Year ${item.year}</span>
    <strong class="bar-value">AQI ${item.aqi}</strong>
  `;
  return card;
}

export function createForecastCard(item, stateClass, widthPct) {
  const card = document.createElement("article");
  card.className = "forecast-card";
  card.innerHTML = `
    <div class="forecast-card__head">
      <strong>${item.year}</strong>
      <span class="forecast-card__status ${stateClass.className}">${stateClass.label}</span>
    </div>
    <div class="forecast-meter">
      <div class="forecast-meter__fill" style="width:${widthPct}%"></div>
    </div>
    <div class="forecast-card__value">Predicted AQI ${item.aqi}</div>
  `;
  return card;
}

export function createPollutantRow(pollutant, value) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${pollutant}</td><td>${value.toFixed(2)}</td>`;
  return row;
}

export function createPollutantHighlightCard(pollutant, formattedValue, unit) {
  const card = document.createElement("article");
  card.className = "pollutant-highlight";
  card.innerHTML = `
    <span class="pollutant-highlight__label">${pollutant}</span>
    <strong>${formattedValue}</strong>
    <span class="pollutant-highlight__unit">${unit}</span>
  `;
  return card;
}

export function createRecommendationItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  return li;
}

export function applyMetricCard(element, value) {
  element.textContent = value;
}
