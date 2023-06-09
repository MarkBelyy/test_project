const deviceLike = document.querySelector(".analytics-header-like");
const dropdown = document.querySelector(".analytics-header-select")
const dateInputStart = document.querySelector(".device-calendar-firstdate");
const dateInputFinish = document.querySelector(".device-calendar-lastdate");
const deviceTable = document.querySelector(".device-table-overflow");
const saveBtn = document.querySelector(".device-save-btn");
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
            updateTable()
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
        updateTable();
    });
});

function updateTable() {
    while (deviceTable.firstChild) {
        deviceTable.removeChild(deviceTable.firstChild);
    }
    deviceUsing.forEach(item => {
        // console.log('item.start ', dateToTimestamp(item.start))
        if (dateToTimestamp(item.start) < finishDate && dateToTimestamp(item.start) > startDate) {
            const date = new Date(item.start);
            const formattedDate = new Intl.DateTimeFormat('ru-RU', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }).format(date);

            const row = document.createElement('div');
            row.classList.add('device-table-row');
            row.innerHTML = `
            <div class="device-table-row-item column1">
              <p class="device-table-startdate">${formattedDate}</p>
            </div>
            <div class="device-table-row-item column2">
              <p class="device-table-workstatus">В работе</p>
              <p class="device-table-worktype">${item.type ? item.type : ''}</p>
            </div>
            <div class="device-table-row-item column3">
              <div class="device-table-work-container">
                <p class="device-table-workcolumn-label work-label ">Номер колонки:</p>
                <p class="device-table-workcolumn">${item.works.column ? item.works.column : ''}</p>
              </div>
              <div class="device-table-work-container">
                <p class="device-table-worksample-label work-label">Образец:</p>
                <p class="device-table-worksample">${item.works.sample ? item.works.sample : ''}</p>
              </div>
              <div class="device-table-work-container">
                <p class="device-table-workmethod-label work-label">Метод:</p>
                <p class="device-table-workmethod">${item.works.method ? item.works.method : ''}</p>
              </div>
            </div>
            <div class="device-table-row-item  row-column4 column4">
            <div class="device-table-results-container>
                <p class="device-table-results">${item.results ? item.results : ''}</p>
              </div>
              <div class="device-table-svg-container">
                <svg class="device-table-svg" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.50001 9.50002L2.00001 6.00002L0.833344 7.16669L5.50001 11.8334L15.5 1.83335L14.3333 0.666687L5.50001 9.50002Z"
                    fill="#23B04A" />
                </svg>
              </div>
            </div>
            <div class="device-table-row-item">
              <p class="device-table-user">${item.user ? item.user : ''}</p>
            </div>
`
            deviceTable.appendChild(row);
        }
    })
}

saveBtn.addEventListener('click', () => {
    const tableContent = deviceTable.outerHTML;
    console.log(tableContent)
    html2pdf()
    .from(tableContent)
    .save()
});

dateInputStart.addEventListener('change', () => {
    startDate = dateToTimestamp(dateInputStart.value)
    periodButtons.forEach(btn => btn.classList.remove('period-prime'));
    updateTable();
})

dateInputFinish.addEventListener('change', () => {
    finishDate = dateToTimestamp(dateInputFinish.value)
    periodButtons.forEach(btn => btn.classList.remove('period-prime'));
    updateTable();
})


window.onload = handleDropdownOnLoad;

