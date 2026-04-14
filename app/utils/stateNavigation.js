export function buildStateDetailsUrl(stateName) {
  const params = new URLSearchParams({ state: stateName });
  return `./state-details.html?${params.toString()}`;
}

export function navigateToStateDetails(stateName) {
  window.location.href = buildStateDetailsUrl(stateName);
}

