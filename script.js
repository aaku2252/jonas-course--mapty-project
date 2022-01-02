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

let map, mapEvent;

class App {
  constructor() {}
  _getPositon() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this._loadMap, () =>
        console.log('could not get your location')
      );
    }
  }
  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    map = L.map('map').setView(coords, 13);
    //*we can change the style of the map by using the different themes of open street map url in place of fr/hot
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on('click', function (clickEvent) {
      mapEvent = clickEvent;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
  }
  _showForm() {}
  _toggleElevationField() {}
  _newWorkout() {}
}

const app = new App();
app._getPositon();

form.addEventListener('submit', event => {
  event.preventDefault();
  const { lat, lng } = mapEvent.latlng;
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

  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';
  inputDistance.focus();
});
inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
