import { createRankingItem } from "./components/rankingComponents.js";

const rankingListEl = document.getElementById("rankingList");

export function renderRanking(ranking, onSelectState) {
  rankingListEl.innerHTML = "";

  for (const [index, item] of ranking.entries()) {
    rankingListEl.appendChild(createRankingItem(item, index, onSelectState));
  }
}

export function setActiveRankingItem(name) {
  const items = rankingListEl.querySelectorAll(".ranking-item");
  for (const item of items) {
    item.classList.toggle("active", item.dataset.state === name);
  }
}
