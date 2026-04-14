import {
  allStateRankings,
  buildRecommendations,
  forecastStateAqi,
  stateMonthlyAqi,
  stateTrend
} from "../models/aqiModel.js";
import { navigateToStateDetails } from "../utils/stateNavigation.js";
import { renderDashboard } from "../views/dashboardView.js";
import { setActiveMapNode, setupMap } from "../views/mapView.js";
import { renderRanking, setActiveRankingItem } from "../views/rankingView.js";

function previewState(stateName) {
  const series = stateTrend(stateName);
  const monthlySeries = stateMonthlyAqi(stateName);
  const forecastSeries = forecastStateAqi(stateName, 5);
  const current = series[series.length - 1];
  const recommendations = buildRecommendations(stateName, current.profile);

  setActiveMapNode(stateName);
  setActiveRankingItem(stateName);
  renderDashboard(stateName, series, monthlySeries, forecastSeries, recommendations);
}

export function initAqiController() {
  setupMap(navigateToStateDetails);
  renderRanking(allStateRankings(), navigateToStateDetails);
  previewState("Delhi");
}
