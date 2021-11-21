import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
const setSecondsToLs = ({ seconds }) => {
  localStorage.setItem(STORAGE_KEY, seconds);
  console.log(seconds);
};

function onTimePlayer() {
  const currentTime = localStorage.getItem(STORAGE_KEY);
  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
}

player.on('timeupdate', throttle(setSecondsToLs, 1000));

window.addEventListener('DOMContentLoaded', onTimePlayer);
