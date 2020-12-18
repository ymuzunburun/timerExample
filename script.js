document.addEventListener("DOMContentLoaded", () => {
  let counter = 1;
  let lastStopTime = 0;
  let checkRun = false;
  let startTimeStamp;
  let timePassed;
  let startInterval;

  const timerId = () => {
    startButton.removeEventListener("click", timerId);
    startButton.addEventListener("click", timerStop);
    startTimeStamp = Date.now();
    startButton.innerHTML = "Stop";
    checkRun = true;
    startInterval = setInterval(timerStart, 1);
  };

  const timerStart = () => {
    let endTimeStamp = Date.now();
    timePassed = endTimeStamp - startTimeStamp + lastStopTime;
    const time = parseTime(timePassed);
    timerOutput.innerHTML = time;
  };

  const parseTime = (time) => {
    const ms = time % 1000;
    const ss = Math.floor((time / 1000) % 60);
    const mm = Math.floor((time / 60000) % 60);
    const hh = Math.floor((time / 3600000) % 24);
    const formatTimeOutput =
      ("0" + hh).slice(-2) +
      ":" +
      ("0" + mm).slice(-2) +
      ":" +
      ("0" + ss).slice(-2) +
      "." +
      ("00" + ms).slice(-3);
    return formatTimeOutput;
  };

  const timerStop = () => {
    clearInterval(startInterval);
    startButton.removeEventListener("click", timerStop);
    startButton.addEventListener("click", timerId);
    startButton.innerHTML = "Start";
    const parseOutputTime = timePassed - lastStopTime;
    const time = parseTime(parseOutputTime);
    const stopTime = document.createElement("div");
    stopTime.classList.add("timeStamp");
    stopTime.innerHTML = counter++ + " Stop: " + time;
    document.body.appendChild(stopTime);
    lastStopTime = timePassed;
    checkRun = false;
  };

  const timerSplit = () => {
    if (checkRun) {
      const parseOutputTime = timePassed - lastStopTime;
      const time = parseTime(parseOutputTime);
      const splitTime = document.createElement("div");
      splitTime.classList.add("timeStamp");
      splitTime.innerHTML = counter++ + " Split: " + time;
      document.body.appendChild(splitTime);
    }
  };

  const timerReset = () => {
    clearInterval(startInterval);
    startButton.removeEventListener("click", timerStop);
    startButton.addEventListener("click", timerId);
    let timeStampsToDelete = document.querySelectorAll(".timeStamp");
    for (let i = 0; i < timeStampsToDelete.length; i++) {
      document.body.removeChild(timeStampsToDelete[i]);
    }
    startButton.innerHTML = "Start";
    timerOutput.innerHTML = "00:00:00.000";
    timePassed = lastStopTime = 0;
    checkRun = false;
    counter = 1;
  };

  let timerOutput = document.createElement("div");
  document.body.appendChild(timerOutput);
  timerOutput.classList.add("wrapper");
  timerOutput.innerHTML = "00:00:00.000";

  const buttons = document.createElement("div");
  document.body.appendChild(buttons);
  buttons.classList.add("buttons");

  let startButton = document.createElement("button");
  startButton.innerHTML = "Start";
  buttons.appendChild(startButton);
  startButton.addEventListener("click", timerId);

  const splitButton = document.createElement("button");
  splitButton.innerHTML = "Split";
  buttons.appendChild(splitButton);
  splitButton.addEventListener("click", timerSplit);

  const resetButton = document.createElement("button");
  resetButton.innerHTML = "Reset";
  buttons.appendChild(resetButton);
  resetButton.addEventListener("click", timerReset);
});
