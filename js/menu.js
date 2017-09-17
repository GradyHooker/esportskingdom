var cssmenu;
var prevState = "";

window.onload = function() {
	cssmenu = document.getElementById("cssmenu");
	var menuDiv = document.createElement("div");
	menuDiv.id = "menu-button";
	menuDiv.innerText = "Menu";
	cssmenu.prepend(menuDiv);
	
	document.getElementById("menu-button").onclick = function() {
		this.classList.toggle('menu-opened');
		var mainmenu = nextElementSibling(this, "ul"); 
		if(mainmenu.classList.contains("open")) {
			mainmenu.style.display = "none";
			mainmenu.classList.remove("open");
		} else {
			mainmenu.style.display = "block";
			mainmenu.classList.add("open");
		}
	}
	
	var listItems = cssmenu.getElementsByTagName("li");
	var subLists;
	for (i = 0; i < listItems.length; i++) {
		if(listItems[i].getElementsByTagName("ul").length > 0) {
			var submenuSpan = document.createElement("span");
			submenuSpan.className = "submenu-button";
			listItems[i].prepend(submenuSpan);
		}
	}

	var subMenuButtons = cssmenu.getElementsByClassName("submenu-button");
	for (i = 0; i < subMenuButtons.length; i++) {
		subMenuButtons[i].onclick = function() {
			this.classList.toggle("submenu-opened");
			var siblings = allElementSibling(this, "ul");
			var sibOpen = false;
			for (j = 0; j < siblings.length; j++) {
				if(siblings[j].classList.contains("open")) {
					sibOpen = true;
				}
			}
			if(sibOpen) {
				for (j = 0; j < siblings.length; j++) {
					siblings[j].classList.remove("open");
					siblings[j].style.display = "none";
				}
			} else {
				for (j = 0; j < siblings.length; j++) {
					siblings[j].classList.add("open");
					siblings[j].style.display = "block";
				}
			}
		}
	}
};

window.onresize = function(){
	var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var lists = cssmenu.getElementsByTagName("ul");
	if (w > 768 && (prevState == "small" || prevState == "")) {
		for (i = 0; i < lists.length; i++) {
			lists[i].style.display = "block";
		}
		prevState = "big";
	}
	if (w <= 768 && (prevState == "big" || prevState == "")) {
		for (i = 0; i < lists.length; i++) {
			lists[i].style.display = "none";
			lists[i].classList.remove("open");
			var button = allElementSibling(lists[i], "div")[0];
			if(button != null) {
				button.classList.remove("menu-opened");
			}
			button = allElementSibling(lists[i], "span")[0];
			if(button != null) {
				button.classList.remove("submenu-opened");
			}
		}
		prevState = "small";
	}
};

function nextElementSibling(element, type) {
    do { 
        element = element.nextSibling;
    } while (element && element.tagName !== type.toUpperCase());
    return element;
}

function allElementSibling(element, type) {
	var siblings = element.parentNode.childNodes;
	count = 0;
	var elements = [];
	for (j = 0; j < siblings.length; j++) {
		if(siblings[j].tagName == type.toUpperCase()) {
			elements[count] = siblings[j];
			count++;
		}
	}
    return elements;
}