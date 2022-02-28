//Hook up the tweet display

$(document).ready(function() {
						   
	$(".countdown").countdown({
				date: "28 feb 2022 14:13:00",
				format: "on"
			},
			
			function() {
				// callback function
			});

});	