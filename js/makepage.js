$(function() {
	$('.image-editor').cropit({
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
	
	$('.makepage-fakeposts input, .makepage-fakeposts textarea').keypress(function() {
		updatePreview();
	});
	
	$('.makepage-fakeposts select').change(function() {
		updatePreview();
	});
		
	//JavaScript by Yair Even Or (https://codepen.io/vsync/pen/frudD)
	$(document)
    .one('focus.autoExpand', 'textarea.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', 'textarea.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
        this.rows = minRows + rows;
    });
	//End Credit
	
	function updatePreview() {
		var finalVal = "";
		
		finalVal += "---" + "\n";
		finalVal += "layout: post" + "\n";
		finalVal += 'title: "' + $("#displayName").val() + '"\n';
		finalVal += 'fulltitle: "' + $("#displayName").val() + '"\n';
		finalVal += 'category: ' + $("#category").val() + '\n';
		finalVal += 'tags: ' + $("#articleParentType").val() + " " + $("#articleType").val() + " " + $("#genre").val() + '\n';
		finalVal += 'image: ' + $("#shortName").val() + '\n';
		finalVal += 'author: ' + $("#author").val() + '\n';
		if($("#headerCredit").val() != "" || $("#headerCreditLink").val() != "") {
			finalVal += 'headercredit: ' + '\n';
			finalVal += '  - name: ' + $("#headerCredit").val() + '\n';
			finalVal += '    link: ' + $("#headerCreditLink").val() + '\n';
		}
		finalVal += 'circa: ' + $("#circa").val() + '\n';
		finalVal += "---" + "\n";
		
		$("#postPreview").val(finalVal);
		$("#postPreview").attr("rows", Math.ceil(document.getElementById("postPreview").scrollHeight / 16));
	}
	
	//var imageData = $('.image-editor').cropit('export');
});