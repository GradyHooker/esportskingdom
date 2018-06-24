$(function() {
	$.getJSON("/json/kinguinLinks.json", function(data)
	{
		var selectedBanner;
		if(Math.floor(Math.random() * 100) > 60) {
			//Check if we have a matching category
			var category = window.location.pathname.split("/")[1];
			$.each( data, function( i, val ) {
				if(val.category == category) {
					selectedBanner = val;
					return;
				}
			});
		}
		
		if(selectedBanner == null) {
			//Pick a random banner
			selectedBanner = data[Math.floor(Math.random() * data.length)];
		}
		
		$('.post-related .kinguin-link')[0].href = "https://www.kinguin.net/" + selectedBanner.link + "?r=29383&bannerid=" + selectedBanner.id;
		$('.post-related .kinguin-image')[0].src = "/assets/kinguin/" + selectedBanner.name + ".jpg";
		$('.post-related .kinguin-image-wide')[0].src = "/assets/kinguin/" + selectedBanner.name + "-wide.jpg";
	});
});