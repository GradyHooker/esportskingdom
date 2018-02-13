$(".slides").slick({
  asNavFor: '.captions',
  infinite: false,
  speed: 200,
  arrows: false,
  autoplay: true,
  swipeToSlide: true,
  infinite: true
})

$(".captions").slick({
  asNavFor: '.slides',
  infinite: false,
  speed: 200,
  fade: true,
  infinite: true,
  appendArrows: $('.pagination'),
  prevArrow: '<div class="pagination__button"><</div>',
  nextArrow: '<div class="pagination__button">></div>'
})