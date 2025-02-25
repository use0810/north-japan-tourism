document.addEventListener("DOMContentLoaded", function() {
  // URLから 'id' パラメータを取得
  const params = new URLSearchParams(window.location.search);
  const tourId = params.get('id');

  if (!tourId) {
    console.error('ツアーIDが指定されていません。');
    return;
  }

  // tours.json をフェッチしてデータを取得
  fetch('tour_info.json')
    .then(response => response.json())
    .then(data => {
      // クエリのidに合致するツアー情報を検索
      const tour = data.find(item => item.id === tourId);
      if (!tour) {
        console.error('指定されたIDのツアーが見つかりません。');
        return;
      }

      // タイトルと説明文の更新
      const titleElem = document.getElementById('tr-title');
      const textElem = document.getElementById('tr-text');
      if (titleElem) {
        titleElem.textContent = tour.title;
      }
      if (textElem) {
        textElem.textContent = tour.text;
      }

      // Swiper スライダー内のギャラリー画像を更新
      const swiperWrapper = document.querySelector('.tp-swiper .swiper-wrapper');
      if (swiperWrapper && tour.images && tour.images.gallery) {
        // 既存のスライドをクリア
        swiperWrapper.innerHTML = "";
        // gallery配列の各画像URLからスライドを作成
        tour.images.gallery.forEach(imageUrl => {
          const slideDiv = document.createElement('div');
          slideDiv.className = "swiper-slide";
          const img = document.createElement('img');
          img.src = imageUrl;
          img.alt = tour.title;
          slideDiv.appendChild(img);
          swiperWrapper.appendChild(slideDiv);
        });

        // Swiper を初期化（または再初期化）
        new Swiper('.tp-swiper', {
          loop: true,
          scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
          },
          // その他必要なオプションを追加
        });
      }
    })
    .catch(error => console.error('ツアーデータの読み込みに失敗しました:', error));
});
