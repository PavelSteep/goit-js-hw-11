import { fetchImages } from './js/pixabay-api'; // импортируем функцию для получения изображений
import { renderImages } from './js/render-functions'; // импортируем функцию для рендеринга изображений
import iziToast from 'izitoast'; // импортируем библиотеку для отображения уведомлений
import SimpleLightbox from 'simplelightbox'; // импортируем библиотеку для создания галереи изображений
import 'simplelightbox/dist/simple-lightbox.min.css'; // стили для SimpleLightbox
import 'bootstrap'; // импортируем Bootstrap для стилизации
import 'izitoast/dist/css/iziToast.min.css'; // стили для iziToast

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');

// Обработчик события на отправку формы
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  const query = searchInput.value.trim(); // Получаем строку запроса

  if (!query) {
    iziToast.error({ message: 'Please enter a search term' });
    return;
  }

  // Показываем индикатор загрузки
  gallery.innerHTML = '<div class="loader">Loading...</div>';

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
