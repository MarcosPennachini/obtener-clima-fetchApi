/* =========================
======== SELECTORES
==========================*/

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const spinner = document.querySelector('.spinner');

/* =========================
======== EVENTOS
==========================*/

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', buscarClima);
});

/* =========================
======== FUNCIONES
==========================*/

function buscarClima(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if ( Number(ciudad) || ciudad === '' || pais === ''){
        showError('Datos incorrectos');
    } else {
        console.log(ciudad, pais);
        consultarApi(ciudad, pais);
    }
}

function showError(message) {
    const alert = formulario.querySelector('.bg-red-300');
    if (!alert){
        formulario.insertAdjacentHTML('beforeend', `<div class="mt-5 px-4 py-3 leading-normal text-red-700 bg-red-300 rounded-lg" role="alert"><p class="font-bold">${message}</p></div>`);
        
        setTimeout(() => {
            formulario.querySelector('.bg-red-300').remove();
        }, 5000);
    } 
}

function consultarApi(ciudad, pais){
    const apiId = 'f8317df53ef8daed7ed841cc57c01065';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`;
    console.log(url);

    showSpinner();

    fetch(url)
        .then(response => response.json())
        .then(data => {
            clearHTML();
            if (data.cod === "404"){
                showError('Ciudad no encontrada');
            } else {
                console.log(data);
                showWeather(data);
            }
        })
}


function showWeather(data){
    const { main: {temp, temp_min, temp_max} } = data;
    const centigrados = Math.round(temp - 273.15);
    const centigradosMax = Math.round(temp_max - 273.15);
    const centigradosMin = Math.round(temp_min - 273.15);

    resultado.insertAdjacentHTML('beforeend', `<p class="font-bold font-mono text-6xl text-center text-white">${centigrados}&#8451</p>`);

    resultado.insertAdjacentHTML('beforeend', `<p class="font-mono text-lg text-center text-white">${centigradosMax}&#8451 max</p>`);

    resultado.insertAdjacentHTML('beforeend', `<p class="font-mono text-lg text-center text-white">${centigradosMin}&#8451 min</p>`);
}

function clearHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function showSpinner(){
    resultado.insertAdjacentHTML('beforeend', `<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>`)
}