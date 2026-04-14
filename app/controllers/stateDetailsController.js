import {
  buildRecommendations,
  getStateByName,
  stateDistrictRows,
  stateMonthlyAqi,
  stateYearlyProfiles
} from "../models/aqiModel.js";
import { renderStateDetails } from "../views/stateDetailsView.js";

function getStateFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const requestedState = params.get("state");
  return getStateByName(requestedState) ? requestedState : "Delhi";
}

export function initStateDetailsController() {
  const stateName = getStateFromQuery();
  const yearlySeries = stateYearlyProfiles(stateName);
  const monthlySeries = stateMonthlyAqi(stateName);
  const districtRows = stateDistrictRows(stateName);
  const currentProfile = yearlySeries[yearlySeries.length - 1].profile;
  const recommendations = buildRecommendations(stateName, currentProfile);

  renderStateDetails(stateName, yearlySeries, monthlySeries, districtRows, recommendations);
}

