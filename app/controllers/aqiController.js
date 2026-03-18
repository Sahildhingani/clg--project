import {
  allStateRankings,
  buildRecommendations,
  forecastStateAqi,
  stateTrend
} from "../models/aqiModel.js";
import { renderDashboard } from "../views/dashboardView.js";
import { setActiveMapNode, setupMap } from "../views/mapView.js";
import { renderRanking, setActiveRankingItem } from "../views/rankingView.js";

function selectState(stateName) {
  const series = stateTrend(stateName);
  const forecastSeries = forecastStateAqi(stateName, 5);
  const current = series[series.length - 1];
  const recommendations = buildRecommendations(stateName, current.profile);

  setActiveMapNode(stateName);
  setActiveRankingItem(stateName);
  renderDashboard(stateName, series, forecastSeries, recommendations);
}

export function initAqiController() {
  setupMap(selectState);
  renderRanking(allStateRankings(), selectState);
  selectState("Delhi");
}
