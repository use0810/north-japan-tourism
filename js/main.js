document.addEventListener("DOMContentLoaded", function () {

	window.addEventListener('scroll', function() {
		const header = document.getElementById('header-container');
		// スクロール位置が50pxより大きい場合にクラスを追加（値は好みに合わせて調整）
		if (window.scrollY > 200) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});
	

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
		scrollbar: {
			el: '.hero-swiper .swiper-scrollbar',
		},
		slidesPerView: 1, // 1枚ずつ表示
	});

	const tourSwiper = new Swiper('.tour-swiper', {
		slidesPerView: 2,
		spaceBetween: 0,
		grid: {
      rows: 2,
    },
		scrollbar: {
			el: '.swiper-scrollbar',
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
