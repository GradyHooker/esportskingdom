$(".slides").each(function(index) {
	console.log(index + " = " + $(this).data("builtin"));
	$(this).addClass("slides-" + index);
	console.log($(this));
	$(this).parent().addClass("carousel-" + index);
	console.log($(this).parent());
	if($(this).data("builtin") == true) {
		//No Captions
		console.log("No Captions");
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
		console.log("WITH Cpations");
		$(this).parent().find(".captions").addClass("captions-" + index);
		console.log($(this).parent().find(".captions"));
		$(this).parent().find(".pagination").addClass("pagination-" + index);
		console.log($(this).parent().find(".pagination"));
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



