const API_KEY = '47502659-8e710eb0ff3e952458316b5b2';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query) => {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка при получении данных: ${response.statusText}`);
    }

    const data = await response.json();

    // Проверка на наличие данных
    if (!data.hits || data.hits.length === 0) {
      throw new Error('Нет изображений по запросу');
    }

    return data.hits; // Возвращаем массив с изображениями
  } catch (error) {
    console.error(error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
};
