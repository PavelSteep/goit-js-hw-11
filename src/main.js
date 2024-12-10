import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'bootstrap';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');

// Проверяем, существует ли форма перед добавлением обработчика события
if (searchForm) {
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const query = searchInput.value.trim(); // Получаем строку запроса

    if (!query) {
      iziToast.error({ message: 'Please enter a search term' });
      return;
    }

    // Создаем и показываем индикатор загрузки
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.textContent = 'Loading...';
    gallery.innerHTML = ''; // Очищаем галерею перед загрузкой
    gallery.appendChild(loader);

    try {
      const images = await fetchImages(query); // Запрашиваем изображения по введенному запросу

      if (images.length === 0) {
        iziToast.info({ message: 'Sorry, there are no images matching your search query. Please try again!' });
      } else {
        renderImages(images); // Отображаем изображения
        new SimpleLightbox('.gallery a'); // Инициализация SimpleLightbox для галереи
      }
    } catch (error) {
      iziToast.error({ message: 'Something went wrong, please try again!' });
    } finally {
      // Убираем индикатор загрузки
      if (loader) loader.remove();
    }
  });
} else {
  console.log('Элемент с id "search-form" не найден');
}

// Обработчик события на нажатие кнопки "Load more"
document.querySelector('.load-more').addEventListener('click', async () => {
  const query = searchInput.value.trim(); // Получаем строку запроса

  if (!query) {
    iziToast.error({ message: 'Please enter a search term' });
    return;
  }

  // Создаем и показываем индикатор загрузки
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.textContent = 'Loading...';
  gallery.appendChild(loader);

  try {
    const images = await fetchImages(query); // Запрашиваем изображения по введенному запросу

    if (images.length === 0) {
      iziToast.info({ message: 'Sorry, there are no images matching your search query. Please try again!' });
    } else {
      renderImages(images); // Отображаем изображения
      new SimpleLightbox('.gallery a'); // Инициализация SimpleLightbox для галереи
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong, please try again!' });
  } finally {
    // Убираем индикатор загрузки
    const loader = document.querySelector('.loader');
    if (loader) loader.remove();
  }
});
