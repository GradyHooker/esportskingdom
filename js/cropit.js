$(function() {
	$('.image-editor').cropit({
	  imageState: {
		src: 'http://lorempixel.com/500/400/',
	  },
	  allowDragNDrop: false
	});
	
	$('#shortName').keypress(function() {
		$('.shortName').text($('#shortName').val());
	});
	
	var currentdate = new Date(); 
	var datetime = currentdate.getFullYear() + "-"
			+ pad(currentdate.getMonth()+1)  + "-" 
			+ currentdate.getDate() + " "  
			+ pad(currentdate.getHours()) + ":"  
			+ pad(currentdate.getMinutes()) + ":" 
			+ pad(currentdate.getSeconds()) + " "
			+ createOffset(currentdate);
	$("#circa").val(datetime);
	
	function createOffset(date) {
		var sign = (date.getTimezoneOffset() > 0) ? "-" : "+";
		var offset = Math.abs(date.getTimezoneOffset());
		return sign + pad(Math.floor(offset / 60)) + pad(offset % 60);
	}
	
	function pad(num) {
		if(num < 10) return "0" + num;
		return num;
	}
	
	$('.makepage-fakeposts input').keypress(function() {
		updatePreview();
	});
	
	$('.makepage-fakeposts select').change(function() {
		updatePreview();
	});
	
	function updatePreview() {
		console.log("HI");
	}

	//var imageData = $('.image-editor').cropit('export');
});