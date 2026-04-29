import {
  AQI_DATA,
  allStateRankings,
  buildRecommendations,
  forecastStateAqi,
  stateMonthlyAqi,
  stateTrend
} from "../models/aqiModel.js";
import { renderDashboard } from "../views/dashboardView.js";
import { renderRanking, setActiveRankingItem } from "../views/rankingView.js";

const searchRefs = {
  form: document.getElementById("placeSearchForm"),
  input: document.getElementById("placeSearchInput"),
  suggestions: document.getElementById("placeSearchSuggestions"),
  status: document.getElementById("placeSearchStatus")
};

const explorerSummaryRefs = {
  stateCount: document.getElementById("explorerStateCount"),
  averageAqi: document.getElementById("explorerAvgAqi"),
  criticalCount: document.getElementById("explorerCriticalCount"),
  focusState: document.getElementById("explorerFocusState"),
  focusText: document.getElementById("explorerFocusText")
};

function normalizeText(value) {
  return value.trim().toLowerCase();
}

function buildSearchIndex() {
  return AQI_DATA.states.flatMap((state) => [
    {
      label: state.name,
      stateName: state.name,
      type: "state"
    },
    ...state.districts.map((district) => ({
      label: district.name,
      stateName: state.name,
      type: "district"
    }))
  ]);
}

function populateSuggestions(searchIndex) {
  if (!searchRefs.suggestions) return;

  const options = searchIndex
    .map((entry) => {
      const suffix = entry.type === "district" ? ` (${entry.stateName})` : "";
      return `<option value="${entry.label}">${entry.label}${suffix}</option>`;
    })
    .join("");

  searchRefs.suggestions.innerHTML = options;
}

function renderExplorerSummary(ranking) {
  const { stateCount, averageAqi, criticalCount, focusState, focusText } = explorerSummaryRefs;
  if (!stateCount || !averageAqi || !criticalCount || !focusState || !focusText || !ranking.length) return;

  const average =
    ranking.reduce((sum, item) => sum + item.aqi, 0) / ranking.length;
  const poorOrWorse = ranking.filter((item) =>
    ["Poor", "Very Poor", "Severe"].includes(item.status.label)
  ).length;
  const highest = ranking[0];

  stateCount.textContent = `${ranking.length}`;
  averageAqi.textContent = `${Math.round(average)}`;
  criticalCount.textContent = `${poorOrWorse}`;
  focusState.textContent = highest.name;
  focusText.textContent = `AQI ${highest.aqi} in the ${highest.status.label.toLowerCase()} band.`;
}

function createSearchHelpers(ranking, onSelectState, getActiveState) {
  const searchIndex = buildSearchIndex();
  const rankingByState = new Map(ranking.map((item) => [item.name, item]));

  function getMatches(query) {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) return ranking;

    const matchedStates = new Set(
      searchIndex
        .filter((entry) => normalizeText(entry.label).includes(normalizedQuery))
        .map((entry) => entry.stateName)
    );

    return ranking.filter((item) => matchedStates.has(item.name));
  }

  function setSearchStatus(message) {
    if (searchRefs.status) {
      searchRefs.status.textContent = message;
    }
  }

  function updateRankingFromQuery(query) {
    const matches = getMatches(query);
    renderRanking(matches, onSelectState);
    setActiveRankingItem(normalizeText(query) ? null : getActiveState());

    if (!normalizeText(query)) {
      setSearchStatus("Search by state like Delhi or district like Patna.");
      return matches;
    }

    if (matches.length) {
      setSearchStatus(`${matches.length} match${matches.length === 1 ? "" : "es"} found in the explorer.`);
    } else {
      setSearchStatus("No matching place found. Try a state or district from the dataset.");
    }

    return matches;
  }

  function findBestMatch(query) {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) return null;

    const exactEntry =
      searchIndex.find((entry) => normalizeText(entry.label) === normalizedQuery) ??
      searchIndex.find((entry) => normalizeText(entry.stateName) === normalizedQuery);
    if (exactEntry) {
      return rankingByState.get(exactEntry.stateName) ?? null;
    }

    return getMatches(query)[0] ?? null;
  }

  populateSuggestions(searchIndex);

  return {
    findBestMatch,
    setSearchStatus,
    updateRankingFromQuery
  };
}

function previewState(stateName) {
  const series = stateTrend(stateName);
  const monthlySeries = stateMonthlyAqi(stateName);
  const forecastSeries = forecastStateAqi(stateName, 5);
  const current = series[series.length - 1];
  const recommendations = buildRecommendations(stateName, current.profile);

  setActiveRankingItem(stateName);
  renderDashboard(stateName, series, monthlySeries, forecastSeries, recommendations);
}

export function initAqiController() {
  const ranking = allStateRankings();
  let activeState = "Delhi";
  const selectState = (stateName) => {
    activeState = stateName;
    previewState(stateName);
    if (searchRefs.input) {
      searchRefs.input.value = stateName;
    }
  };
  const search = createSearchHelpers(ranking, selectState, () => activeState);

  renderExplorerSummary(ranking);
  renderRanking(ranking, selectState);
  selectState(activeState);

  if (searchRefs.form && searchRefs.input) {
    searchRefs.input.addEventListener("input", (event) => {
      search.updateRankingFromQuery(event.target.value);
    });

    searchRefs.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const match = search.findBestMatch(searchRefs.input.value);

      if (match) {
        selectState(match.name);
        search.updateRankingFromQuery(match.name);
        setActiveRankingItem(match.name);
        search.setSearchStatus(`${match.name} loaded in the explorer.`);
      } else {
        search.updateRankingFromQuery(searchRefs.input.value);
      }
    });
  }
}
