function showCards(cardNum) {
	var newNum = cardNum - 1;
	if($(window).width() > 1600) newNum -= 2;
	else if($(window).width() > 1000) newNum -= 1;
	
	$('.carousel').slick("slickGoTo", parseInt(newNum));
	$('.cardDisplay').fadeIn(400).css("display", "flex");
}

$('.cardDisplay').click(function(e) {
	if(e.target.classList.contains("cardDisplay")) {
		$('.cardDisplay').fadeOut(400);
	}
});

$(document).ready(function(){
	$('.carousel').slick({
		lazyLoad: 'ondemand',
		infinite: true,
		slidesToShow: 5,
		swipeToSlide: true,
		responsive: [
		{
		  breakpoint: 1600,
		  settings: {
			slidesToShow: 3
		  }
		},
		{
		  breakpoint: 1000,
		  settings: {
			slidesToShow: 2
		  }
		},
		{
		  breakpoint: 700,
		  settings: {
			slidesToShow: 1,
		  }
		}
	  ]
	});
});