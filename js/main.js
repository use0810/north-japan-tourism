document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.getElementById("hamburger");
	const drawerMenu = document.getElementById("drawerMenu");

	hamburger.addEventListener("click", function (e) {
		e.preventDefault();
		this.classList.toggle("active");
		drawerMenu.classList.toggle("open");
	});

	// 📌 ヒーローイメージの Swiper
	const heroSwiper = new Swiper('.hero-swiper', {
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.hero-swiper .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.hero-swiper .swiper-button-next',
			prevEl: '.hero-swiper .swiper-button-prev',
		},
		scrollbar: {
			el: '.hero-swiper .swiper-scrollbar',
		},
		slidesPerView: 1, // 1枚ずつ表示
	});

	const tourSwiper = new Swiper('.tour-swiper', {
		slidesPerView: 2,
		spaceBetween: 10,
		grid: {
      rows: 2,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
		breakpoints: {
			320: { // スマホ（2×2）
				slidesPerView: 2, 
				grid: { rows: 2 }, 
				spaceBetween: 10,
			},
			768: { // タブレット（3×2）
				slidesPerView: 3, 
				grid: { rows: 2 }, 
				spaceBetween: 20, 
			},
			1024: { // PC（3×2）
				slidesPerView: 3,
				grid: { rows: 2 },
				spaceBetween: 30, // 
			}
		}
  });

});
