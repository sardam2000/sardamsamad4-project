const getLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getPosition);
	} else {
		msg.innerText =
			"We could not get your location ! Default location will be shown";
		msg.classList.add("alert");
		msg.classList.add("alert-danger");
		setTimeout(() => {
			msg.remove();
		}, 3000);
	}
};

const getPosition = (position) => {
	let longitude = position.coords.longitude;
	let latitude = position.coords.latitude;
	getCity(longitude, latitude);
	getWeather(longitude, latitude);
};

getLocation();

const getCity = (longitude, latitude) => {
	fetch(
		`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
	)
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("city").innerText = data.locality;
			document.getElementById("country").innerText = data.countryName;
			console.log(data);
		})
		.catch((err) => console.log(err));
};

const getWeather = (longitude, latitude) => {
	fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${parseFloat(
			latitude
		)}&longitude=${parseFloat(
			longitude
		)}&hourly=temperature_2m,relativehumidity_2m&current_weather=true&tempreture_unit=celsius&windspeed_unit=kmh`
	)
		.then((response) => response.json())
		.then((data) => {
			createElements(data);
		})
		.catch((error) => console.log(error));
};

const createElements = (data) => {
	const currentWeatherDiv = document.createElement("div");
	const container = document.getElementById("container");
	currentWeatherDiv.classList.add("row");
	let icon = "";
	let current_temp = data.current_weather.temperature;
	let current_windspeed = data.current_weather.windspeed;

	if (current_temp <= 16) {
		icon = "./pics/frozen.jpg";
	} else if (current_temp > 16 && current_temp <= 25) {
		icon = "./pics/cool.png";
	} else {
		icon = "./pics/hot.png";
	}
	currentWeatherDiv.innerHTML = `
    <div class="m-2 row text-center">
      <h4>Current :</h4>
       <h4 class="md-2"> Temp: ${current_temp} °C  </h4>
      <h4 class="md-5"> Wind Speed: ${current_windspeed} km/h  </h4>
    </div>
  `;
	container.appendChild(currentWeatherDiv);
};