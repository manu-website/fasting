(function($) {
	$.fn.countdown = function(options, callback) {

		//custom 'this' selector
		thisEl = $(this);

		//array of custom settings
		var settings = { 
			'end1': "2 mar 2022 18:54:00",
			'end2': "3 mar 2022 18:55:00",
			'end3': "4 mar 2022 18:56:00",
			'end4': "5 mar 2022 18:57:00",
			'end5': "6 mar 2022 18:58:00",
			'end6': "7 mar 2022 18:59:00",
			'end7': "8 mar 2022 19:01:00",
			'end8': "9 mar 2022 19:02:00",
			'end9': "10 mar 2022 19:03:00",
			'end10': "11 mar 2022 19:04:00",
			'end11': "12 mar 2022 19:05:00",
			'end12': "13 mar 2022 19:06:00",
			'end13': "14 mar 2022 19:07:00",
			'end14': "15 mar 2022 19:08:00",
			'end15': "16 mar 2022 19:09:00",
			'end16': "17 mar 2022 19:10:00",
			'end17': "18 mar 2022 19:11:00",
			'end18': "19 mar 2022 19:12:00",
			'end19': "20 mar 2022 19:13:00",
    		'start1': "2 mar 2022 07:34:00",
			'start2': "3 mar 2022 07:32:00",
			'start3': "4 mar 2022 07:31:00",
			'start4': "5 mar 2022 07:29:00",
			'start5': "6 mar 2022 07:28:00",
			'start6': "7 mar 2022 07:26:00",
			'start7': "8 mar 2022 07:25:00",
			'start8': "9 mar 2022 07:23:00",
			'start9': "10 mar 2022 07:21:00",
			'start10': "11 mar 2022 07:20:00",
			'start11': "12 mar 2022 07:18:00",
			'start12': "13 mar 2022 07:17:00",
			'start13': "14 mar 2022 07:15:00",
			'start14': "15 mar 2022 07:13:00",
			'start15': "16 mar 2022 07:12:00",
			'start16': "17 mar 2022 07:10:00",
			'start17': "18 mar 2022 07:09:00",
			'start18': "19 mar 2022 07:07:00",
			'start19': "20 mar 2022 07:05:00",
			'format': "on"
		};

		//append the settings array to options
		if(options) {
			$.extend(settings, options);
		}
		
		//main countdown function
		function countdown_proc() {

			var dt = new Date();
			var ti = dt.getDate();
			ti = ti-1;
			var i;
			if(ti > 19 || ti < 1 )
			{
				i = 1;
			}
			else
			{
				i = ti;
			}

			var timer;
			var dt1 = 'start';
			var dt2 = 'end';
			var dt3 = 'start';
			dt1 +=i;
			dt2 +=i;
			var tinit = new Date(settings['start1']);
			var tstart = new Date(settings[dt1]);
			var tend = new Date(settings[dt2]);

			if(dt < tinit)
			{
				timer = dt1;
			}
			else
			{
				if(dt > tstart && dt < tend)
				{
				timer = dt2;
				}

				if(dt > tend )
				{
				i = i + 1;
				dt3 +=i;
				timer = dt3;
				}

				if(dt < tstart)
				{
					timer = dt1;
				}
			}

			eventDate = Date.parse(settings[timer]) / 1000;
			currentDate = Math.floor($.now() / 1000);
			

			if(eventDate <= currentDate) {
				callback.call(this);
				clearInterval(interval);
			}
			
			seconds = eventDate - currentDate;
			
			days = Math.floor(seconds / (60 * 60 * 24)); //calculate the number of days
			seconds -= days * 60 * 60 * 24; //update the seconds variable with no. of days removed
			
			hours = Math.floor(seconds / (60 * 60));
			seconds -= hours * 60 * 60; //update the seconds variable with no. of hours removed
			
			minutes = Math.floor(seconds / 60);
			seconds -= minutes * 60; //update the seconds variable with no. of minutes removed
			
			//conditional Ss
			if (days == 1) { thisEl.find(".timeRefDays").text("day"); } else { thisEl.find(".timeRefDays").text("days"); }
			if (hours == 1) { thisEl.find(".timeRefHours").text("hour"); } else { thisEl.find(".timeRefHours").text("hours"); }
			if (minutes == 1) { thisEl.find(".timeRefMinutes").text("minute"); } else { thisEl.find(".timeRefMinutes").text("minutes"); }
			if (seconds == 1) { thisEl.find(".timeRefSeconds").text("second"); } else { thisEl.find(".timeRefSeconds").text("seconds"); }
			
			//logic for the two_digits ON setting
			if(settings['format'] == "on") {
				days = (String(days).length >= 2) ? days : "0" + days;
				hours = (String(hours).length >= 2) ? hours : "0" + hours;
				minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
				seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
			}
			
			//update the countdown's html values.
			if(!isNaN(eventDate)) {
				thisEl.find(".days").text(days);
				thisEl.find(".hours").text(hours);
				thisEl.find(".minutes").text(minutes);
				thisEl.find(".seconds").text(seconds);
			} else { 
				alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00");
				clearInterval(interval); 
			}
		}
		
		//run the function
		countdown_proc();
		
		//loop the function
		interval = setInterval(countdown_proc, 1000);
		
	}
}) (jQuery);