$(function() {
	$('.image-editor').cropit({
		allowDragNDrop: false
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
	
	function insertInclude(name) {
		var toAdd = "";
		var cursorPos = $('#postContent').prop('selectionStart');
		var v = $('#postContent').val();
		switch(name){ 
			case "video": {
				toAdd = "<<VIDEO\nvideo: \ncaption: \ncredit: \ncreditlink: \n>>";
				break;
			}
			case "image": {
				toAdd = "<<IMAGE\nimage: \ncaption: \ncredit: \ncreditlink: \n>>";
				break;
			}
			case "carousel": {
				toAdd = "<<CAROUSEL\nfolder: \nimages:\n- \n- \n- \ncaptions:\n- \n- \n- \n>>";
				break;
			}
			case "logo": {
				toAdd = "<<LOGO\nlogo: \nsize: \n>>";
				break;
			}
			case "logoheadline": {
				toAdd = "<<LOGOHEADLINE\nlogo: \nheadline: \n>>";
				break;
			}
			case "logolist": {
				toAdd = "<<LOGOLIST\nlogos:\n- \n- \n- \n>>";
				break;
			}
			case "teamlist": {
				toAdd = "<<TEAMLIST\nlogo: \nplayers:\n- \n- \n- \n- \n- \ncountry:\n- \n- \n- \n- \n- \n>>";
				break;
			}
		}
		var textBefore = v.substring(0,  cursorPos );
		var textAfter  = v.substring( cursorPos, v.length );
		$('#postContent').val( textBefore + toAdd + textAfter );
		updatePreview();
	}
	
	$(".makepage-buttons button").click(function() {
		insertInclude($(this).data("include"));
	});

	$("#postContent").keypress(function() {
		$("#postContent").attr("rows", Math.ceil(document.getElementById("postContent").scrollHeight / 16));
	});
	
	function updatePreview() {
		var finalVal = "";
		
		finalVal += "---" + "\n";
		finalVal += "layout: post" + "\n";
		finalVal += 'title: "' + $("#displayName").val() + '"\n';
		finalVal += 'fulltitle: "' + $("#displayName").val() + '"\n';
		finalVal += 'category: ' + $("#category").val() + '\n';
		finalVal += 'tags: ' + $("#articleType").find(":selected").data("parent") + " " + $("#articleType").val() + " " + $("#category").find(":selected").data("parent") + '\n';
		finalVal += 'image: ' + $("#shortName").val() + '\n';
		finalVal += 'author: ' + $("#author").val() + '\n';
		if($("#headerCredit").val() != "" || $("#headerCreditLink").val() != "") {
			finalVal += 'headercredit: ' + '\n';
			finalVal += '  - name: ' + $("#headerCredit").val() + '\n';
			finalVal += '    link: ' + $("#headerCreditLink").val() + '\n';
		}
		finalVal += 'circa: ' + $("#circa").val() + '\n';
		
		if($("#postContent").val().split("CAROUSEL").length > 1) {
			finalVal += 'hasSlick: true\n';
		}
		
		finalVal += "---" + "\n";
		
		var contentLines = $("#postContent").val().split("\n");
		var specialBlock = false;
		var inList = false;
		var specialLine = 0;
		contentLines.forEach(function(line) {
			if(line.replace(/ /g,'') != "") {
				//Replace URLs
				line = line.replace(/__|\*|\#|(?:\[([^\]]*)\]\(([^)]*)\))/gm, "<a href='$2'>$1</a>");
				
				//handle includes
				if(line.substr(0, 2) == "<<") {
					specialBlock = true;
					specialLine = 0;
					line = line.substr(2, line.length).trim();
				}
				if(specialBlock) {
					specialLine++;
					if(line.substr(0, 2) == ">>") {
						specialBlock = false;
						specialLine = -1;
					}
					line = line.replace(/"/g, "'");
					switch(specialLine) {
						case 1: {
							//Which includes to use 
							finalVal += "{% include " + line.toLowerCase() + ".html";
							break;
						}
						case -1: {
							//Final one
							if(inList) {
								finalVal = finalVal.substr(0, finalVal.length-1) + '"';
								inList = false;
							}
							finalVal += " %}\n\n";
							break;
						}
						default: {
							//Everything else
							var splits = line.split(/:(.+)/);
							
							if(line.substr(0, 1) == "-") {
								finalVal += line.substr(1, line.length).trim() + '|';
							} else {
								if(inList) {
									finalVal = finalVal.substr(0, finalVal.length-1) + '"';
									inList = false;
								}
								if(splits.length > 1 && splits[1].trim() != "") {
									//KeyValue
									finalVal += " " + splits[0].trim() + '="' + splits[1].trim() + '"';
								} else {
									//List
									inList = true;
									finalVal += " " + splits[0].trim().substr(0, line.length-1) + '="';
								}
							}
							
							
							
							break;
						}
					}
				} else {
					switch(line.substr(0, 1)) {
						case "#": {
							finalVal += '<p class="subheading">' + line.substr(1, line.length).trim() + "</p>";
							break;
						}
						case ">": {
							finalVal += '{% include quote.html text="' + line.substr(1, line.length).trim() + '"%}';
							break;
						}
						case "+": {
							finalVal += '<p class="interview-question">' + line.substr(1, line.length).trim() + "</p>";
							break;
						}
						case "-": {
							finalVal += "<li>" + line.substr(1, line.length).trim() + "</li>";
							break;
						}
						default: {
							finalVal += "<p>" + line + "</p>";
							break;
						}
					}
					finalVal += "\n\n";
				}
			}
		});
		
		$("#postPreview").val(finalVal);
		$("#postPreview").attr("rows", Math.ceil(document.getElementById("postPreview").scrollHeight / 16));
		
		$('.shortName').text($('#shortName').val());
		$('.shortDate').text($('#circa').val().split("-")[0] + "-" + $('#circa').val().split("-")[1] + "-");
	}
	
	//var imageData = $('.image-editor').cropit('export');
	
	if(window.File && window.FileList && window.FileReader)
    {
        $('#files').change(function(event) {
            var files = event.target.files;
            var output = document.getElementById("result");
			var count = 0;
            for(var i = 0; i < files.length; i++)
            {
				(function () {
					var j = i + 1;
					var file = files[i];
					if(file.type.match('image.*'))
					{
						if(document.getElementById("files").files[0].size < 2097152)
						{    
							var picReader = new FileReader();
							picReader.addEventListener("load",function(event)
							{
								var picFile = event.target;
								var div = document.createElement("div");
								div.style.order = j;
								div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" + "title='preview image'/><div><span class='shortName'></span>-" + j + ".jpg</div>";
								output.insertBefore(div,null);            
							});
							$('#clear, #result').show();
							picReader.readAsDataURL(file);
						}
						else
						{
							alert("Image Size is too big. Minimum size is 2MB.");
							$('#files').val("");
						}
					}
					else
					{
						alert("You can only upload image file.");
						$('#files').val("");
					}
					count++;
				}());	
			}		
        });
    }
    else
    {
        console.log("Your browser does not support File API");
    }
});

$('#files').click(function() {
	$('.thumbnail').parent().remove();
	$('result').hide();
	$(this).val("");
});

$('#clear').click(function() {
	$('.thumbnail').parent().remove();
	$('#result').hide();
	$('#files').val("");
	$(this).hide();
});