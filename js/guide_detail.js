
let texts_index = 0
let textElem = document.getElementById('typewriter-text');
const nextButton = document.getElementById('next-button');
let isFin = false;

async function loadGuideDetails() {
  try {
    const guideId = getGuideId();
    if (!guideId) {
      console.error('ガイドIDが指定されていません。');
      return;
    }

    const guideData = await fetchGuideData();
    const guide = findGuideById(guideData, guideId);
    if (!guide) {
      console.error('指定されたIDのガイドが見つかりません。');
      return;
    }

    displayGuideImage(guide);
    setupNextButton(guide.texts);
    await displayGuideText(guide.texts);
  } catch (error) {
    console.error('ガイドデータの読み込みに失敗しました:', error);
  }
}

function getGuideId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function fetchGuideData() {
  const response = await fetch('guide_info.json');
  return response.json();
}

function findGuideById(data, id) {
  return data.find(item => item.id === id);
}

function displayGuideImage(guide) {
  const imageElem = document.getElementById('guide-image');
  if (imageElem && guide.image) {
    imageElem.src = guide.image;
    imageElem.alt = guide.name;
  }
}

async function displayGuideText(texts) {
  const this_text = texts[texts_index]
  textElem.textContent = ''; // 最初にテキストをクリア
  texts_index++;
  typeWriterEffect(textElem, this_text);
}

function typeWriterEffect(element, text, speed = 100) {
  return new Promise(resolve => {
    let index = 0;
    const typing = () => {
      if (index < text.length) {
        const char = text.charAt(index);
        if (char === '\n') {
          element.appendChild(document.createElement('br'));
        } else {
          element.innerHTML += char;
        }
        index++;
        setTimeout(typing, speed);
      } else {
        !isFin && (nextButton.style.display = 'block');
        resolve();
      }
    };
    typing();
  });
}

function slideOutAnimation(element, duration = 500) {
  return new Promise(resolve => {
    element.classList.add('slide-out');
    setTimeout(() => {
      element.classList.remove('slide-out');
      element.textContent = '';
      resolve();
    }, duration);
  });
}

function setupNextButton(texts) {
  textElem.textContent = "";
  nextButton.addEventListener('click', async () => {
    if (texts_index < texts.length ) {
      isFin = (texts_index === texts.length - 1);
      nextButton.style.display = 'none';
      textElem.classList.add('slide-out');
      await slideOutAnimation(textElem); // スライドアウト待機
      await displayGuideText(texts);
    }
  });


}

loadGuideDetails();
