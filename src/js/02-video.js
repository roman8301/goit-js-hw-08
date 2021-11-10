import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const storageKey = 'videoplayer-current-time';

function timePlayer() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem(storageKey, seconds);
    })
    .catch(function (error) {
      console.log(error);
    });
}

player.on('timeupdate', throttle(timePlayer, 1000));
const currentTime = localStorage.getItem(storageKey);

player.setCurrentTime(currentTime).catch(function (error) {
  console.log(error);
});
