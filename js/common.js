const hamburger = document.getElementById("hamburger");
	const drawerMenu = document.getElementById("drawerMenu");

	hamburger.addEventListener("click", function (e) {
		e.preventDefault();
		this.classList.toggle("active");
		drawerMenu.classList.toggle("open");
	});