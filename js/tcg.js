var initCarousel = false;

function showCards(cardNum) {
	
	if(!initCarousel) {
		$('.carousel').slick({
			infinite: true,
			slidesToShow: 1,
			swipeToSlide: true
		});
		initCarousel = true;
	}
	
	$('.carousel').slick("slickSetOption", "lazyLoad", "anticipated")
	$('.cardDisplay').fadeIn(400).css("display", "flex");
	$('.slick-current').focus();
	resizeSlick();
	$('.carousel').slick("slickGoTo", parseInt(cardNum - 1 - Math.floor($('.carousel').slick("slickGetOption", "slidesToShow")/2)));
}

$('.cardDisplay').click(function(e) {
	if(e.target.classList.contains("cardDisplay")) {
		$('.cardDisplay').fadeOut(400);
	}
});

$(window).resize(function() {
	if(initCarousel) {
		resizeSlick();
	}
});

function resizeSlick() {
	var fitWidth = getMaxCards();
	console.log("resize: " + fitWidth);
	
	$('.tcg-large').css("line-height", $('.cardDisplay').height()/2 + "px");
	
	var currentShowing = $('.carousel').slick("slickGetOption", "slidesToShow");
	if(currentShowing != fitWidth) {
		$('.carousel').slick("slickSetOption", "slidesToShow", fitWidth, true);
	}
}

function getMaxCards() {
	var fitWidth = Math.max(Math.floor($('.carousel').width()/350), 1);
	if($('.cardDisplay').height() < 460) fitWidth++
	if($('.cardDisplay').height() < 410) fitWidth++;
	if($('.cardDisplay').height() < 340) fitWidth++;
	if($('.cardDisplay').height() < 300) fitWidth++;
	if($('.cardDisplay').height() < 280) fitWidth++;
	if($('.cardDisplay').height() < 240) fitWidth++;
	if($('.cardDisplay').height() < 210) fitWidth++;
	return fitWidth;
}