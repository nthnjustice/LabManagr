function returnFormattedToSeconds(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.round(time - minutes * 60);

  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${minutes}:${seconds}`;
}

export {returnFormattedToSeconds};
