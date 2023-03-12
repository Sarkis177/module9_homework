const inputPage = document.querySelector('.inp-1');
const inputLimit = document.querySelector('.inp-2');
const btn = document.querySelector('.button-submit');
const visibleRes = document.querySelector('.j-result');

btn.addEventListener('click', () => {
    const input1 = inputPage.value;
    const input2 = inputLimit.value;
    const divEr = document.querySelector(".error");
    const error = `<div class="error_number"><p>Номер страницы вне диапазона от 1 до 10</p></div>`

    if ((isNaN(input1) || input1 < 1 || input1 > 10) && (isNaN(input2) || input2 < 1 || input2 > 10)) {
        divEr.innerHTML = error;
        setTimeout(deleteError, 2000);
        return;
    }

    if (isNaN(input1) || input1 < 1 || input1 > 10) {
        divEr.innerHTML = error;
        setTimeout(deleteError, 2000);
        return;
    }

    if (isNaN(input2) || input2 < 1 || input2 > 10) {
        const error = `<div class="error_number"><p>Лимит вне диапазона от 1 до 10</p></div>`
        divEr.innerHTML = error;
        setTimeout(deleteError, 2000);
        return;
    }

    function deleteError() {
        const divErrorInput = document.querySelector(".error");
        divErrorInput.innerHTML = " ";
    }

    const url = `https://picsum.photos/v2/list?page=${input1}&limit=${input2}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('hw9t5', JSON.stringify(data));
            const savedData = JSON.parse(localStorage.getItem('hw9t5'));
            let urlImg = "";
            savedData.forEach((element) => {
                urlImg += `<div><img class="result" src="${element.download_url}"></div>`;
            });
            visibleRes.innerHTML = urlImg;
        })
        .catch(error => {
            console.log(error);
        });

    const count = localStorage.length;
    console.log('ls length is ', count)
});