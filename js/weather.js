window.addEventListener("load", () => {
  let longitude;
  let latitude;
  let temperatureDegrees = document.querySelector(".temperature-degrees");
  let weatherLocation = document.querySelector(".weather-location");
  let weatherSummary = document.querySelector(".weather-summary");
  let temperatureType = document.querySelector(".temperature-type");
  const weatherTemperature = document.querySelector(".weather-temperature");
  let today = new Date();
  let hour = today.getHours();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/3c50998260ae92b99375d3973343b38f/${latitude},${longitude}`;

      fetch(api)
        .then(weatherData => {
          return weatherData.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //Set DOM Elements from the API
          temperatureDegrees.textContent = temperature;
          weatherSummary.textContent = summary;

          let cityName = data.timezone.split("/");
          weatherLocation.textContent = cityName[1].replace(/_/g, " ");
          //Set Icon
          setIcons(icon, document.querySelector(".icon"));

          //Fahrenheit-Celsius conversion formulae
          let celsius = (temperature - 32) * (5 / 9);
          temperatureDegrees.textContent = Math.floor(celsius);

          //Toggle temperature between Celsius/Fahrenheit
          if (localStorage.getItem("Temperature-type") === "Celsius") {
            temperatureType.textContent = "C";
            temperatureDegrees.textContent = Math.floor(celsius);
          } else if (
            localStorage.getItem("Temperature-type") === "Fahrenheit"
          ) {
            temperatureType.textContent = "F";
            temperatureDegrees.textContent = temperature;
          }

          weatherTemperature.addEventListener("click", () => {
            if (temperatureType.textContent === "F") {
              temperatureType.textContent = "C";
              temperatureDegrees.textContent = Math.floor(celsius);
              localStorage.setItem("Temperature-type", "Celsius");
            } else {
              temperatureType.textContent = "F";
              temperatureDegrees.textContent = temperature;
              localStorage.setItem("Temperature-type", "Fahrenheit");
            }
          });
        });
    });
  }
  function setIcons(icon, iconID) {
    let today = new Date(),
      hour = today.getHours();
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();

    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
