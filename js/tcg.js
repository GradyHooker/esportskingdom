function showCards(cardNum) {
	var newNum = cardNum - 1;
	if($(window).width() > 1600) newNum -= 2;
	else if($(window).width() > 1000) newNum -= 1;
	
	$('.carousel').slick("slickGoTo", parseInt(newNum));
	$('.cardDisplay').fadeIn(400).css("display", "flex");
	resizeSlick();
}

$('.cardDisplay').click(function(e) {
	if(e.target.classList.contains("cardDisplay")) {
		$('.cardDisplay').fadeOut(400);
	}
});

$(document).ready(function(){
	$('.carousel').slick({
		lazyLoad: 'progressive',
		lazyLoadBuffer: 5,
		infinite: true,
		slidesToShow: 5,
		swipeToSlide: true
	});
	resizeSlick();
});

$(window).resize(function() {
	resizeSlick();
});

function resizeSlick() {
	var fitWidth = Math.max(Math.floor($('.carousel').width()/350), 1);
	if($('.cardDisplay').height() < 460) fitWidth++
	if($('.cardDisplay').height() < 410) fitWidth++;
	if($('.cardDisplay').height() < 340) fitWidth++;
	if($('.cardDisplay').height() < 300) fitWidth++;
	if($('.cardDisplay').height() < 280) fitWidth++;
	if($('.cardDisplay').height() < 240) fitWidth++;
	if($('.cardDisplay').height() < 210) fitWidth++;
	
	var currentShowing = $('.carousel').slick("slickGetOption", "slidesToShow");

	if(currentShowing != fitWidth) {
		$('.carousel').slick("slickSetOption", "slidesToShow", fitWidth, true);
	}
}