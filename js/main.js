	window.addEventListener('scroll', function() {
		const header = document.getElementById('header-container');
		// スクロール位置が50pxより大きい場合にクラスを追加（値は好みに合わせて調整）
		if (window.scrollY > 200) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
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


// 地図周りの処理
const objectElem = document.getElementById("aomoriMap");

async function loadSvg() {
    return new Promise((resolve, reject) => {
        objectElem.addEventListener("load", function () {
            const svgDoc = objectElem.contentDocument;
            if (!svgDoc) {
                reject("SVGの読み込みに失敗しました。（contentDocumentがnull）");
                return;
            }
            resolve(svgDoc);
        });
    });
}

async function initSvgInteraction() {
    try {
        const svgDoc = await loadSvg(); // SVGの読み込みを待つ
        const svgRoot = svgDoc.querySelector("svg");

								const paragraphs = document.querySelectorAll(".map-text");

        if (!svgRoot) {
            throw new Error("SVGのルート要素（<svg>）が見つかりません。");
        }

        const paths = svgRoot.querySelectorAll("path");
        if (!paths.length) {
            throw new Error("SVG内に <path> 要素が見つかりません。");
        }

								// SVGの高さを取得して、hidden-contentの高さを調整
        const svgWrap = document.querySelector('.svg-wrap');
        const hiddenContent = document.getElementById('.hidden-content');

        if (svgWrap && hiddenContent) {
            const svgWrapHeight = svgWrap.offsetHeight;
            hiddenContent.style.height = svgWrapHeight + 'px';
        }

        // `path` 要素を取得してイベントを追加
        paths.forEach((path, index) => {
												const correspondingParagraph = paragraphs[index];
												if (!correspondingParagraph) return;
            // ホバー時に拡大
            path.addEventListener("mouseover", () => {
                svgRoot.appendChild(path);
																correspondingParagraph.classList.add("hovered");
																console.log(correspondingParagraph)
            });
												path.addEventListener("mouseout", () => {
													correspondingParagraph.classList.remove("hovered");
												});

            // クリックで隠れていた要素を表示
            path.addEventListener("click", () => {
													const content = document.getElementById('hidden-content');
													content.style.display = 'flex'; // 要素を表示
													setTimeout(() => {
															content.classList.add('show'); // スライドインのクラスを追加
													}, 10); 
            });
        });

    } catch (error) {
        console.error(error);
    }
}

// 初期化
initSvgInteraction();

// 閉じる処理
function closeContent() {
	const content = document.getElementById('hidden-content');
	content.classList.remove('show'); // スライドアウト
	setTimeout(() => {
			content.style.display = 'none'; // 要素を非表示にする
	}, 500); // アニメーションが終わるまで待機
}
