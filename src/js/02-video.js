import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
// import Vimeo from '../../node_modules/@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const savePlayTime = data => {
  // console.log(data); // wypisanie danych do konsoli
  const currentTime = data.seconds; // current time of video playing
  localStorage.setItem('videoplayer-current-time', currentTime);
};

const throttledSaveTime = throttle(savePlayTime, 1000);

// player.on('timeupdate', savePlayTime); // zwykla aktualizacja czasu odtwarzania co wywoałenie eventu timeupdate
player.on('timeupdate', throttledSaveTime); // wywolanie metody throttledSaveTime co minimum 1 sekunda (1000ms) (throttle ogranicza nam wywołanie metody raz na x czasu)

window.onload = function () {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
};
