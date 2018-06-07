$(function() {
	var id;
	var tweetObj;
	$(".tweet").each(function( index ) {
		id = $(this).attr("tweetID");
		twttr.widgets.createTweet(id, $(this)[0]);
	});
});