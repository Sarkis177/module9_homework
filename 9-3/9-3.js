function useRequest(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log('Статус ответа:' `${xhr.status}`)
        } else {
            let result = JSON.parse(xhr.response);
            console.log("Результат:", JSON.parse(xhr.response));
            if (cb) {
                cb(result);
            }
        }
    };
    xhr.onerror = function () {
        console.log("Ошибка! Статус ответа:", xhr.status);
    };
    xhr.send();
};

function error() {
    const divEr = document.querySelector(".error");
    const error = `<div class="error_number"><p>число вне диапазона от 1 до 10</p></div>`
    divEr.innerHTML = error;
    setTimeout(deleteError, 2000);
};

function deleteError() {
    const divErrorInput = document.querySelector(".error");
    divErrorInput.innerHTML = "";
}

const resultRequest = document.querySelector(".result");
let btn = document.querySelector(".btn");

function displayResult(apiData) {
    let cards = "";
    apiData.forEach((item, index, array) => {
        const cardBlock = `<div class="card">
        <img src="${item.download_url}" class="card-image"/>
        <p>${item.author}</p>
        </div>`;
        console.log(`${item.download_url}`)
        cards = cards + cardBlock;
    });
    console.log(cards)
    resultRequest.innerHTML = cards;
};

btn.addEventListener("click", () => {
    let value = `${document.querySelector('.input-text').value}`;
    if (value > 10 || value < 1) {
        error();
    } else {
        let valueUrl = `https://picsum.photos/v2/list?limit=${value}`
        console.log("Значение", valueUrl);
        useRequest(valueUrl, displayResult);
    }
}
);