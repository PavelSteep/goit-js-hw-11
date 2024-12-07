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
