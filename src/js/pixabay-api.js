import CryptoJS from 'crypto-js';

// Функция для получения и расшифровки API-ключа
const getApiKey = () => {
  const encryptedKey = localStorage.getItem('encrypted_api_key');

  if (!encryptedKey) {
    console.error('Encrypted API key не найден');
    return null;
  }

  // Расшифровываем ключ
  const bytes = CryptoJS.AES.decrypt(encryptedKey, 'your-secret-passphrase');
  const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);

  if (!decryptedKey) {
    console.error('Ошибка расшифровки API ключа');
    return null;
  }

  return decryptedKey;
};

// Функция для получения изображений из API
export const fetchImages = async (query) => {
  const API_KEY = getApiKey(); // Получаем расшифрованный ключ

  if (!API_KEY) {
    console.error('API ключ отсутствует');
    return [];
  }

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

// Функция для рендера изображений
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
