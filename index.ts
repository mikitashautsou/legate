const log = (...anything) => {
  const logDiv = document.createElement('div');
  logDiv.innerText = anything.map((e) => JSON.stringify(e)).join(' ');
  document.getElementById('app').appendChild(logDiv);
};
