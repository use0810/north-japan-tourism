function loadGuideDetails() {
 // URLから 'id' パラメータを取得
 const params = new URLSearchParams(window.location.search);
 const guideId = params.get('id');

 if (!guideId) {
   console.error('ガイドIDが指定されていません。');
   return; // 関数内なのでエラーにならない
 }

 // guides.json をフェッチしてデータを取得
 fetch('guide_info.json')
   .then(response => response.json())
   .then(data => {
     // クエリのidに合致するガイド情報を検索
     const guide = data.find(item => item.id === guideId);
     if (!guide) {
       console.error('指定されたIDのガイドが見つかりません。');
       return; // ここも関数内なのでエラーにならない
     }

     // タイトルと説明文の更新
     const titleElem = document.getElementById('guide-title');
     const textElem = document.getElementById('guide-text');
     const panElem = document.getElementById('pan-title');
     if (titleElem) titleElem.textContent = guide.title;
     if (textElem) textElem.textContent = guide.text;
     if (panElem) panElem.textContent = guide.name;

     // ガイドの画像を表示
     const galleryElem = document.getElementById('guide-gallery');
     if (galleryElem && guide.images && guide.images.gallery) {
       galleryElem.innerHTML = ""; // 既存の画像をクリア

       guide.images.gallery.forEach(imageUrl => {
         const img = document.createElement('img');
         img.src = imageUrl;
         img.alt = guide.title;
         img.classList.add('guide-image'); // スタイルを追加する場合
         galleryElem.appendChild(img);
       });
     }
   })
   .catch(error => console.error('ガイドデータの読み込みに失敗しました:', error));
}

// 関数を実行する
loadGuideDetails();
