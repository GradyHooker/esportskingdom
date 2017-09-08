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