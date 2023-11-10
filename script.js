const getData = async () => {
  let data = [
    {
      day: "mon",
      amount: 17.45,
    },
    {
      day: "tue",
      amount: 34.91,
    },
    {
      day: "wed",
      amount: 52.36,
    },
    {
      day: "thu",
      amount: 31.07,
    },
    {
      day: "fri",
      amount: 23.39,
    },
    {
      day: "sat",
      amount: 43.28,
    },
    {
      day: "sun",
      amount: 25.48,
    },
  ];
  if (data.length > 0) {
    return data;
  }

  const response = await fetch("data.json");
  data = await response.json();
  return data;
};


const setBarHeights = (data) => {
    const maxAmount = data.reduce((acc, curr) => Math.max(acc, curr.amount), 0);

    data.forEach((expense) => {
      const { day, amount } = expense;
      
      const bar = document.getElementById(`bar-${day}`);
      console.log(bar)
      bar.style.height = `${(200 * amount) / maxAmount}px`;
    });
}
window.onload = async () => {
  const data = await getData();
  setBarHeights(data)
};
