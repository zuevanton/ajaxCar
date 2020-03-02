document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const select = document.getElementById('cars'),
    output = document.getElementById('output');

  const getData = (url) => {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url); // './cars.json'
      request.setRequestHeader('Content-type', 'application/json');
      request.send();
      request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4) return;
        if (request.status === 200) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject('произошла ошибка');
        }
      });
    });
  };
  const outputData = (data) => {
    data.cars.forEach(item => {
      if (item.brand === select.value) {
        const {brand, model, price} = item;
        output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
      }
    });
  };
  select.addEventListener('change', () => {
    getData('./cars.json')
      .then(outputData)
      .catch(error => console.log(error));
  });
});