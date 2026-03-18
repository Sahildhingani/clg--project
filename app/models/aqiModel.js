import indiaAirQualityData from "../../data.js";

export const YEARS = indiaAirQualityData.years;
export const POLLUTANTS = indiaAirQualityData.pollutants;
export const AQI_DATA = indiaAirQualityData;

export function average(nums) {
  return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}

export function getStateByName(name) {
  return AQI_DATA.states.find((state) => state.name === name);
}

export function yearPollutantAverage(state, year, pollutant) {
  return average(state.districts.map((district) => district.data[year][pollutant]));
}

export function stateYearProfile(state, year) {
  const profile = {};
  for (const pollutant of POLLUTANTS) {
    profile[pollutant] = yearPollutantAverage(state, year, pollutant);
  }
  return profile;
}

export function estimateAqi(profile) {
  const score =
    profile["PM2.5"] * 1.25 +
    profile.PM10 * 0.42 +
    profile.NO2 * 0.8 +
    profile.SO2 * 0.55 +
    profile.CO * 24 +
    profile.O3 * 0.62;

  return Math.max(0, Math.min(500, Math.round(score)));
}

export function linearRegression(points) {
  const n = points.length;
  const sumX = points.reduce((sum, point) => sum + point.x, 0);
  const sumY = points.reduce((sum, point) => sum + point.y, 0);
  const sumXY = points.reduce((sum, point) => sum + point.x * point.y, 0);
  const sumX2 = points.reduce((sum, point) => sum + point.x * point.x, 0);
  const denominator = n * sumX2 - sumX * sumX;

  if (!denominator) {
    return { slope: 0, intercept: sumY / n };
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

export function getAqiClass(aqi) {
  if (aqi <= 50) return { label: "Good", className: "status-good" };
  if (aqi <= 100) return { label: "Moderate", className: "status-moderate" };
  if (aqi <= 200) return { label: "Poor", className: "status-poor" };
  if (aqi <= 300) return { label: "Very Poor", className: "status-very-poor" };
  return { label: "Severe", className: "status-severe" };
}

export function forecastConfidenceLabel() {
  if (YEARS.length >= 5) return "Medium";
  return "Low to Medium";
}

export function clusterLabel(stateName) {
  const clusterMap = {
    "north-plains": "Northern plains pollution pattern",
    industrial: "Industrial and freight-heavy pattern",
    "coastal-urban": "Coastal urban and transport pattern",
    hill: "Hill and valley seasonal pattern",
    general: "Mixed urban and local emissions pattern"
  };

  return clusterMap[getStateCluster(stateName)];
}

export function stateTrend(name) {
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

export function dominantPollutants(profile, count = 2) {
  return Object.entries(profile)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([pollutant]) => pollutant);
}

export function getStateCluster(stateName) {
  const northPlainStates = new Set(["Delhi", "Punjab", "Haryana", "Uttar Pradesh", "Rajasthan", "Chandigarh"]);
  const industrialBeltStates = new Set(["Jharkhand", "Chhattisgarh", "Odisha", "West Bengal", "Bihar"]);
  const coastalUrbanStates = new Set([
    "Maharashtra",
    "Gujarat",
    "Goa",
    "Kerala",
    "Tamil Nadu",
    "Karnataka",
    "Andhra Pradesh",
    "Puducherry",
    "Dadra and Nagar Haveli and Daman and Diu"
  ]);
  const hillStates = new Set([
    "Himachal Pradesh",
    "Uttarakhand",
    "Jammu and Kashmir",
    "Ladakh",
    "Sikkim",
    "Arunachal Pradesh",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Manipur",
    "Tripura"
  ]);

  if (northPlainStates.has(stateName)) return "north-plains";
  if (industrialBeltStates.has(stateName)) return "industrial";
  if (coastalUrbanStates.has(stateName)) return "coastal-urban";
  if (hillStates.has(stateName)) return "hill";
  return "general";
}

export function forecastStateAqi(name, yearsAhead = 5) {
  const series = stateTrend(name);
  const pollutantModels = {};

  for (const pollutant of POLLUTANTS) {
    const points = series.map((item) => ({ x: item.year, y: item.profile[pollutant] }));
    pollutantModels[pollutant] = linearRegression(points);
  }

  const startYear = YEARS[YEARS.length - 1] + 1;
  const forecast = [];

  for (let i = 0; i < yearsAhead; i += 1) {
    const year = startYear + i;
    const profile = {};

    for (const pollutant of POLLUTANTS) {
      const prediction = pollutantModels[pollutant].intercept + pollutantModels[pollutant].slope * year;
      profile[pollutant] = Math.max(0, Number(prediction.toFixed(2)));
    }

    forecast.push({
      year,
      profile,
      aqi: estimateAqi(profile)
    });
  }

  return forecast;
}

export function trendSummary(values) {
  const first = values[0].aqi;
  const last = values[values.length - 1].aqi;
  const delta = last - first;

  if (delta < -4) return `Improving (${delta})`;
  if (delta > 4) return `Worsening (+${delta})`;
  return "Stable";
}

export function buildRecommendations(stateName, currentProfile) {
  const cluster = getStateCluster(stateName);
  const topPollutants = dominantPollutants(currentProfile, 3);
  const recommendations = [];

  const pollutantAdvice = {
    "PM2.5": "Cut fine-particle pollution with stricter road-dust control, cleaner household fuel, and tighter construction-site covering.",
    PM10: "Reduce coarse dust through vacuum sweeping, uncovered-load checks, and dust barriers around construction and mining zones.",
    NO2: "Lower traffic-linked NO2 by upgrading bus fleets, improving public transport frequency, and enforcing vehicle-emission checks.",
    SO2: "Bring down SO2 with cleaner industrial fuel, stack scrubbers, and tighter monitoring of thermal and process industries.",
    CO: "Lower CO by reducing congestion, improving fuel quality, and targeting old diesel and biomass-burning sources.",
    O3: "Control ozone by reducing precursor gases from traffic, solvents, fuel evaporation, and industrial emissions during hot months."
  };

  const clusterAdvice = {
    "north-plains":
      "Seasonal action should focus on stubble-burning coordination, winter smog response plans, and emergency curbs on dust and diesel hotspots.",
    industrial:
      "This state will benefit from continuous emissions monitoring in industrial belts, cleaner kiln and boiler technology, and freight-route dust control.",
    "coastal-urban":
      "Priority actions are port and freight electrification, better urban traffic flow, and stricter controls for industrial and construction emissions.",
    hill:
      "Cleaner tourism transport, waste-burning prevention, and cleaner heating fuels can prevent sharp seasonal pollution spikes in valley areas.",
    general:
      "A state clean-air plan should combine city transport upgrades, dust control, cleaner fuels, and tighter local emissions enforcement."
  };

  recommendations.push(clusterAdvice[cluster]);

  for (const pollutant of topPollutants) {
    recommendations.push(pollutantAdvice[pollutant]);
  }

  recommendations.push(
    `District-level targeting will help most in ${stateName}: focus first on the highest ${topPollutants.join(", ")} sources and track yearly reductions against the 2025 baseline.`
  );

  return recommendations.slice(0, 4);
}

export function allStateRankings() {
  const currentYear = YEARS[YEARS.length - 1];

  return AQI_DATA.states
    .map((state) => {
      const profile = stateYearProfile(state, currentYear);
      const aqi = estimateAqi(profile);
      return {
        name: state.name,
        aqi,
        status: getAqiClass(aqi)
      };
    })
    .sort((a, b) => b.aqi - a.aqi);
}
