// ==========================================
// 1. ПЕРЕКЛЮЧАТЕЛЬ ТЕМ (С сохранением в браузере)
// ==========================================
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  body.classList.remove('light-theme');
} else {
  body.classList.add('light-theme');
}

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// ==========================================
// 2. МОБИЛЬНОЕ МЕНЮ (Бургер)
// ==========================================
const burgerBtn = document.getElementById('burger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    burgerBtn.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ==========================================
// 3. ПЛАВНЫЙ СКРОЛЛ ВВЕРХ
// ==========================================
function scrollToTop(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 4. МОДАЛЬНОЕ ОКНО ДЛЯ СДАЧИ ДЗ
// ==========================================
const modal = document.getElementById('homework-modal');
const fileInput = document.getElementById('file-input');
const uploadZone = document.getElementById('upload-zone');
const progressContainer = document.getElementById('upload-progress');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const submitBtn = document.getElementById('submit-hw-btn');
let selectedFile = null;

function openHomeworkModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeHomeworkModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => {
    selectedFile = null;
    fileInput.value = '';
    progressContainer.classList.remove('active');
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправить на проверку';
    submitBtn.style.background = '';
    submitBtn.style.boxShadow = '';
    uploadZone.querySelector('.upload-zone__text').textContent = 'Перетащите файл сюда или нажмите для выбора';
  }, 300);
}

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedFile = file;
    uploadZone.querySelector('.upload-zone__text').textContent = `Выбран файл: ${file.name}`;
    submitBtn.disabled = false;
  }
});

uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) {
    fileInput.files = e.dataTransfer.files;
    selectedFile = file;
    uploadZone.querySelector('.upload-zone__text').textContent = `Выбран файл: ${file.name}`;
    submitBtn.disabled = false;
  }
});

submitBtn.addEventListener('click', () => {
  if (!selectedFile) return;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Загрузка...';
  progressContainer.classList.add('active');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        submitBtn.textContent = 'Успешно отправлено! ✅';


submitBtn.style.background = '#10b981';
        submitBtn.style.boxShadow = 'none';
        setTimeout(() => {
          closeHomeworkModal();
        }, 2000);
      }, 500);
    }
    progressBar.style.width = progress + '%';
    progressText.textContent = Math.round(progress) + '%';
  }, 200);
});