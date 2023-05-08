const deviceLike = document.querySelector(".analytics-header-like");
const dropdown = document.querySelector(".analytics-header-select")
const dateInputStart = document.querySelector(".device-calendar-firstdate");
const dateInputFinish = document.querySelector(".device-calendar-lastdate");
const deviceTable = document.querySelector(".device-table-overflow");
let deviceUsing = [];
let startDate = Date.now() - 1209600000
let finishDate = Date.now();

function formatDate(milliseconds) {
    const date = new Date(milliseconds);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function dateToTimestamp(dateStr) {
    return new Date(dateStr).getTime();
  }

function handleDropdownOnLoad() {
    if (dropdown.value === "false") {
        dropdown.classList.add('analytics-header-select-green')
    } else {
        dropdown.classList.remove('analytics-header-select-green')
    }
    dateInputStart.value = formatDate(startDate)
    dateInputFinish.value = formatDate(finishDate)
    fetch(`/device/${dropdown.id}`)
    .then((res) => res.json())
    .then((data) => {
        deviceUsing = data.using;
        console.log("deviceUsing", deviceUsing);
    })
    .catch(error => console.error(error));
}


deviceLike.addEventListener('click', (e) => {
    console.log('e.target.id', e.target.id)
    console.log('deviceLike.src', deviceLike.src)
    let newLikeValue;
    if (deviceLike.src == "http://localhost:3000/img/like.svg") {
        newLikeValue = false;
    } else newLikeValue = true;
    console.log("newLikeValue", newLikeValue)
    fetch(`/device/like/${e.target.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ like: newLikeValue })
    })
        .then(() => {
            deviceLike.src = `/img/${newLikeValue ? 'like' : 'dislike'}.svg`;
        })
        .catch(error => console.error(error));
});

dropdown.addEventListener("change", () => {
    console.log('dropdown.value:',);
    console.log('dropdown.id:', dropdown.id);
    let data = false;

    if (dropdown.value === "false") {
        dropdown.classList.add('analytics-header-select-green')
        data = JSON.stringify({ free: false })
    } else {
        data = JSON.stringify({ free: true })
        dropdown.classList.remove('analytics-header-select-green')
    }
    fetch(`/device/work/${dropdown.id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: data
    }).then(data => console.log(data))
        .catch(error => console.error(error));
});

const periodButtons = document.querySelectorAll('.device-calendar-period-btn');

periodButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        finishDate = Date.now();
        startDate = finishDate - button.value;
        dateInputStart.value = formatDate(startDate);
        dateInputFinish.value = formatDate(finishDate);
        // Удаляем класс у всех кнопок
        periodButtons.forEach(btn => btn.classList.remove('period-prime'));
        // Добавляем класс только к нажатой кнопке
        event.target.classList.add('period-prime');
        updateDisplayedInfo();
    });
});

function updateDisplayedInfo() {
    
    console.log(`Start date: ${formatDate(startDate)}`);
    console.log(`Finish date: ${formatDate(finishDate)}`);
}

dateInputStart.addEventListener('change', () => {
    startDate = dateToTimestamp(dateInputStart.value)
    periodButtons.forEach(btn => btn.classList.remove('period-prime'));
    updateDisplayedInfo();
})

dateInputFinish.addEventListener('change', () => {
    fainishDate = dateToTimestamp(dateInputFinish.value)
    periodButtons.forEach(btn => btn.classList.remove('period-prime'));
    updateDisplayedInfo();
})


window.onload = handleDropdownOnLoad;

