let city_name = ""

let weather = {
  apiKey: "2ed48d800e17f8af1b2a085d0687113b",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";

      city_name=name;
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
    notifyAdvanced()
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

  const notify = (title, msg) => !msg?.actions ? new Notification(title, msg) : serviceWorkerNotify(title, msg);

	const askPermission = async () => {
	  // Is Web Notifications available on the browser
	  if(!("Notification" in window)) {
		console.error("Notification API is not available on this device!");
		return false;
	  }
	
	  // Did the user previously allow notifications
	  if (Notification.permission === 'granted') {
		return true;
	  }
	
	  // If the user denied or hasn't been asked yet
	  if (Notification.permission === 'denied' || Notification.permission === 'default') {
		try {
		  // Ask for permission
		  const permission = await Notification.requestPermission();
		  if (permission === 'granted') {
			return true;
		  }
		  return false;
		} catch (e) {
		  console.error("There was an issue acquiring Notification permissions", e);
		  return false;
		}
	  }
	  return false;
	}

	const notifyAdvanced = async () => {
		const permission = await askPermission();
		if (permission) {
		  const title = "Showing weather of the following location"
		  const msg = {
			badge: "assets/images/icon.png",
			tag: 'location-request',
			icon: 'assets/images/icon.png',
			//image: 'transfer.png',
			body: city_name
      
		  }
		  const rslt = notify(title, msg);
		  console.log('Success!', rslt);
      console.log(city_name)
		}
	  }
	

weather.fetchWeather("Denver");
