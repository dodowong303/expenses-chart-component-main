const getData = async () => {
  let data = [];

  if (data.length > 0) {
    return data;
  }
  const response = await fetch("https://dodowong303.github.io/expenses-chart-component-main/data.json");
  data = await response.json();
  return data;
};

const getDevice = () => {
  const width = screen.width;
  if (width >= 768) return "web";
  if (width < 768) return "mobile";
};

const getMaxBarHeight = () => {
  const device = getDevice();
  if (device == "web") return 125;
  if (device == "mobile") return 150;
};

const getWeekday = () => {
  const names = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const today = new Date();
  return names[today.getDay()];
};

const setBarHeights = (data) => {
  const maxAmount = data.reduce((acc, curr) => Math.max(acc, curr.amount), 0);
  const maxBarHeight = getMaxBarHeight();
  data.forEach((expense) => {
    const { day, amount } = expense;

    const bar = document.getElementById(`bar-${day}`);
    bar.style.height = `${(maxBarHeight * amount) / maxAmount}px`;
  });
};

const setBarAmounts = (data) => {
  data.forEach((expense) => {
    const { day, amount } = expense;

    const container = document.getElementById(`amount-${day}`);
    container.innerText = `$${amount}`;
  });
};

const setBarListener = () => {
  const bars = Array.from(document.getElementsByClassName("bar"));
  bars.forEach((bar) => {
    const weekday = bar.id.split("-")[1];

    bar.addEventListener("click", () => {
      document.getElementById(`amount-${weekday}`).classList.toggle("hidden");
    });

  });
};

const setTodayBar = () => {
  const weekday = getWeekday();
  const bar = document.getElementById(`bar-${weekday}`);
  bar.classList.add("today");
};
window.onload = async () => {
  const data = await getData();
  setBarAmounts(data);
  setBarHeights(data);
  setBarListener();
  setTodayBar();
};
