import axios from "axios";
const Converter = async () => {
  const apiKey = "21985f0dfc634fab8969be9a40722f59";
  try {
    const { data } = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=USD`
    );
    localStorage.setItem("rate", JSON.stringify(data.rates));
  } catch (err) {}
};

export default Converter;
