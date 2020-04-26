window.onscroll = function (e) {  
	var header = document.getElementById("header");
	var main = document.getElementById("main");

	if(window.scrollY != 0 && (height-window.innerHeight) > 45) {
		header.classList ? header.classList.add('header-fixed') : header.className = 'header header-fixed';
		main.style.paddingTop = "65px";
	} else {
		header.classList ? header.classList.remove('header-fixed') : header.className = 'header';
		main.style.paddingTop = "110px";
	}
} 

window.onresize = function (e) {
	calcHeightWidth();
	
	//Recalculate Related Posts
	recalcRelated();
}

var height;
var width;
function calcHeightWidth() {
	width = Math.max(document.body.scrollWidth,
		document.body.offsetWidth,
		document.documentElement.clientWidth,
		document.documentElement.scrollWidth,
		document.documentElement.offsetWidth );
		
	height = Math.max(document.body.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.clientHeight,
		document.documentElement.scrollHeight,
		document.documentElement.offsetHeight );
}

$(document).ready(function() {
	calcHeightWidth();
	
	var num = window.location.pathname.split('/')[2];
	if(num == "" || num == undefined) { num = "1"; }
	var pg = document.getElementById("page-" + num);
	if(pg != null) {
		pg.classList.add("active");
	}
	
	//Recalculate Related Posts
	recalcRelated();
	setTimeout(function () {
		recalcRelated();
	}, 1000);

	//Rewrite times
	var times = $('time');
	var now = new Date($.now());
	var time, utc1, utc2, diffDays, diffHours, diffMins, displayTime, format;
	utc2 = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes());

	times.each(function() {
		displayTime = "";
		time = new Date($(this).attr("datetime"));
		format = $(this).data("format");
		if(format == "timeSince"){
			utc1 = Date.UTC(time.getUTCFullYear(), time.getUTCMonth(), time.getUTCDate(), time.getUTCHours(), time.getUTCMinutes());
			diffMins = Math.floor((utc2 - utc1) / 1000 / 60);
			diffHours = Math.floor(diffMins / 60);
			diffDays = Math.floor(diffHours / 24);
			
			if(diffMins == 1) displayTime = "a minute ago"
			else if(diffMins <= 59) displayTime = diffMins + " minutes ago"
			else if(diffHours == 1) displayTime = "an hour ago"
			else if(diffHours <= 23) displayTime = diffHours + " hours ago"
			else if(diffDays == 1) displayTime = "a day ago"
			else if(diffDays <= 6) displayTime = diffDays + " days ago"
		} else { 
			displayTime = $.format.toBrowserTimeZone(time, format)
		}
		if(displayTime != "") $(this).text(displayTime);
	});
});

function showTierRanking(button, region) {
	$('.tier-list').hide();
	$('.tier-list-' + region).show();
	$('.tier-list-button-active').removeClass('tier-list-button-active');
	$(button).addClass('tier-list-button-active');
}

function recalcRelated() {		
	if($(".post-related").length && $(".post-content").length) {
		//At the bottom
		var numToShow = 6;
		console.log(width);
		//On the right
		if(width > 950) {
			//300px of adspace, 250px of author block, 220px each link
			numToShow = ($(".post-content").height() - 300 + 250) / 220;
		}
		
		//One is the adspace
		var numCurrentShow = $(".post-related .post-link").length - $("post-link-hidden").length - 1;
		
		$(".post-related .post-link").each(function(i) {
			if(i != 0){
				if(i <= numToShow) {
					$(this).removeClass("post-link-hidden");
				} else {
					$(this).addClass("post-link-hidden");
				}
			}
		});
	}
}