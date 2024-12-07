export const renderImages = (images) => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Очистить старые изображения перед новым запросом

  images.forEach(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    const card = `
      <div class="card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <p>Likes: ${likes} | Views: ${views} | Comments: ${comments} | Downloads: ${downloads}</p>
      </div>
    `;
    gallery.insertAdjacentHTML('beforeend', card);
  });
};

// Добавьте экспорт функции fetchImages
export const fetchImages = async (query) => {
  const API_KEY = '47502659-8e710eb0ff3e952458316b5b2';
  const BASE_URL = 'https://pixabay.com/api/';

  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка при получении данных: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.hits || data.hits.length === 0) {
      throw new Error('Нет изображений по запросу');
    }

    return data.hits; // Возвращаем массив с изображениями
  } catch (error) {
    console.error(error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
};
