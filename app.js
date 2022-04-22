

$(document).ready(function(){




	$("#btn").click(function(){
		var city_name = $("#cityname").val();

		getValue(city_name);
		$("#label-1,#label-2,#city,#country,#region,#temp,#unit,#update,#current,#icon").css("visibility", "visible");
		notifyAdvanced()

	});

	function getValue(city){
	
		$.ajax({
			url: 'https://api.apixu.com/v1/forecast.json?key=96a1c5e7625acdf56a1c786c63b9e1d9&q='+city+'&days='+1,
			dataType: 'json',
			success: function(value){
				// console.log(data);

				$.post("Temperature.php", value);

				$("#city").text(value.location.name);
				$("#country").text(value.location.country);
				$("#region").text(value.location.tz_id);

				$("#update").text(value.current.last_updated);

				var temp=value.current.temp_c;


				$("#current").html(temp+"&#8451<br>");

				for (var i = 0; i <24; i++) {



					var str = value.forecast.forecastday[0].hour[i].condition.icon;
					var text = value.forecast.forecastday[0].hour[i].condition.text;
					
					str = str.replace("//", "https://");
				

					if (i==0)
					$("#icon1").html("<img src="+str+" alt='icon'>"+text);


					if (i==1)
					$("#icon2").html("<img src="+str+" alt='icon'>"+text);


					if (i==2)
					$("#icon3").html("<img src="+str+" alt='icon'>"+text);


					if (i==3)
					$("#icon4").html("<img src="+str+" alt='icon'>"+text);



					if (i==4)
					$("#icon5").html("<img src="+str+" alt='icon'>"+text);


					if (i==5)
					$("#icon6").html("<img src="+str+" alt='icon'>"+text);

					if (i==6)
					$("#icon7").html("<img src="+str+" alt='icon'>"+text);

					if (i==7)
					$("#icon8").html("<img src="+str+" alt='icon'>"+text);

					if (i==8)
					$("#icon9").html("<img src="+str+" alt='icon'>"+text);

					if (i==9)
					$("#icon10").html("<img src="+str+" alt='icon'>"+text);

					if (i==10)
					$("#icon11").html("<img src="+str+" alt='icon'>"+text);

					if (i==11)
					$("#icon12").html("<img src="+str+" alt='icon'>"+text);

					if (i==12)
					$("#icon13").html("<img src="+str+" alt='icon'>"+text);

					if (i==13)
					$("#icon14").html("<img src="+str+" alt='icon'>"+text);

					if (i==14)
					$("#icon15").html("<img src="+str+" alt='icon'>"+text);

					if (i==15)
					$("#icon16").html("<img src="+str+" alt='icon'>"+text);

					if (i==16)
					$("#icon17").html("<img src="+str+" alt='icon'>"+text);


					if (i==17)
					$("#icon18").html("<img src="+str+" alt='icon'>"+text);

					if (i==18)
					$("#icon19").html("<img src="+str+" alt='icon'>"+text);

					if (i==19)
					$("#icon20").html("<img src="+str+" alt='icon'>"+text);

					if (i==20)
					$("#icon21").html("<img src="+str+" alt='icon'>"+text);

					if (i==21)
					$("#icon22").html("<img src="+str+" alt='icon'>"+text);

					if (i==22)
					$("#icon23").html("<img src="+str+" alt='icon'>"+text);

					if (i==23)
					$("#icon24").html("<img src="+str+" alt='icon'>"+text);

					// "<img src=""+str+"" alt='icon'>"
				}
				
				
			}
		});
	}

	
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
		}
	  }
	


});
