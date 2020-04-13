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
			album = jsonData[index];
			albumCoverElement = document.createElement('li');
			$(albumCoverElement).html('<a href="/photos/' + album.shortname + '"><figure><img src="https://live.staticflickr.com/65535/' + album.cover + '_w.jpg" alt="' + album.name + '"><figcaption><span class="count">' + album.photos.length +'</span><h3>' + album.name + '</h3></figcaption></figure></a>');
			$(listElement).append(albumCoverElement);
		}
		
		$(albumContainer).append(listElement);
		$('.single-page-cont-photos').append(albumContainer);
	});
}

function makePhotosFull(albumName) {
	$('.photo-image').on('load', reorganisePhotos);
	$(window).resize(reorganisePhotos);
	reorganisePhotos();
}

function reorganisePhotos() {
	var prefHeight = 200;
	if($(window).width() < 1000) {
		prefHeight = 150;
	}
	
	var minPerRow = 2;
	if($(window).width() < 420) {
		minPerRow = 1;
	}
	
	var totalWidth = $('.photos').width();
	var rowWidth = 0;
	var rowheight = 0;
	var row = [];
	
	$('.photo-image').each(function () {
		$(this).height(prefHeight);
		var imgWidth = $(this).width() + 4;
		rowWidth += imgWidth;
		
		if(rowWidth > totalWidth && row.length >= minPerRow) {
			rowWidth -= imgWidth;
			rowHeight = Math.max((totalWidth/rowWidth)*prefHeight,(rowWidth/totalWidth)*prefHeight);
			$(row).each(function() {
				$(this).height(rowHeight);
			});
			
			row = [];
			rowWidth = imgWidth;
		}
		row.push(this);
	});
}