const allNames = Array.from({ length: 100 }, (_, i) => `Name ${i + 1}`);
let usedNames = new Set();
let history = [];
const startBtn = document.getElementById('startBtn');
const namesDisplay = document.getElementById('namesDisplay');
const historyList = document.getElementById('historyList');
const alertSound = document.getElementById('alertSound');

startBtn.addEventListener('click', () => {
  const available = allNames.filter(name => !usedNames.has(name));
  if (available.length < 5) {
    alert('Not enough names left!');
    return;
  }

  const selected = [];
  while (selected.length < 5) {
    const name = available[Math.floor(Math.random() * available.length)];
    if (!selected.includes(name)) selected.push(name);
  }

  selected.forEach(name => usedNames.add(name));
  namesDisplay.innerHTML = '';
  let index = 0;

  const interval = setInterval(() => {
    if (index < 5) {
      const nameEl = document.createElement('div');
      nameEl.textContent = selected[index];
      namesDisplay.appendChild(nameEl);
      index++;
    } else {
      clearInterval(interval);
      alertSound.play();
      history.push(selected);
      updateHistory();
    }
  }, 8000);
});

function updateHistory() {
  historyList.innerHTML = '';
  history.forEach((round, i) => {
    const li = document.createElement('li');
    li.textContent = `Round ${i + 1}: ${round.join(', ')}`;
    historyList.appendChild(li);
  });
}
