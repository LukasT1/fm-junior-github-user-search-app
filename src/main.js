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
const loader = document.querySelector('.loader')

const prefersDark = window.matchMedia('(prefers-color-scheme: dark')

if (prefersDark.matches && !body.classList.contains('dark-mode')) {
  toggleColorMode()
} else {
}

function toggleColorMode() {
  body.classList.contains('light-mode') ?
    body.classList.replace('light-mode', 'dark-mode')
  : body.classList.replace('dark-mode', 'light-mode')
  iconLight.classList.toggle('hidden')
  iconDark.classList.toggle('hidden')
}

async function getData(url) {
  try {
    loader.style.display = 'block'
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error fetching the data')
    }
    const data = await response.json()

    return data
  } catch (error) {
    console.error('The task failed succesfully')
    errorMsg.classList.add('search-box-error--visible')
    loader.style.display = 'none'
  }
}

async function handleDataFetch() {
  const url = `https://api.github.com/users/${inputField.value}`
  const data = await getData(url)
  if (data) {
    renderData(data)
    loader.style.display = 'none'
    console.log(data)
  }
}

// function debounce(func, wait = 300) {
//   let timeout
//   return function (...args) {
//     const later = () => {
//       clearTimeout(timeout)
//       func.apply(this, args)
//     }
//     clearTimeout(timeout)
//     timeout = setTimeout(later, wait)
//   }
// }

function renderData(data) {
  errorMsg.classList.remove('search-box-error--visible')
  const date = new Date(data.created_at)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    date,
  )

  main.innerHTML = `<img class="main__image" src="${data.avatar_url}" alt="${data.name} avatar picture" />
    <div class="main__info">
      <div class="main__info-username h1">${data.name}</div>
      <div class="main__info-user-handle h3">@${data.login}</div>
      <div class="main__info-joined slate-grey p">Joined ${formattedDate}</div>
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
// const debouncedHandleChange = debounce(handleChange, 400)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsaUJBQWlCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvREFBb0QsZ0JBQWdCLFNBQVMsV0FBVztBQUN4RjtBQUNBLDRDQUE0QyxVQUFVO0FBQ3RELGdEQUFnRCxXQUFXO0FBQzNELDJEQUEyRCxjQUFjO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELGtCQUFrQjtBQUNsRTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsZUFBZTtBQUNuRTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsZUFBZTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsaUNBQWlDO0FBQ2hGO0FBQ0EsMENBQTBDLHdDQUF3QztBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlDQUF5QyxzQkFBc0IsT0FBTztBQUN6RixVQUFVLHlDQUF5QyxzQkFBc0I7QUFDekU7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGdDQUFnQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isb0NBQW9DO0FBQ3RELFVBQVU7QUFDVjtBQUNBO0FBQ0EsMENBQTBDLCtCQUErQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0NBQWtDO0FBQ3RELFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9naXRodWJfdXNlcl9zZWFyY2hfYXBwLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaW5wdXRGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpXG5jb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19zZWFyY2gtYm94LWJ0bicpXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9fc2VhcmNoLWJveCcpXG5jb25zdCBlcnJvck1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYm94LWVycm9yJylcbmNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpXG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG5jb25zdCBjb2xvck1vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGVhZGVyX19jb2xvci1tb2RlJylcbmNvbnN0IGljb25MaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2NvbG9yLW1vZGUtLWxpZ2h0JylcbmNvbnN0IGljb25EYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29sb3ItbW9kZS0tZGFyaycpXG5jb25zdCBsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGVyJylcblxuY29uc3QgcHJlZmVyc0RhcmsgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrJylcblxuaWYgKHByZWZlcnNEYXJrLm1hdGNoZXMgJiYgIWJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXJrLW1vZGUnKSkge1xuICB0b2dnbGVDb2xvck1vZGUoKVxufSBlbHNlIHtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlQ29sb3JNb2RlKCkge1xuICBib2R5LmNsYXNzTGlzdC5jb250YWlucygnbGlnaHQtbW9kZScpID9cbiAgICBib2R5LmNsYXNzTGlzdC5yZXBsYWNlKCdsaWdodC1tb2RlJywgJ2RhcmstbW9kZScpXG4gIDogYm9keS5jbGFzc0xpc3QucmVwbGFjZSgnZGFyay1tb2RlJywgJ2xpZ2h0LW1vZGUnKVxuICBpY29uTGlnaHQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgaWNvbkRhcmsuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YSh1cmwpIHtcbiAgdHJ5IHtcbiAgICBsb2FkZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybClcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGZldGNoaW5nIHRoZSBkYXRhJylcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuXG4gICAgcmV0dXJuIGRhdGFcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdUaGUgdGFzayBmYWlsZWQgc3VjY2VzZnVsbHknKVxuICAgIGVycm9yTXNnLmNsYXNzTGlzdC5hZGQoJ3NlYXJjaC1ib3gtZXJyb3ItLXZpc2libGUnKVxuICAgIGxvYWRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlRGF0YUZldGNoKCkge1xuICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy8ke2lucHV0RmllbGQudmFsdWV9YFxuICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0RGF0YSh1cmwpXG4gIGlmIChkYXRhKSB7XG4gICAgcmVuZGVyRGF0YShkYXRhKVxuICAgIGxvYWRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgfVxufVxuXG4vLyBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0ID0gMzAwKSB7XG4vLyAgIGxldCB0aW1lb3V0XG4vLyAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuLy8gICAgIGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuLy8gICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4vLyAgICAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpXG4vLyAgICAgfVxuLy8gICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuLy8gICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KVxuLy8gICB9XG4vLyB9XG5cbmZ1bmN0aW9uIHJlbmRlckRhdGEoZGF0YSkge1xuICBlcnJvck1zZy5jbGFzc0xpc3QucmVtb3ZlKCdzZWFyY2gtYm94LWVycm9yLS12aXNpYmxlJylcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdClcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgbW9udGg6ICdsb25nJyxcbiAgICBkYXk6ICdudW1lcmljJyxcbiAgfVxuICBjb25zdCBmb3JtYXR0ZWREYXRlID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoJ2VuLVVTJywgb3B0aW9ucykuZm9ybWF0KFxuICAgIGRhdGUsXG4gIClcblxuICBtYWluLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwibWFpbl9faW1hZ2VcIiBzcmM9XCIke2RhdGEuYXZhdGFyX3VybH1cIiBhbHQ9XCIke2RhdGEubmFtZX0gYXZhdGFyIHBpY3R1cmVcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJtYWluX19pbmZvXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWFpbl9faW5mby11c2VybmFtZSBoMVwiPiR7ZGF0YS5uYW1lfTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX2luZm8tdXNlci1oYW5kbGUgaDNcIj5AJHtkYXRhLmxvZ2lufTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX2luZm8tam9pbmVkIHNsYXRlLWdyZXkgcFwiPkpvaW5lZCAke2Zvcm1hdHRlZERhdGV9PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1haW5fX2Jpb1wiPlxuICAgICAgPHAgY2xhc3M9XCJtYWluX19iaW8tdGV4dFwiPlxuICAgICAgJHtkYXRhLmJpbyB8fCBgTm8gYmlvIHByb3ZpZGVkYH1cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibWFpbl9fc3RhdHNcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19zdGF0cy1yZXBvc1wiPlxuICAgICAgICA8aDQ+UmVwb3M8L2g0PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaDIgbWFpbl9fc3RhdHMtcmVwb3MtbnVtXCI+JHtkYXRhLnB1YmxpY19yZXBvc308L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3N0YXRzLWZvbGxvd2Vyc1wiPlxuICAgICAgICA8aDQ+Rm9sbG93ZXJzPC9oND5cbiAgICAgICAgPGRpdiBjbGFzcz1cImgyIG1haW5fX3N0YXRzLWZvbGxvd2Vycy1udW1cIj4ke2RhdGEuZm9sbG93ZXJzfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fc3RhdHMtZm9sbG93aW5nXCI+XG4gICAgICAgIDxoND5Gb2xsb3dpbmc8L2g0PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaDIgbWFpbl9fc3RhdHMtZm9sbG93aW5nLW51bVwiPiR7ZGF0YS5mb2xsb3dpbmd9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibWFpbl9fc29jaWFsc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3NvY2lhbHMtbG9jYXRpb25cIj5cbiAgICAgICAgPHN2ZyBoZWlnaHQ9XCIyMFwiIHdpZHRoPVwiMTRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGQ9XCJNMTIuNzk3IDMuNDI1QzExLjU4NCAxLjMzIDkuNDI3LjA1IDcuMDMuMDAyYTcuNDgzIDcuNDgzIDAgMDAtLjMwOCAwQzQuMzI1LjA1IDIuMTcgMS4zMy45NTUgMy40MjVhNi45NjMgNi45NjMgMCAwMC0uMDkgNi44OGw0Ljk1OSA5LjA3Ny4wMDcuMDEyYy4yMTguMzguNjA5LjYwNiAxLjA0NS42MDYuNDM3IDAgLjgyOC0uMjI2IDEuMDQ2LS42MDZsLjAwNy0uMDEyIDQuOTYtOS4wNzdhNi45NjMgNi45NjMgMCAwMC0uMDkyLTYuODh6bS01LjkyIDUuNjM4Yy0xLjU1MiAwLTIuODEzLTEuMjYyLTIuODEzLTIuODEzczEuMjYxLTIuODEyIDIuODEyLTIuODEyUzkuNjkgNC42OTkgOS42OSA2LjI1IDguNDI3IDkuMDYzIDYuODc2IDkuMDYzelwiXG4gICAgICAgICAgICBmaWxsPVwiIzRiNmE5YlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICA8cCBjbGFzcz1cIm1haW5fX3NvY2lhbHMtbG9jYXRpb24taWRcIj4ke2RhdGEubG9jYXRpb24gfHwgYE5vdCBBdmFpbGFibGVgfTwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3NvY2lhbHMtdHdpdHRlciAke2RhdGEudHdpdHRlcl91c2VybmFtZSA/ICcnIDogJ2Rpc2FibGVkJ31cIj5cbiAgICAgICAgPHN2ZyBoZWlnaHQ9XCIxOFwiIHdpZHRoPVwiMjBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGQ9XCJNMjAgMi43OTlhOC41NDkgOC41NDkgMCAwMS0yLjM2My42NDcgNC4wNzcgNC4wNzcgMCAwMDEuODA0LTIuMjY2IDguMTk0IDguMTk0IDAgMDEtMi42Ljk5M0E0LjA5OSA0LjA5OSAwIDAwOS43NSA0Ljk3N2MwIC4zMjQuMDI3LjYzNy4wOTUuOTM0LTMuNDA5LS4xNjYtNi40MjUtMS44LTguNDUyLTQuMjg4YTQuMTI4IDQuMTI4IDAgMDAtLjU2IDIuMDcyYzAgMS40Mi43MyAyLjY3OSAxLjgyIDMuNDA4QTQuMDUgNC4wNSAwIDAxLjggNi41OTh2LjA0NWE0LjExOSA0LjExOSAwIDAwMy4yODUgNC4wMjggNC4wOTIgNC4wOTIgMCAwMS0xLjA3NS4xMzVjLS4yNjMgMC0uNTI4LS4wMTUtLjc3Ni0uMDcuNTMxIDEuNjI0IDIuMDM4IDIuODE4IDMuODMxIDIuODU3QTguMjM5IDguMjM5IDAgMDEuOTgxIDE1LjM0IDcuNjggNy42OCAwIDAxMCAxNS4yODVhMTEuNTQzIDExLjU0MyAwIDAwNi4yOSAxLjg0YzcuNTQ1IDAgMTEuNjctNi4yNSAxMS42Ny0xMS42NjcgMC0uMTgyLS4wMDYtLjM1Ny0uMDE1LS41M0E4LjE4IDguMTggMCAwMDIwIDIuNzk4elwiXG4gICAgICAgICAgICBmaWxsPVwiIzRiNmE5YlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICA8YSBocmVmPVwiJHtkYXRhLnR3aXR0ZXJfdXNlcm5hbWUgPyBgaHR0cHM6Ly94LmNvbS8ke2RhdGEudHdpdHRlcl91c2VybmFtZX1gIDogYGB9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJtYWluX19zb2NpYWxzLXR3aXR0ZXItaWRcIj5cbiAgICAgICAgJHtkYXRhLnR3aXR0ZXJfdXNlcm5hbWUgPyBgaHR0cHM6Ly94LmNvbS8ke2RhdGEudHdpdHRlcl91c2VybmFtZX1gIDogYE5vdCBBdmFpbGFibGVgfVxuICAgICAgICA8L2E+ICAgICBcbiAgICAgICBcbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3NvY2lhbHMtd2ViICR7ZGF0YS5odG1sX3VybCA/ICcnIDogJ2Rpc2FibGVkJ31cIj5cbiAgICAgICAgPHN2ZyBoZWlnaHQ9XCIyMFwiIHdpZHRoPVwiMjBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPGcgZmlsbD1cIiM0YjZhOWJcIj5cbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgIGQ9XCJNNy40MDQgNS4wMTJjLTIuMzU1IDIuNDM3LTEuODQxIDYuNDgyLjg1NyA4LjI3My4wODkuMDYuMjA3LjA0OC4yODMtLjAyNy41NjgtLjU1NSAxLjA0OS0xLjA5MyAxLjQ3LTEuNzc2YS4yMTMuMjEzIDAgMDAtLjA4NC0uM0EyLjc0MyAyLjc0MyAwIDAxOC44NzggMTAuMWEyLjY0IDIuNjQgMCAwMS0uMjIzLTEuODAzYy4xNjgtLjgxNSAxLjA0My0xLjU3MyAxLjcxMS0yLjI3NGwtLjAwNC0uMDAyIDIuNTA0LTIuNTU1YTIuNTY4IDIuNTY4IDAgMDEzLjY0OC0uMDE5IDIuNiAyLjYgMCAwMS4wMzcgMy42NjZsLTEuNTE3IDEuNTZhLjI2Ni4yNjYgMCAwMC0uMDYuMjczYy4zNSAxLjAxMi40MzUgMi40NC4yMDEgMy41MTktLjAwNi4wMy4wMzEuMDUuMDUzLjAyOGwzLjIyOC0zLjI5NWMyLjA2Mi0yLjEwNSAyLjA0NC01LjUzMS0uMDQtNy42MTVhNS40MTYgNS40MTYgMCAwMC03LjY5MS4wNEw3LjQxNyA0Ljk5OGwtLjAxMy4wMTR6XCIgLz5cbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgIGQ9XCJNMTMuNDM5IDEzLjc1YS40MDEuNDAxIDAgMDAuMDA2LS4wMDNjLjY1OS0xLjIwNC43ODgtMi41ODYuNDgtMy45MzNsLS4wMDIuMDAyLS4wMDEtLjAwMWE1LjQzNCA1LjQzNCAwIDAwLTIuMTktMy4xMjQuMy4zIDAgMDAtLjMzMy4wMTVjLS41NTMuNDQ4LTEuMDk1IDEuMDIxLTEuNDUyIDEuNzU0YS4yNDMuMjQzIDAgMDAuMDk2LjMxN2MuNDE1LjI0Ljc5LjU5MyAxLjA0IDEuMDYxaC4wMDFjLjE5Ni4zMy4zODguOTU4LjI2MyAxLjYzMi0uMTE2Ljg5NC0xLjAxOSAxLjcxNC0xLjczNiAyLjQ1My0uNTQ2LjU1OS0xLjkzNSAxLjk3NC0yLjQ5IDIuNTQyYTIuNiAyLjYgMCAwMS0zLjY2Ni4wMzcgMi42IDIuNiAwIDAxLS4wMzgtMy42NjZsMS41MjEtMS41NjRBLjI2Ni4yNjYgMCAwMDUgMTEuMDA0Yy0uMzM4LTEuMDM2LS40My0yLjQzMi0uMjE3LTMuNTEuMDA2LS4wMy0uMDMxLS4wNDktLjA1My0uMDI3bC0zLjE3OSAzLjI0NWMtMi4wODMgMi4xMjYtMi4wNjYgNS41ODguMDQgNy42OTMgMi4xMjUgMi4wODMgNS41NyAyLjA0OCA3LjY1My0uMDc4LjcyMy0uODEgMy44MjEtMy42NzggNC4xOTUtNC41Nzd6XCIgLz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICBcbiAgICAgICA8YSBocmVmPVwiJHtkYXRhLmh0bWxfdXJsID8gZGF0YS5odG1sX3VybCA6IGAjYH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cIm1haW5fX3NvY2lhbHMtd2ViLWlkXCI+XG4gICAgICAgICR7ZGF0YS5odG1sX3VybCA/IGRhdGEuaHRtbF91cmwuc2xpY2UoOCkgOiBgTm90IEF2YWlsYWJsZWB9XG4gICAgICAgIDwvYT4gICBcbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3NvY2lhbHMtY29tcGFueSAke2RhdGEuY29tcGFueSA/ICcnIDogJ2Rpc2FibGVkJ31cIj5cbiAgICAgICAgPHN2ZyBoZWlnaHQ9XCIyMFwiIHdpZHRoPVwiMjBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPGcgZmlsbD1cIiM0YjZhOWJcIj5cbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgIGQ9XCJNMTAuODU4IDEuNTU4TDEuNy4xNjdBMS40NzcgMS40NzcgMCAwMC41MTcuNDkyIDEuNDkgMS40OSAwIDAwMCAxLjYwOHYxNy41NTljMCAuNDU4LjM3NS44MzMuODMzLjgzM2gyLjcwOXYtNC4zNzVjMC0uODA4LjY1LTEuNDU4IDEuNDU4LTEuNDU4aDIuMDgzYy44MDkgMCAxLjQ1OS42NSAxLjQ1OSAxLjQ1OFYyMGgzLjU0MVYzYTEuNDYgMS40NiAwIDAwLTEuMjI1LTEuNDQyek00LjU4MyAxMi4yOTJoLTEuMjVhLjYyNS42MjUgMCAwMTAtMS4yNWgxLjI1YS42MjUuNjI1IDAgMDEwIDEuMjV6bTAtMi41aC0xLjI1YS42MjUuNjI1IDAgMDEwLTEuMjVoMS4yNWEuNjI1LjYyNSAwIDAxMCAxLjI1em0wLTIuNWgtMS4yNWEuNjI1LjYyNSAwIDAxMC0xLjI1aDEuMjVhLjYyNS42MjUgMCAwMTAgMS4yNXptMC0yLjVoLTEuMjVhLjYyNS42MjUgMCAwMTAtMS4yNWgxLjI1YS42MjUuNjI1IDAgMDEwIDEuMjV6bTQuMTY3IDcuNUg3LjVhLjYyNS42MjUgMCAwMTAtMS4yNWgxLjI1YS42MjUuNjI1IDAgMDEwIDEuMjV6bTAtMi41SDcuNWEuNjI1LjYyNSAwIDAxMC0xLjI1aDEuMjVhLjYyNS42MjUgMCAwMTAgMS4yNXptMC0yLjVINy41YS42MjUuNjI1IDAgMDEwLTEuMjVoMS4yNWEuNjI1LjYyNSAwIDAxMCAxLjI1em0wLTIuNUg3LjVhLjYyNS42MjUgMCAwMTAtMS4yNWgxLjI1YS42MjUuNjI1IDAgMDEwIDEuMjV6TTE4Ljg1IDkuMDM1bC01LjkzMy0xLjI0MlYyMGg1LjYyNUExLjQ2IDEuNDYgMCAwMDIwIDE4LjU0MlYxMC40NmMwLS42ODgtLjQ3LTEuMjc0LTEuMTUtMS40MjV6TTE2Ljg3NSAxNy41aC0xLjI1YS42MjUuNjI1IDAgMDEwLTEuMjVoMS4yNWEuNjI1LjYyNSAwIDAxMCAxLjI1em0wLTIuNWgtMS4yNWEuNjI1LjYyNSAwIDAxMC0xLjI1aDEuMjVhLjYyNS42MjUgMCAwMTAgMS4yNXptMC0yLjVoLTEuMjVhLjYyNS42MjUgMCAwMTAtMS4yNWgxLjI1YS42MjUuNjI1IDAgMDEwIDEuMjV6XCIgLz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICAgPGEgaHJlZj1cIiR7ZGF0YS5jb21wYW55ID8gZGF0YS5jb21wYW55IDogYCNgfVwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwibWFpbl9fc29jaWFscy13ZWItaWRcIj5cbiAgICAgICAgJHtkYXRhLmNvbXBhbnkgPyBkYXRhLmNvbXBhbnkgOiBgTm90IEF2YWlsYWJsZWB9XG4gICAgICAgIDwvYT4gIFxuICAgICAgICBcbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmBcbiAgbWFpbi5jbGFzc0xpc3QuYWRkKCdtYWluLS12aXNpYmxlJylcbn1cbi8vIGNvbnN0IGRlYm91bmNlZEhhbmRsZUNoYW5nZSA9IGRlYm91bmNlKGhhbmRsZUNoYW5nZSwgNDAwKVxuXG5mdW5jdGlvbiBoYW5kbGVDaGFuZ2UoKSB7XG4gIG1haW4uY2xhc3NMaXN0LnJlbW92ZSgnbWFpbi0tdmlzaWJsZScpXG4gIGlmICghZXJyb3JNc2cuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWFyY2gtYm94LWVycm9yLS12aXNpYmxlJykpIHJldHVyblxuICBlcnJvck1zZy5jbGFzc0xpc3QucmVtb3ZlKCdzZWFyY2gtYm94LWVycm9yLS12aXNpYmxlJylcbn1cblxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KClcbiAgaGFuZGxlRGF0YUZldGNoKClcbn0pXG5cbmNvbG9yTW9kZS5mb3JFYWNoKGVsID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQ29sb3JNb2RlKSlcblxuaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZUNoYW5nZSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==