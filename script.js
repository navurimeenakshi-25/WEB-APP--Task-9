const apiKey = "YOUR_API_KEY"; // OpenWeather API key

document.getElementById("getWeatherBtn").addEventListener("click", getWeather);
document.getElementById("changeColorBtn").addEventListener("click", changeBackground);

function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherInfo = document.getElementById("weatherInfo");

    if (city === "") {
        weatherInfo.innerHTML = "❌ Please enter a city name";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                weatherInfo.innerHTML = "❌ City not found";
            } else {
                weatherInfo.innerHTML = `
                    <p><strong>City:</strong> ${data.name}</p>
                    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                `;
            }
        })
        .catch(() => {
            weatherInfo.innerHTML = "⚠️ Error fetching weather";
        });
}

function changeBackground() {
    const colors = [
        "linear-gradient(135deg, #667eea, #764ba2)",
        "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        "linear-gradient(135deg, #89f7fe, #66a6ff)",
        "linear-gradient(135deg, #43cea2, #185a9d)"
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
}
