import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function saveTime(event) {
  localStorage.setItem('videoplayer-current-time', event.seconds);
}
const throttledPlayerEvent = throttle(saveTime, 1000);

let currentTime = JSON.parse(localStorage.getItem('videoplayer-current-time'));
player.on('timeupdate', throttledPlayerEvent);

player
  .setCurrentTime(
    JSON.parse(localStorage.getItem('videoplayer-current-time')) ?? 0
  )
  .catch(error => {
    console.log('error while parse time from localstorage:', error);
  });
