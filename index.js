import{i as a,S}from"./assets/vendor-DDwt-mbX.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const u=async r=>{const o="47502659-8e710eb0ff3e952458316b5b2",n="https://pixabay.com/api/";try{const s=`${n}?key=${o}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true`;console.log("Запрос к API:",s);const e=await fetch(s);if(!e.ok)throw new Error(`Ошибка при получении данных: ${e.statusText}`);const t=await e.json();if(console.log("Полученные данные:",t),!t.hits||t.hits.length===0)throw new Error("No images found");return t.hits}catch(s){return console.error(s),[]}},d=r=>{const o=document.querySelector(".gallery");if(o.innerHTML="",console.log("Изображения для отображения:",r),r.length===0){o.innerHTML="<p>No images found</p>";return}const n=r.map(({webformatURL:s,largeImageURL:e,tags:t,likes:i,views:p,comments:L,downloads:w})=>`
      <div class="card">
        <a href="${e}">
          <img src="${s}" alt="${t||"Image"}" />
        </a>
        <p>Likes: ${i} | Views: ${p} | Comments: ${L} | Downloads: ${w}</p>
      </div>
    `).join("");o.insertAdjacentHTML("beforeend",n)},c=document.querySelector("#search-form"),m=document.querySelector(".search-input"),f=document.querySelector(".gallery"),l=document.querySelector(".load-more");c?c.addEventListener("submit",async r=>{r.preventDefault();const o=m.value.trim();if(!o){a.error({message:"Please enter a search term"});return}g(),b();try{const n=await u(o);n.length===0?a.info({message:"Sorry, there are no images matching your search query. Please try again!"}):(d(n),y())}catch{a.error({message:"Something went wrong, please try again!"})}finally{h()}}):console.error("Search form element not found");l?l.addEventListener("click",async()=>{const r=m.value.trim();if(!r){a.error({message:"Please enter a search term"});return}g();try{const o=await u(r);o.length===0?a.info({message:"Sorry, there are no more images to load."}):(d(o),y())}catch{a.error({message:"Something went wrong, please try again!"})}finally{h()}}):console.error("Load more button element not found");function g(){const r=document.createElement("div");r.classList.add("loader"),r.textContent="Loading...",f.appendChild(r)}function h(){const r=document.querySelector(".loader");r&&r.remove()}function b(){f.innerHTML=""}function y(){new S(".gallery a")}
//# sourceMappingURL=index.js.map
