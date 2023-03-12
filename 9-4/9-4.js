const input1 = document.querySelector('.inp-1');
const input2 = document.querySelector('.inp-2');
const submit = document.querySelector('.button-submit');
const visibleResult = document.querySelector('.j-result');
const img = document.querySelector('.j-result');

submit.addEventListener('click', () => {
    let widthValue = input1.value;
    let heightValue = input2.value;
    let myPromise = new Promise((resolve, reject) => {
        if (widthValue >= 100 && widthValue <= 300 && isNaN(widthValue) === false && heightValue >= 100 && heightValue <= 300 && isNaN(heightValue) === false) {
            resolve(console.log('success'))
        } else {
            reject(console.log('error'))
        }
    })

    myPromise
        .then(() => {
            fetch(`https://picsum.photos/${widthValue}/${heightValue}`)
                .then((respone) => {
                    const result = respone;
                    return result
                })
                .then((data) => {
                    img.innerHTML = `<img src="${data.url}" alt=""></img>`
                })
                .catch(() => {
                    console.log('something went wrong')
                })
        })
        .catch(() => {
            const divEr = document.querySelector(".error");
            const error = `<div class="error_number"><p>одно из чисел вне диапазона от 100 до 300</p></div>`
            divEr.innerHTML = error;
            setTimeout(deleteError, 2000);
        })
})

function deleteError() {
    const divErrorInput = document.querySelector(".error");
    divErrorInput.innerHTML = " ";
}

document.addEventListener('keydown', (e) => {
    if (e.code === "Enter") {
        submit.click();
    }
})