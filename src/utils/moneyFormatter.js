export default function moneyFormatter(money, currency, changeMoney) {
  if (changeMoney) {
    money =
      Number.parseFloat(JSON.parse(localStorage.getItem("rate"))[currency]) *
      Number.parseFloat(money);
  }
  return money.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });
}
