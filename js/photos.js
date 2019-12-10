function makePhotos(jsonFile) {
	$.when(
		$.getJSON("/json/photos.json", function(json) {
			jsonData = json;
		})
	).then(function() {
		var album, albumContainer, albumCoverElement;
		
		albumContainer = document.createElement('div');
		$(albumContainer).addClass('albums');
		listElement = document.createElement('ul');
		
		for(var index in jsonData) {
			console.log(jsonData);
			console.log(index);
			album = jsonData[index];
			console.log(album);
			albumCoverElement = document.createElement('li');
			$(albumCoverElement).html('<figure><img src="https://live.staticflickr.com/65535/' + album.cover + '_w.jpg" alt="' + album.name + '"><figcaption><span class="count">' + album.photos.length +'</span><h3>' + album.name + '</h3></figcaption></figure>');
			$(listElement).append(albumCoverElement);
		}
		
		$(albumContainer).append(listElement);
		$('.single-page-cont-photos').append(albumContainer);
	});
}