export const renderImages = (images) => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Очистить старые изображения перед новым запросом

  console.log('Изображения для отображения:', images); // Логируем изображения

  if (images.length === 0) {
    gallery.innerHTML = '<p>No images found</p>';
    return;
  }

  // Строим строки HTML для всех изображений
  const cards = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <div class="card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags || 'Image'}" />
        </a>
        <p>Likes: ${likes} | Views: ${views} | Comments: ${comments} | Downloads: ${downloads}</p>
      </div>
    `;
  }).join(''); // Преобразуем массив строк в одну строку

  // Вставляем все карточки в галерею
  gallery.insertAdjacentHTML('beforeend', cards);
};

// Функция для получения изображений из API
export const fetchImages = async (query) => {
  const API_KEY = '47502659-8e710eb0ff3e952458316b5b2';
  const BASE_URL = 'https://pixabay.com/api/';

  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
    console.log('Запрос к API:', url); // Логируем URL запроса

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка при получении данных: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Полученные данные:', data); // Логируем полученные данные

    if (!data.hits || data.hits.length === 0) {
      throw new Error('No images found');
    }

    return data.hits; // Возвращаем массив с изображениями
  } catch (error) {
    console.error(error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
};
