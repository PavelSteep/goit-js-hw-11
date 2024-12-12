import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import 'bootstrap';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

if (searchForm) {
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
      iziToast.error({ message: 'Please enter a search term' });
      return;
    }

    showLoader();
    clearGallery();

    try {
      const images = await fetchImages(query);

      if (images.length === 0) {
        iziToast.info({ message: 'Sorry, there are no images matching your search query. Please try again!' });
      } else {
        renderImages(images);
        initializeLightbox();
      }
    } catch (error) {
      iziToast.error({ message: 'Something went wrong, please try again!' });
    } finally {
      hideLoader();
    }
  });
} else {
  console.error('Search form element not found');
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();

    if (!query) {
      iziToast.error({ message: 'Please enter a search term' });
      return;
    }

    showLoader();

    try {
      const images = await fetchImages(query);

      if (images.length === 0) {
        iziToast.info({ message: 'Sorry, there are no more images to load.' });
      } else {
        renderImages(images);
        initializeLightbox();
      }
    } catch (error) {
      iziToast.error({ message: 'Something went wrong, please try again!' });
    } finally {
      hideLoader();
    }
  });
} else {
  console.error('Load more button element not found');
}

function showLoader() {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.textContent = 'Loading...';
  gallery.appendChild(loader);
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.remove();
}

function clearGallery() {
  gallery.innerHTML = '';
}

function initializeLightbox() {
  new SimpleLightbox('.gallery a');
}
