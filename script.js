'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 13);
      //*we can change the style of the map by using the different themes of open street map url in place of fr/hot
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (clickEvent) {
        const { lat, lng } = clickEvent.latlng;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 120,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            }).setContent('This is a workout ')
          )
          .openPopup();
      });
    },
    () => console.log('could not get your location')
  );
}
//* using google map api for map rendering
// let map;
// function initMap() {
//   navigator.geolocation.getCurrentPosition(position => {
//     ({ latitude, longitude } = position.coords);
//   });
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 7, lng: -7 },
//     zoom: 8,
//   });
// }
