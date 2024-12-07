import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    iziToast.error({ message: 'Please enter a search term' });
    return;
  }

  // Показываем индикатор загрузки
  gallery.innerHTML = '<div class="loader">Loading...</div>';

  try {
    const images = await fetchImages(query);

    if (images.length === 0) {
      iziToast.info({ message: 'Sorry, there are no images matching your search query. Please try again!' });
    } else {
      renderImages(images);
      new SimpleLightbox('.gallery a'); // Инициализация SimpleLightbox
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong, please try again!' });
  } finally {
    // Убираем индикатор загрузки
    document.querySelector('.loader').remove();
  }
});
