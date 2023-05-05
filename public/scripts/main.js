const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search-results');
const dropdowns = document.querySelectorAll(".like-list-item-dropdown");
const devicesList = document.querySelectorAll(".like-list-item")

function handleDropdownOnLoad() {
    dropdowns.forEach((dropdown) => {
        if (dropdown.value === "false") {
            dropdown.classList.add('like-list-item-dropdown-green')
        } else {
            dropdown.classList.remove('like-list-item-dropdown-green')
        }
    });
}

dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("change", () => {
        console.log('dropdown.value:', dropdown.value);
        if (dropdown.value === "false") {
            dropdown.classList.add('like-list-item-dropdown-green')
        } else {
            dropdown.classList.remove('like-list-item-dropdown-green')
        }
    });
});

window.onload = handleDropdownOnLoad;

devicesList.forEach(item => {
    item.addEventListener('click', (e) => {
      const id = e.target.id;
      window.location.href = `/analytics/${id}`;
    });
  });

const showResults = () => {
    const searchValue = searchInput.value.trim();

    if (searchValue.length >= 2) {
        fetch(`/search?query=${searchValue}`)
            .then(response => response.json())
            .then(data => {
                searchResults.innerHTML = '';

                if (data.length > 0) {
                    const resultList = document.createElement('ul');
                    resultList.classList.add('search-results-list');
                    searchResults.classList.add('search-results-focus');
                    data.forEach(device => {
                        const resultItem = document.createElement('li');
                        resultItem.classList.add('search-results-item');
                        resultItem.textContent = device.name;

                        // Добавляем картинку справа от найденного элемента в зависимости от значения device.like
                        const icon = document.createElement('div');
                        icon.classList.add('search-results-icon');
                        icon.innerHTML = device.like ? `<svg width="20" height="19" 
                                viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" 
                                d="M10 18.35L8.55 17.03C3.4 12.36 0 9.28 0 5.5C0
                                2.42 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09
                                0.81 12.76 0 14.5 0C17.58 0 20 2.42 20 5.5C20
                                9.28 16.6 12.36 11.45 17.04L10 18.35Z" fill="#EE3F44"/>
                                </svg>` : `<svg width="20" height="19" viewBox="0 0 17 16"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.49999 15.7917L7.29166 14.6917C2.99999 
                                10.8 0.166656 8.23333 0.166656 5.08333C0.166656 
                                2.51667 2.18332 0.5 4.74999 0.5C6.19999 0.5 7.59166
                                1.175 8.49999 2.24167C9.40832 1.175 10.8 0.5 12.25
                                0.5C14.8167 0.5 16.8333 2.51667 16.8333 5.08333C16.8333
                                    8.23333 14 10.8 9.70832 14.7L8.49999 15.7917Z" fill="#818181"/>
                                </svg>`;

                        resultItem.appendChild(icon);

                        resultItem.addEventListener('click', () => {
                            console.log('Выбрано устройство:', device);
                            window.location.href = `/analytics/${device._id}`;
                        });
                        resultList.appendChild(resultItem);
                    });
                    searchResults.appendChild(resultList);
                }
            })
            .catch(error => console.error(error));
    } else {
        searchResults.innerHTML = '';
        searchResults.classList.remove('search-results-focus');
    }
}

searchInput.addEventListener('input', showResults);

searchInput.addEventListener('focus', showResults);

        // searchInput.addEventListener('blur', () => {
        //     searchResults.classList.remove('search-results-focus');
        //     searchResults.innerHTML = '';
        // });