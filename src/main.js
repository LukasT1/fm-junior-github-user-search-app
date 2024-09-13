/******/ (() => { // webpackBootstrap
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
const inputField = document.getElementById('username')
const searchButton = document.querySelector('.nav__search-box-btn')
const form = document.querySelector('.nav__search-box')
const errorMsg = document.querySelector('.search-box-error')
const main = document.querySelector('.main')
const body = document.querySelector('body')
const colorMode = document.querySelectorAll('.header__color-mode')
const iconLight = document.querySelector('.header__color-mode--light')
const iconDark = document.querySelector('.header__color-mode--dark')

function toggleColorMode() {
  body.classList.contains('light-mode') ?
    body.classList.replace('light-mode', 'dark-mode')
  : body.classList.replace('dark-mode', 'light-mode')
  iconLight.classList.toggle('hidden')
  iconDark.classList.toggle('hidden')
}

async function getData(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error fetching the data')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('The task failed succesfully')
    errorMsg.classList.add('search-box-error--visible')
  }
}

async function handleDataFetch() {
  const url = `https://api.github.com/users/${inputField.value}`
  const data = await getData(url)
  if (data) {
    renderData(data)
    console.log(data)
  }
}

function debounce(func, wait = 300) {
  let timeout
  return function (...args) {
    const later = () => {
      clearTimeout(timeout)
      func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function renderData(data) {
  errorMsg.classList.remove('search-box-error--visible')
  main.innerHTML = `<img class="main__image" src="${data.avatar_url}" alt="${data.name} avatar picture" />
    <div class="main__info">
      <div class="main__info-username h1">${data.name}</div>
      <div class="main__info-user-handle h3">@${data.login}</div>
      <div class="main__info-joined slate-grey p">Joined</div>
    </div>
    <div class="main__bio">
      <p class="main__bio-text">
      ${data.bio || `No bio provided`}
      </p>
    </div>
    <div class="main__stats">
      <div class="main__stats-repos">
        <h4>Repos</h4>
        <div class="h2 main__stats-repos-num">${data.public_repos}</div>
      </div>
      <div class="main__stats-followers">
        <h4>Followers</h4>
        <div class="h2 main__stats-followers-num">${data.followers}</div>
      </div>
      <div class="main__stats-following">
        <h4>Following</h4>
        <div class="h2 main__stats-following-num">${data.following}</div>
      </div>
    </div>
    <div class="main__socials">
      <div class="main__socials-location">
        <svg height="20" width="14" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.797 3.425C11.584 1.33 9.427.05 7.03.002a7.483 7.483 0 00-.308 0C4.325.05 2.17 1.33.955 3.425a6.963 6.963 0 00-.09 6.88l4.959 9.077.007.012c.218.38.609.606 1.045.606.437 0 .828-.226 1.046-.606l.007-.012 4.96-9.077a6.963 6.963 0 00-.092-6.88zm-5.92 5.638c-1.552 0-2.813-1.262-2.813-2.813s1.261-2.812 2.812-2.812S9.69 4.699 9.69 6.25 8.427 9.063 6.876 9.063z"
            fill="#4b6a9b" />
        </svg>
        <p class="main__socials-location-id">${data.location || `Not Available`}</p>
      </div>
      <div class="main__socials-twitter ${data.twitter_username ? '' : 'disabled'}">
        <svg height="18" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 2.799a8.549 8.549 0 01-2.363.647 4.077 4.077 0 001.804-2.266 8.194 8.194 0 01-2.6.993A4.099 4.099 0 009.75 4.977c0 .324.027.637.095.934-3.409-.166-6.425-1.8-8.452-4.288a4.128 4.128 0 00-.56 2.072c0 1.42.73 2.679 1.82 3.408A4.05 4.05 0 01.8 6.598v.045a4.119 4.119 0 003.285 4.028 4.092 4.092 0 01-1.075.135c-.263 0-.528-.015-.776-.07.531 1.624 2.038 2.818 3.831 2.857A8.239 8.239 0 01.981 15.34 7.68 7.68 0 010 15.285a11.543 11.543 0 006.29 1.84c7.545 0 11.67-6.25 11.67-11.667 0-.182-.006-.357-.015-.53A8.18 8.18 0 0020 2.798z"
            fill="#4b6a9b" />
        </svg>
        <a href="${data.twitter_username ? `https://x.com/${data.twitter_username}` : ``}" target="_blank" class="main__socials-twitter-id">
        ${data.twitter_username ? `https://x.com/${data.twitter_username}` : `Not Available`}
        </a>     
       
      </div>
      <div class="main__socials-web ${data.html_url ? '' : 'disabled'}">
        <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
          <g fill="#4b6a9b">
            <path
              d="M7.404 5.012c-2.355 2.437-1.841 6.482.857 8.273.089.06.207.048.283-.027.568-.555 1.049-1.093 1.47-1.776a.213.213 0 00-.084-.3A2.743 2.743 0 018.878 10.1a2.64 2.64 0 01-.223-1.803c.168-.815 1.043-1.573 1.711-2.274l-.004-.002 2.504-2.555a2.568 2.568 0 013.648-.019 2.6 2.6 0 01.037 3.666l-1.517 1.56a.266.266 0 00-.06.273c.35 1.012.435 2.44.201 3.519-.006.03.031.05.053.028l3.228-3.295c2.062-2.105 2.044-5.531-.04-7.615a5.416 5.416 0 00-7.691.04L7.417 4.998l-.013.014z" />
            <path
              d="M13.439 13.75a.401.401 0 00.006-.003c.659-1.204.788-2.586.48-3.933l-.002.002-.001-.001a5.434 5.434 0 00-2.19-3.124.3.3 0 00-.333.015c-.553.448-1.095 1.021-1.452 1.754a.243.243 0 00.096.317c.415.24.79.593 1.04 1.061h.001c.196.33.388.958.263 1.632-.116.894-1.019 1.714-1.736 2.453-.546.559-1.935 1.974-2.49 2.542a2.6 2.6 0 01-3.666.037 2.6 2.6 0 01-.038-3.666l1.521-1.564A.266.266 0 005 11.004c-.338-1.036-.43-2.432-.217-3.51.006-.03-.031-.049-.053-.027l-3.179 3.245c-2.083 2.126-2.066 5.588.04 7.693 2.125 2.083 5.57 2.048 7.653-.078.723-.81 3.821-3.678 4.195-4.577z" />
          </g>
        </svg>
        
       <a href="${data.html_url ? data.html_url : `#`}" target="_blank" class="main__socials-web-id">
        ${data.html_url ? data.html_url.slice(8) : `Not Available`}
        </a>   
      </div>
      <div class="main__socials-company ${data.company ? '' : 'disabled'}">
        <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
          <g fill="#4b6a9b">
            <path
              d="M10.858 1.558L1.7.167A1.477 1.477 0 00.517.492 1.49 1.49 0 000 1.608v17.559c0 .458.375.833.833.833h2.709v-4.375c0-.808.65-1.458 1.458-1.458h2.083c.809 0 1.459.65 1.459 1.458V20h3.541V3a1.46 1.46 0 00-1.225-1.442zM4.583 12.292h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm4.167 7.5H7.5a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5H7.5a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5H7.5a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5H7.5a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zM18.85 9.035l-5.933-1.242V20h5.625A1.46 1.46 0 0020 18.542V10.46c0-.688-.47-1.274-1.15-1.425zM16.875 17.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25z" />
          </g>
        </svg>
         <a href="${data.company ? data.company : `#`}" target="_blank" class="main__socials-web-id">
        ${data.company ? data.company : `Not Available`}
        </a>  
        
      </div>
    </div>`
  main.classList.add('main--visible')
}
const debouncedHandleChange = debounce(handleChange, 400)

function handleChange() {
  main.classList.remove('main--visible')
  if (!errorMsg.classList.contains('search-box-error--visible')) return
  errorMsg.classList.remove('search-box-error--visible')
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  handleDataFetch()
})

colorMode.forEach(el => el.addEventListener('click', toggleColorMode))

inputField.addEventListener('input', handleChange)

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsaUJBQWlCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvREFBb0QsZ0JBQWdCLFNBQVMsV0FBVztBQUN4RjtBQUNBLDRDQUE0QyxVQUFVO0FBQ3RELGdEQUFnRCxXQUFXO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsa0JBQWtCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxlQUFlO0FBQ25FO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxlQUFlO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxpQ0FBaUM7QUFDaEY7QUFDQSwwQ0FBMEMsd0NBQXdDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIseUNBQXlDLHNCQUFzQixPQUFPO0FBQ3pGLFVBQVUseUNBQXlDLHNCQUFzQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZ0NBQWdDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixvQ0FBb0M7QUFDdEQsVUFBVTtBQUNWO0FBQ0E7QUFDQSwwQ0FBMEMsK0JBQStCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQ0FBa0M7QUFDdEQsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2dpdGh1Yl91c2VyX3NlYXJjaF9hcHAvLi9zcmMvc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJylcbmNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX3NlYXJjaC1ib3gtYnRuJylcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19zZWFyY2gtYm94JylcbmNvbnN0IGVycm9yTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1ib3gtZXJyb3InKVxuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJylcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbmNvbnN0IGNvbG9yTW9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfX2NvbG9yLW1vZGUnKVxuY29uc3QgaWNvbkxpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29sb3ItbW9kZS0tbGlnaHQnKVxuY29uc3QgaWNvbkRhcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jb2xvci1tb2RlLS1kYXJrJylcblxuZnVuY3Rpb24gdG9nZ2xlQ29sb3JNb2RlKCkge1xuICBib2R5LmNsYXNzTGlzdC5jb250YWlucygnbGlnaHQtbW9kZScpID9cbiAgICBib2R5LmNsYXNzTGlzdC5yZXBsYWNlKCdsaWdodC1tb2RlJywgJ2RhcmstbW9kZScpXG4gIDogYm9keS5jbGFzc0xpc3QucmVwbGFjZSgnZGFyay1tb2RlJywgJ2xpZ2h0LW1vZGUnKVxuICBpY29uTGlnaHQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgaWNvbkRhcmsuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YSh1cmwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybClcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGZldGNoaW5nIHRoZSBkYXRhJylcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgIHJldHVybiBkYXRhXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignVGhlIHRhc2sgZmFpbGVkIHN1Y2Nlc2Z1bGx5JylcbiAgICBlcnJvck1zZy5jbGFzc0xpc3QuYWRkKCdzZWFyY2gtYm94LWVycm9yLS12aXNpYmxlJylcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVEYXRhRmV0Y2goKSB7XG4gIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzLyR7aW5wdXRGaWVsZC52YWx1ZX1gXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXREYXRhKHVybClcbiAgaWYgKGRhdGEpIHtcbiAgICByZW5kZXJEYXRhKGRhdGEpXG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0ID0gMzAwKSB7XG4gIGxldCB0aW1lb3V0XG4gIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfVxuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckRhdGEoZGF0YSkge1xuICBlcnJvck1zZy5jbGFzc0xpc3QucmVtb3ZlKCdzZWFyY2gtYm94LWVycm9yLS12aXNpYmxlJylcbiAgbWFpbi5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cIm1haW5fX2ltYWdlXCIgc3JjPVwiJHtkYXRhLmF2YXRhcl91cmx9XCIgYWx0PVwiJHtkYXRhLm5hbWV9IGF2YXRhciBwaWN0dXJlXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwibWFpbl9faW5mb1wiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX2luZm8tdXNlcm5hbWUgaDFcIj4ke2RhdGEubmFtZX08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19pbmZvLXVzZXItaGFuZGxlIGgzXCI+QCR7ZGF0YS5sb2dpbn08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19pbmZvLWpvaW5lZCBzbGF0ZS1ncmV5IHBcIj5Kb2luZWQ8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibWFpbl9fYmlvXCI+XG4gICAgICA8cCBjbGFzcz1cIm1haW5fX2Jpby10ZXh0XCI+XG4gICAgICAke2RhdGEuYmlvIHx8IGBObyBiaW8gcHJvdmlkZWRgfVxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtYWluX19zdGF0c1wiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3N0YXRzLXJlcG9zXCI+XG4gICAgICAgIDxoND5SZXBvczwvaDQ+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoMiBtYWluX19zdGF0cy1yZXBvcy1udW1cIj4ke2RhdGEucHVibGljX3JlcG9zfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fc3RhdHMtZm9sbG93ZXJzXCI+XG4gICAgICAgIDxoND5Gb2xsb3dlcnM8L2g0PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaDIgbWFpbl9fc3RhdHMtZm9sbG93ZXJzLW51bVwiPiR7ZGF0YS5mb2xsb3dlcnN9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19zdGF0cy1mb2xsb3dpbmdcIj5cbiAgICAgICAgPGg0PkZvbGxvd2luZzwvaDQ+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoMiBtYWluX19zdGF0cy1mb2xsb3dpbmctbnVtXCI+JHtkYXRhLmZvbGxvd2luZ308L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtYWluX19zb2NpYWxzXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fc29jaWFscy1sb2NhdGlvblwiPlxuICAgICAgICA8c3ZnIGhlaWdodD1cIjIwXCIgd2lkdGg9XCIxNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD1cIk0xMi43OTcgMy40MjVDMTEuNTg0IDEuMzMgOS40MjcuMDUgNy4wMy4wMDJhNy40ODMgNy40ODMgMCAwMC0uMzA4IDBDNC4zMjUuMDUgMi4xNyAxLjMzLjk1NSAzLjQyNWE2Ljk2MyA2Ljk2MyAwIDAwLS4wOSA2Ljg4bDQuOTU5IDkuMDc3LjAwNy4wMTJjLjIxOC4zOC42MDkuNjA2IDEuMDQ1LjYwNi40MzcgMCAuODI4LS4yMjYgMS4wNDYtLjYwNmwuMDA3LS4wMTIgNC45Ni05LjA3N2E2Ljk2MyA2Ljk2MyAwIDAwLS4wOTItNi44OHptLTUuOTIgNS42MzhjLTEuNTUyIDAtMi44MTMtMS4yNjItMi44MTMtMi44MTNzMS4yNjEtMi44MTIgMi44MTItMi44MTJTOS42OSA0LjY5OSA5LjY5IDYuMjUgOC40MjcgOS4wNjMgNi44NzYgOS4wNjN6XCJcbiAgICAgICAgICAgIGZpbGw9XCIjNGI2YTliXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIDxwIGNsYXNzPVwibWFpbl9fc29jaWFscy1sb2NhdGlvbi1pZFwiPiR7ZGF0YS5sb2NhdGlvbiB8fCBgTm90IEF2YWlsYWJsZWB9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fc29jaWFscy10d2l0dGVyICR7ZGF0YS50d2l0dGVyX3VzZXJuYW1lID8gJycgOiAnZGlzYWJsZWQnfVwiPlxuICAgICAgICA8c3ZnIGhlaWdodD1cIjE4XCIgd2lkdGg9XCIyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD1cIk0yMCAyLjc5OWE4LjU0OSA4LjU0OSAwIDAxLTIuMzYzLjY0NyA0LjA3NyA0LjA3NyAwIDAwMS44MDQtMi4yNjYgOC4xOTQgOC4xOTQgMCAwMS0yLjYuOTkzQTQuMDk5IDQuMDk5IDAgMDA5Ljc1IDQuOTc3YzAgLjMyNC4wMjcuNjM3LjA5NS45MzQtMy40MDktLjE2Ni02LjQyNS0xLjgtOC40NTItNC4yODhhNC4xMjggNC4xMjggMCAwMC0uNTYgMi4wNzJjMCAxLjQyLjczIDIuNjc5IDEuODIgMy40MDhBNC4wNSA0LjA1IDAgMDEuOCA2LjU5OHYuMDQ1YTQuMTE5IDQuMTE5IDAgMDAzLjI4NSA0LjAyOCA0LjA5MiA0LjA5MiAwIDAxLTEuMDc1LjEzNWMtLjI2MyAwLS41MjgtLjAxNS0uNzc2LS4wNy41MzEgMS42MjQgMi4wMzggMi44MTggMy44MzEgMi44NTdBOC4yMzkgOC4yMzkgMCAwMS45ODEgMTUuMzQgNy42OCA3LjY4IDAgMDEwIDE1LjI4NWExMS41NDMgMTEuNTQzIDAgMDA2LjI5IDEuODRjNy41NDUgMCAxMS42Ny02LjI1IDExLjY3LTExLjY2NyAwLS4xODItLjAwNi0uMzU3LS4wMTUtLjUzQTguMTggOC4xOCAwIDAwMjAgMi43OTh6XCJcbiAgICAgICAgICAgIGZpbGw9XCIjNGI2YTliXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIDxhIGhyZWY9XCIke2RhdGEudHdpdHRlcl91c2VybmFtZSA/IGBodHRwczovL3guY29tLyR7ZGF0YS50d2l0dGVyX3VzZXJuYW1lfWAgOiBgYH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cIm1haW5fX3NvY2lhbHMtdHdpdHRlci1pZFwiPlxuICAgICAgICAke2RhdGEudHdpdHRlcl91c2VybmFtZSA/IGBodHRwczovL3guY29tLyR7ZGF0YS50d2l0dGVyX3VzZXJuYW1lfWAgOiBgTm90IEF2YWlsYWJsZWB9XG4gICAgICAgIDwvYT4gICAgIFxuICAgICAgIFxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fc29jaWFscy13ZWIgJHtkYXRhLmh0bWxfdXJsID8gJycgOiAnZGlzYWJsZWQnfVwiPlxuICAgICAgICA8c3ZnIGhlaWdodD1cIjIwXCIgd2lkdGg9XCIyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8ZyBmaWxsPVwiIzRiNmE5YlwiPlxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgZD1cIk03LjQwNCA1LjAxMmMtMi4zNTUgMi40MzctMS44NDEgNi40ODIuODU3IDguMjczLjA4OS4wNi4yMDcuMDQ4LjI4My0uMDI3LjU2OC0uNTU1IDEuMDQ5LTEuMDkzIDEuNDctMS43NzZhLjIxMy4yMTMgMCAwMC0uMDg0LS4zQTIuNzQzIDIuNzQzIDAgMDE4Ljg3OCAxMC4xYTIuNjQgMi42NCAwIDAxLS4yMjMtMS44MDNjLjE2OC0uODE1IDEuMDQzLTEuNTczIDEuNzExLTIuMjc0bC0uMDA0LS4wMDIgMi41MDQtMi41NTVhMi41NjggMi41NjggMCAwMTMuNjQ4LS4wMTkgMi42IDIuNiAwIDAxLjAzNyAzLjY2NmwtMS41MTcgMS41NmEuMjY2LjI2NiAwIDAwLS4wNi4yNzNjLjM1IDEuMDEyLjQzNSAyLjQ0LjIwMSAzLjUxOS0uMDA2LjAzLjAzMS4wNS4wNTMuMDI4bDMuMjI4LTMuMjk1YzIuMDYyLTIuMTA1IDIuMDQ0LTUuNTMxLS4wNC03LjYxNWE1LjQxNiA1LjQxNiAwIDAwLTcuNjkxLjA0TDcuNDE3IDQuOTk4bC0uMDEzLjAxNHpcIiAvPlxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgZD1cIk0xMy40MzkgMTMuNzVhLjQwMS40MDEgMCAwMC4wMDYtLjAwM2MuNjU5LTEuMjA0Ljc4OC0yLjU4Ni40OC0zLjkzM2wtLjAwMi4wMDItLjAwMS0uMDAxYTUuNDM0IDUuNDM0IDAgMDAtMi4xOS0zLjEyNC4zLjMgMCAwMC0uMzMzLjAxNWMtLjU1My40NDgtMS4wOTUgMS4wMjEtMS40NTIgMS43NTRhLjI0My4yNDMgMCAwMC4wOTYuMzE3Yy40MTUuMjQuNzkuNTkzIDEuMDQgMS4wNjFoLjAwMWMuMTk2LjMzLjM4OC45NTguMjYzIDEuNjMyLS4xMTYuODk0LTEuMDE5IDEuNzE0LTEuNzM2IDIuNDUzLS41NDYuNTU5LTEuOTM1IDEuOTc0LTIuNDkgMi41NDJhMi42IDIuNiAwIDAxLTMuNjY2LjAzNyAyLjYgMi42IDAgMDEtLjAzOC0zLjY2NmwxLjUyMS0xLjU2NEEuMjY2LjI2NiAwIDAwNSAxMS4wMDRjLS4zMzgtMS4wMzYtLjQzLTIuNDMyLS4yMTctMy41MS4wMDYtLjAzLS4wMzEtLjA0OS0uMDUzLS4wMjdsLTMuMTc5IDMuMjQ1Yy0yLjA4MyAyLjEyNi0yLjA2NiA1LjU4OC4wNCA3LjY5MyAyLjEyNSAyLjA4MyA1LjU3IDIuMDQ4IDcuNjUzLS4wNzguNzIzLS44MSAzLjgyMS0zLjY3OCA0LjE5NS00LjU3N3pcIiAvPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIFxuICAgICAgIDxhIGhyZWY9XCIke2RhdGEuaHRtbF91cmwgPyBkYXRhLmh0bWxfdXJsIDogYCNgfVwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwibWFpbl9fc29jaWFscy13ZWItaWRcIj5cbiAgICAgICAgJHtkYXRhLmh0bWxfdXJsID8gZGF0YS5odG1sX3VybC5zbGljZSg4KSA6IGBOb3QgQXZhaWxhYmxlYH1cbiAgICAgICAgPC9hPiAgIFxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fc29jaWFscy1jb21wYW55ICR7ZGF0YS5jb21wYW55ID8gJycgOiAnZGlzYWJsZWQnfVwiPlxuICAgICAgICA8c3ZnIGhlaWdodD1cIjIwXCIgd2lkdGg9XCIyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8ZyBmaWxsPVwiIzRiNmE5YlwiPlxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgZD1cIk0xMC44NTggMS41NThMMS43LjE2N0ExLjQ3NyAxLjQ3NyAwIDAwLjUxNy40OTIgMS40OSAxLjQ5IDAgMDAwIDEuNjA4djE3LjU1OWMwIC40NTguMzc1LjgzMy44MzMuODMzaDIuNzA5di00LjM3NWMwLS44MDguNjUtMS40NTggMS40NTgtMS40NThoMi4wODNjLjgwOSAwIDEuNDU5LjY1IDEuNDU5IDEuNDU4VjIwaDMuNTQxVjNhMS40NiAxLjQ2IDAgMDAtMS4yMjUtMS40NDJ6TTQuNTgzIDEyLjI5MmgtMS4yNWEuNjI1LjYyNSAwIDAxMC0xLjI1aDEuMjVhLjYyNS42MjUgMCAwMTAgMS4yNXptMC0yLjVoLTEuMjVhLjYyNS42MjUgMCAwMTAtMS4yNWgxLjI1YS42MjUuNjI1IDAgMDEwIDEuMjV6bTAtMi41aC0xLjI1YS42MjUuNjI1IDAgMDEwLTEuMjVoMS4yNWEuNjI1LjYyNSAwIDAxMCAxLjI1em0wLTIuNWgtMS4yNWEuNjI1LjYyNSAwIDAxMC0xLjI1aDEuMjVhLjYyNS42MjUgMCAwMTAgMS4yNXptNC4xNjcgNy41SDcuNWEuNjI1LjYyNSAwIDAxMC0xLjI1aDEuMjVhLjYyNS42MjUgMCAwMTAgMS4yNXptMC0yLjVINy41YS42MjUuNjI1IDAgMDEwLTEuMjVoMS4yNWEuNjI1LjYyNSAwIDAxMCAxLjI1em0wLTIuNUg3LjVhLjYyNS42MjUgMCAwMTAtMS4yNWgxLjI1YS42MjUuNjI1IDAgMDEwIDEuMjV6bTAtMi41SDcuNWEuNjI1LjYyNSAwIDAxMC0xLjI1aDEuMjVhLjYyNS42MjUgMCAwMTAgMS4yNXpNMTguODUgOS4wMzVsLTUuOTMzLTEuMjQyVjIwaDUuNjI1QTEuNDYgMS40NiAwIDAwMjAgMTguNTQyVjEwLjQ2YzAtLjY4OC0uNDctMS4yNzQtMS4xNS0xLjQyNXpNMTYuODc1IDE3LjVoLTEuMjVhLjYyNS42MjUgMCAwMTAtMS4yNWgxLjI1YS42MjUuNjI1IDAgMDEwIDEuMjV6bTAtMi41aC0xLjI1YS42MjUuNjI1IDAgMDEwLTEuMjVoMS4yNWEuNjI1LjYyNSAwIDAxMCAxLjI1em0wLTIuNWgtMS4yNWEuNjI1LjYyNSAwIDAxMC0xLjI1aDEuMjVhLjYyNS42MjUgMCAwMTAgMS4yNXpcIiAvPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgICA8YSBocmVmPVwiJHtkYXRhLmNvbXBhbnkgPyBkYXRhLmNvbXBhbnkgOiBgI2B9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJtYWluX19zb2NpYWxzLXdlYi1pZFwiPlxuICAgICAgICAke2RhdGEuY29tcGFueSA/IGRhdGEuY29tcGFueSA6IGBOb3QgQXZhaWxhYmxlYH1cbiAgICAgICAgPC9hPiAgXG4gICAgICAgIFxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YFxuICBtYWluLmNsYXNzTGlzdC5hZGQoJ21haW4tLXZpc2libGUnKVxufVxuY29uc3QgZGVib3VuY2VkSGFuZGxlQ2hhbmdlID0gZGVib3VuY2UoaGFuZGxlQ2hhbmdlLCA0MDApXG5cbmZ1bmN0aW9uIGhhbmRsZUNoYW5nZSgpIHtcbiAgbWFpbi5jbGFzc0xpc3QucmVtb3ZlKCdtYWluLS12aXNpYmxlJylcbiAgaWYgKCFlcnJvck1zZy5jbGFzc0xpc3QuY29udGFpbnMoJ3NlYXJjaC1ib3gtZXJyb3ItLXZpc2libGUnKSkgcmV0dXJuXG4gIGVycm9yTXNnLmNsYXNzTGlzdC5yZW1vdmUoJ3NlYXJjaC1ib3gtZXJyb3ItLXZpc2libGUnKVxufVxuXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKVxuICBoYW5kbGVEYXRhRmV0Y2goKVxufSlcblxuY29sb3JNb2RlLmZvckVhY2goZWwgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVDb2xvck1vZGUpKVxuXG5pbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaGFuZGxlQ2hhbmdlKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9