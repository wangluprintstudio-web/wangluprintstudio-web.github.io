'use strict';

const translations = Array.from(document.querySelectorAll('[data-en]'), element => ({element, zh: element.innerHTML, en: element.dataset.en}));
const ariaTranslations = Array.from(document.querySelectorAll('[data-en-aria]'), element => ({element, zh: element.getAttribute('aria-label'), en: element.dataset.enAria}));
const imageTranslations = Array.from(document.querySelectorAll('[data-alt-en]'), element => ({element, zh: element.alt, en: element.dataset.altEn}));
let language = 'zh';
try { if (localStorage.getItem('wanglu-language') === 'en') language = 'en'; } catch { /* Preference storage is optional. */ }
const languageToggle = document.getElementById('language-toggle');
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next === 'en' ? 'en' : 'zh-CN';
  translations.forEach(({element, zh, en}) => { if (next === 'en') element.textContent = en; else element.innerHTML = zh; });
  ariaTranslations.forEach(({element, zh, en}) => element.setAttribute('aria-label', next === 'en' ? en : zh));
  imageTranslations.forEach(({element, zh, en}) => { element.alt = next === 'en' ? en : zh; });
  languageToggle.textContent = next === 'en' ? '中文' : 'EN';
  languageToggle.setAttribute('aria-label', next === 'en' ? '切换到中文' : 'Switch to English');
  document.title = next === 'en' ? document.body.dataset.titleEn : document.body.dataset.titleZh;
  const description = document.querySelector('meta[name="description"]');
  description.content = next === 'en' ? description.dataset.en : description.dataset.zh;
  document.querySelectorAll('.media-slot').forEach((slot, index) => {
    slot.querySelector('.media-placeholder span').textContent = next === 'en' ? 'Add project image' : '插入作品图片';
    slot.querySelector('input[type=file]').setAttribute('aria-label', next === 'en' ? `Choose image ${index + 1}` : `选择第 ${index + 1} 张图片`);
    const caption = slot.querySelector('input[type=text]');
    caption.placeholder = next === 'en' ? 'Artwork name / caption' : '作品名称／说明';
    caption.setAttribute('aria-label', next === 'en' ? `Caption ${index + 1}` : `第 ${index + 1} 张图片的说明`);
  });
  const previewStatus = document.getElementById('preview-status');
  if (previewStatus) previewStatus.textContent = '';
  try { localStorage.setItem('wanglu-language', next); } catch { /* Keep the current session usable. */ }
}
languageToggle.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));

const dialog = document.getElementById('image-dialog');
const dialogImage = document.getElementById('dialog-image');
document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
  const image = button.querySelector('img');
  dialogImage.src = button.dataset.fullImage || image.src;
  const caption = button.closest('figure').querySelector('figcaption').textContent;
  dialogImage.alt = caption;
  document.getElementById('dialog-caption').textContent = caption;
  dialog.showModal();
}));
document.getElementById('close-image').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });

const grid = document.getElementById('media-grid');
for (let index = 1; grid && index <= 6; index++) {
  const slot = document.createElement('figure');
  slot.className = 'media-slot';
  slot.innerHTML = `<label class="media-drop"><input type="file" accept="image/jpeg,image/png,image/webp"><span class="media-placeholder"><b>＋</b><span></span><small>JPG · PNG · WebP / ≤ 20 MB</small></span><img alt="" hidden></label><figcaption><span>0${index}</span><input type="text" maxlength="200"></figcaption>`;
  const fileInput = slot.querySelector('input[type=file]');
  const captionInput = slot.querySelector('input[type=text]');
  const image = slot.querySelector('img');
  const placeholder = slot.querySelector('.media-placeholder');
  let objectUrl;
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const status = document.getElementById('preview-status');
    if (!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 20 * 1024 * 1024) {
      status.textContent = language === 'en' ? 'Choose a JPG, PNG or WebP image under 20 MB.' : '请选择 20 MB 以内的 JPG、PNG 或 WebP 图片。';
      fileInput.value = '';
      return;
    }
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      image.hidden = false;
      placeholder.hidden = true;
      status.textContent = language === 'en' ? 'Image added to this temporary preview. It has not been saved or published.' : '图片已加入本次临时预览，尚未保存或发布。';
    };
    image.onerror = () => { image.hidden = true; placeholder.hidden = false; status.textContent = language === 'en' ? 'This image could not be opened. Please choose another image.' : '无法打开这张图片，请重新选择。'; };
    image.alt = captionInput.value || file.name;
    image.src = objectUrl;
  });
  captionInput.addEventListener('input', () => { image.alt = captionInput.value || 'Portfolio image'; });
  grid.appendChild(slot);
}
function revealWorkspace() { if (location.hash === '#image-library' && document.getElementById('preview-details')) document.getElementById('preview-details').open = true; }
addEventListener('hashchange', revealWorkspace);
revealWorkspace();
setLanguage(language);

// Maintain the familiar anchors after moving the long portfolio into categories.
if (document.body.dataset.page === 'home') {
  const destinations = {'#work':'works.html','#printmaking':'works.html#printmaking','#illustration':'works.html#illustration','#practice':'practice.html','#mieo':'practice.html#mieo','#about':'about.html','#profile':'about.html#profile','#recognition':'about.html#recognition','#contact':'about.html#contact','#image-library':'works.html#image-library'};
  if (destinations[location.hash]) location.replace(destinations[location.hash]);
}
