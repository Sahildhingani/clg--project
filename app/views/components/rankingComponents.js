export function createRankingItem(item, index, onSelectState) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "ranking-item";
  button.dataset.state = item.name;
  button.innerHTML = `
    <span class="ranking-item__rank">#${index + 1}</span>
    <span class="ranking-item__state">
      <strong>${item.name}</strong>
      <small class="${item.status.className}">${item.status.label}</small>
    </span>
    <span class="ranking-item__aqi">AQI ${item.aqi}</span>
  `;
  button.addEventListener("click", () => {
    onSelectState(item.name);
  });
  return button;
}
