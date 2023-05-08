const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search-results');
const dropdowns = document.querySelectorAll(".like-list-item-dropdown");
const devicesList = document.querySelectorAll(".like-list-item-touch")
const deviceNotification = document.querySelectorAll(".like-list-item-img2")
let blurTimeout;

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
        console.log('dropdown.value:',);
        console.log('dropdown.id:', dropdown.id);
        let data = false;

        if (dropdown.value === "false") {
            dropdown.classList.add('like-list-item-dropdown-green')
            data = JSON.stringify({ free: false })
        } else {
            data = JSON.stringify({ free: true })
            dropdown.classList.remove('like-list-item-dropdown-green')
        }
        fetch(`/device/work/${dropdown.id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: data
        }).then(data => console.log(data))
            .catch(error => console.error(error));
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
                        icon.innerHTML = device.like ? `<img src="/img/like.svg" 
                        alt="like" id=${device._id}>` : `<img src="/img/dislike.svg" 
                        alt="dislike" id=${device._id}>`;

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

searchInput.addEventListener('blur', () => {
    // Запускаем таймер на 100 мс перед выполнением действий при потере фокуса
    blurTimeout = setTimeout(() => {
        searchResults.classList.remove('search-results-focus');
        searchResults.innerHTML = '';
    }, 100);
});


deviceNotification.forEach((notification) => {

    notification.addEventListener('click', (e) => {
        console.log('e.target.id', e.target.id)
        console.log('notification.src', notification.src)
        let newnNtificationValue;
        if (notification.src == "http://localhost:3000/img/bell1.svg") {
            newnNtificationValue = 2;
        } else if (notification.src == "http://localhost:3000/img/bell2.svg") {
            newnNtificationValue = 3;
        } else if (notification.src == "http://localhost:3000/img/bell3.svg") {
            newnNtificationValue = 1;
        }
            console.log("newnNtificationValue", newnNtificationValue)
        fetch(`/device/notification/${e.target.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notification: newnNtificationValue })
        })
            .then(() => {
                notification.src = `/img/bell${newnNtificationValue}.svg`;
            })
            .catch(error => console.error(error));
    })
});
