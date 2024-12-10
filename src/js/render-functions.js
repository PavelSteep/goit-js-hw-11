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
