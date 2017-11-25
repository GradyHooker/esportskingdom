window.onscroll = function (e) {  
	var header = document.getElementById("header");
	var main = document.getElementById("main");
	if(window.scrollY != 0) {
		header.classList ? header.classList.add('header-fixed') : header.className = 'header header-fixed';
		main.style.paddingTop = "65px";
	} else {
		header.classList ? header.classList.remove('header-fixed') : header.className = 'header';
		main.style.paddingTop = "110px";
	}
} 

$(document).ready(function() {
	var num = window.location.pathname.split('/')[2];
	if(num == "" || num == undefined) { num = "1"; }
	var pg = document.getElementById("page-" + num);
	if(pg != null) {
		pg.classList.add("active");
	}
	
	//Pretty Print all of the Names
	$.getJSON("/json/prettyPrintMaps.json", function( data ) {
		$(".pretty-print").each(function(index) {
			var prettyPrint = data[$(this).text()];
			if(prettyPrint != "" && prettyPrint != undefined) {
				$(this).text(prettyPrint);
			}
		});
	});
	
	//Rewrite times
});