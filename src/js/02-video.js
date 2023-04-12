import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
// import Vimeo from '../../node_modules/@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const savePlayTime = data => {
  const currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
};
const timeUpdate = player.on('timeupdate', savePlayTime);
const saveTimeEverySecond = throttle(timeUpdate(data), 1000);

window.onload = function () {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
};
