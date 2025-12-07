(function () {

let liveRate = null;


async function fetchLiveRate() {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await res.json();
    liveRate = data.rates.INR; 
  } catch (error) {
    liveRate = null; 
  }
}

fetchLiveRate();


setInterval(fetchLiveRate, 600000);



const category = document.getElementById("category");
const valueInput = document.getElementById("value");
const direction = document.getElementById("direction");
const result = document.getElementById("result");


async function convert() {
  const val = parseFloat(valueInput.value);
  if (isNaN(val)) {
    result.textContent = "Please enter a valid number";
    return;
  }

  const cat = category.value;
  const dir = direction.value;
  let res = "";

  switch (cat) {
    case "length":
      res =
        dir === "forward"
          ? `${val} meter = ${(val / 1000).toFixed(3)} kilometer`
          : `${val} kilometer = ${(val * 1000).toFixed(2)} meter`;
      break;

    case "weight":
      res =
        dir === "forward"
          ? `${val} kilogram = ${(val * 1000).toFixed(2)} gram`
          : `${val} gram = ${(val / 1000).toFixed(3)} kilogram`;
      break;

    case "temperature":
      res =
        dir === "forward"
          ? `${val} °C = ${((val * 9) / 5 + 32).toFixed(2)} °F`
          : `${val} °F = ${(((val - 32) * 5) / 9).toFixed(2)} °C`;
      break;

    case "time":
      res =
        dir === "forward"
          ? `${val} hour = ${(val * 60).toFixed(2)} minutes`
          : `${val} minutes = ${(val / 60).toFixed(2)} hours`;
      break;

    case "area":
      res =
        dir === "forward"
          ? `${val} sq meter = ${(val * 10.7639).toFixed(2)} sq feet`
          : `${val} sq feet = ${(val / 10.7639).toFixed(2)} sq meter`;
      break;

    case "volume":
      res =
        dir === "forward"
          ? `${val} liter = ${(val * 1000).toFixed(2)} milliliters`
          : `${val} milliliters = ${(val / 1000).toFixed(2)} liters`;
      break;

    case "speed":
      res =
        dir === "forward"
          ? `${val} km/h = ${(val / 1.609).toFixed(2)} mph`
          : `${val} mph = ${(val * 1.609).toFixed(2)} km/h`;
      break;

    case "currency":

      if (liveRate !== null) {
        res =
          dir === "forward"
            ? `${val} INR = ${(val / liveRate).toFixed(2)} USD (Live Rate)`
            : `${val} USD = ${(val * liveRate).toFixed(2)} INR (Live Rate)`;
      } else {
        res =
          dir === "forward"
            ? `${val} INR = ${(val / 83.15).toFixed(2)} USD`
            : `${val} USD = ${(val * 83.15).toFixed(2)} INR`;
      }
      break;

    default:
      res = "Invalid category";
  }

  result.textContent = res;
}

category.addEventListener("change", convert);
valueInput.addEventListener("input", convert);
direction.addEventListener("change", convert);


})(); 
