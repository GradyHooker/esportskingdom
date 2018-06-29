$(function() {
	if(Math.floor(Math.random() * 100) > 50) {
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
			
			$('.post-related .plug-link')[0].href = "https://www.kinguin.net/" + selectedBanner.link + "?r=29383&bannerid=" + selectedBanner.id;
			$('.post-related .plug-image')[0].src = "/assets/plugs/kinguin/" + selectedBanner.name + ".jpg";
			$('.post-related .plug-image-wide')[0].src = "/assets/plugs/kinguin/" + selectedBanner.name + "-wide.jpg";
		});
	} else {
		$('.post-related .plug-link')[0].href = "https://www.teepublic.com/user/KingOfEsports/";
		$('.post-related .plug-image')[0].src = "/assets/plugs/shirts.jpg";
		$('.post-related .plug-image-wide')[0].src = "/assets/plugs/shirts-wide.jpg";
	}
});