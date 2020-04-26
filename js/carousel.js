$(".slides").each(function(index) {
	$(this).addClass("slides-" + index);
	$(this).parent().addClass("carousel-" + index);
	if($(this).data("builtin") == true) {
		//No Captions
		$(".slides-" + index).slick({
		  infinite: false,
		  speed: 200,
		  arrows: true,
		  autoplay: true,
		  swipeToSlide: true,
		  infinite: true,
		  prevArrow: '<div class="pagination__button pagination__button_nocap"><</div>',
		  nextArrow: '<div class="pagination__button pagination__button_nocap">></div>'
		});
	} else {
		//With Captions
		$(this).parent().find(".captions").addClass("captions-" + index);
		$(this).parent().find(".pagination").addClass("pagination-" + index);
		$(".slides-" + index).slick({
		  asNavFor: '.captions-' + index,
		  infinite: false,
		  speed: 200,
		  arrows: false,
		  autoplay: true,
		  swipeToSlide: true,
		  infinite: true
		})

		$(".captions-" + index).slick({
		  asNavFor: '.slides-' + index,
		  infinite: false,
		  speed: 200,
		  fade: true,
		  infinite: true,
		  appendArrows: $('.pagination-' + index),
		  prevArrow: '<div class="pagination__button"><</div>',
		  nextArrow: '<div class="pagination__button">></div>'
		})
	}
});

$('.feature-slides').slick({
	dots: true,
	autoplay: true,
	infinite: true,
	speed: 200,
	autoplaySpeed: 6000,
	fade: true,
	arrows: false,
	cssEase: 'linear'
});