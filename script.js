const quotes = [
  {
    text: "“I am the light of the world. Whoever follows me will not walk in darkness, but will have the light of life.”",
    ref: "— John 8:12"
  },
  { text: "“Do not pray for easy lives. Pray to be stronger men. Do not pray for tasks equal to your powers. Pray for powers equal to your tasks”", ref: "— Jordan 8:57" },
  { text: "“Throughout Heaven and Earth there is no finer slut than you”", ref: "— Jake 9:01" },
  { text: "“Nah I'd Win.”", ref: "— Aiden 0:00" },
  { text: "“Last game I meant to Groom Jake.”", ref: "— Ethan 12:32" },
  { text: "“Know what you stand for, even if that means nothing at all.”", ref: "— John 1:59" },
  { text: "“My Magic is Never Giving Up.”", ref: "— Nick 9:21" },
  { text: "“Nah I'd Win.”", ref: "— Connor 0:00" },
];

document.addEventListener("DOMContentLoaded", () => {
  const rotator = document.querySelector(".left-panel .quote-rotator");
  if (!rotator) return;

  const qEl = rotator.querySelector(".rot-quote");
  const rEl = rotator.querySelector(".rot-ref");
  const dotsEl = rotator.querySelector(".rot-dots");

  let idx = 0;
  const fadeMs = 400;
  const holdMs = 4500;

  // build dots
  dotsEl.innerHTML = quotes.map((_, i) => `<span data-i="${i}"></span>`).join("");
  const dots = Array.from(dotsEl.querySelectorAll("span"));

  function render(i) {
    qEl.textContent = quotes[i].text;
    rEl.textContent = quotes[i].ref;
    dots.forEach((d, di) => d.classList.toggle("active", di === i));
  }

  function swap(nextIdx) {
    qEl.classList.add("rot-fade-out");
    rEl.classList.add("rot-fade-out");

    setTimeout(() => {
      idx = nextIdx;
      render(idx);
      qEl.classList.remove("rot-fade-out");
      rEl.classList.remove("rot-fade-out");
    }, fadeMs);
  }

  dotsEl.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const i = Number(t.dataset.i);
    if (!Number.isFinite(i) || i === idx) return;
    swap(i);
  });

  render(idx);

let intervalId = null;

function startRotation() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    swap((idx + 1) % quotes.length);
  }, holdMs);
}

function stopRotation() {
  clearInterval(intervalId);
  intervalId = null;
}

/* Pause on hover */
const hoverTarget = document.querySelector(".left-panel");
if (hoverTarget) {
  hoverTarget.addEventListener("pointerenter", stopRotation);
  hoverTarget.addEventListener("pointerleave", startRotation);
}

/* Start rotation initially */
startRotation();
});