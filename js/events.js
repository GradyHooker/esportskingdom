function makeEvents(jsonFile) {
	$.when(
		$.getJSON("/json/events.json", function(json) {
			jsonData = json;
		})
	).then(function() {
		var yearData, yearTitleElement, yearElement, eventData, eventElement, linkTitleElement, linkGroupData, linkGroupElement, linkData, linkElement;

		var yearList = [];
		for(var year in jsonData) {
			yearList.push(year);
		}
		yearList.reverse();
		
		for(var year in yearList) {
			yearData = jsonData[yearList[year]];
			yearTitleElement = document.createElement('h2');
			$(yearTitleElement).addClass('autopage-title').text(yearList[year]);
			yearElement = document.createElement('section');
			$(yearElement).addClass('events');
			yearElementList = document.createElement('ul');
			
			for(var event in yearData) {
				eventData = yearData[event];
				eventElement = document.createElement('li');
				$(eventElement).html('<figure><img src="/assets/events/' + eventData.shortname + '.png" alt="' + eventData.name + '"><figcaption><img src="/assets/logos/medium/' + eventData.logo + '" alt="' + eventData.logotext + '"><h3>' + eventData.name + '</h3></figcaption></figure><p class="name">' + eventData.attended + '</p>');
				
				for(var linkGroup in eventData.links) {
					linkGroupData = eventData.links[linkGroup];
					linkTitleElement = document.createElement('p');
					$(linkTitleElement).addClass('game').text(linkGroup);
					linkGroupElement = document.createElement('div');
					$(linkGroupElement).addClass('links');
					
					for(var link in linkGroupData) {
						linkData = linkGroupData[link];
						if(linkData.target == null) {
							$(linkGroupElement).append('<a href="' + linkData.link + '"><img src="/assets/events/' + eventData.shortname + '/' + linkData.image + '" alt="' + linkData.text + '" title="' + linkData.text + '"></a>');
						} else {
							$(linkGroupElement).append('<a href="' + linkData.link + '" target="' + linkData.target + '"><img src="/assets/events/' + eventData.shortname + '/' + linkData.image + '" alt="' + linkData.text + '" title="' + linkData.text + '"></a>');
						}
					}
					
					$(eventElement).append(linkTitleElement);
					$(eventElement).append(linkGroupElement);
				}
				
				$(yearElementList).append(eventElement);
			}
			
			$('.single-page-cont-events').append(yearTitleElement);
			$(yearElement).append(yearElementList);
			$('.single-page-cont-events').append(yearElement);
		}
	});
}