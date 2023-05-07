const deviceLike = document.querySelector(".analytics-header-like");
const dropdown = document.querySelector(".analytics-header-select")

console.log("dropdown", dropdown)

function handleDropdownOnLoad() {
        if (dropdown.value === "false") {
            dropdown.classList.add('analytics-header-select-green')
        } else {
            dropdown.classList.remove('analytics-header-select-green')
        }
}

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


window.onload = handleDropdownOnLoad;

deviceLike.addEventListener('click', (e) => {
    const id = e.target.id;
    fetch('/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
})
