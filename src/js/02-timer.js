import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
addResetButton();


const
  refs = {
     days: document.querySelector('[data-days]'),
     hours: document.querySelector('[data-hours]'),
     minutes: document.querySelector('[data-minutes]'),
     seconds: document.querySelector('[data-seconds]'),
     datetimePicker: document.querySelector('#datetime-picker'),  
     startButton: document.querySelector('button[data-start]'),
     resetButton: document.querySelector('button[data-reset]')
  }

function addResetButton() {
  const startButton = document.querySelector("button[data-start]");
  const resetButton = document.createElement("button");
  resetButton.setAttribute("type", "button");
  resetButton.setAttribute("data-reset", "reset");
  resetButton.textContent = "Reset";
  startButton.parentNode.insertBefore(resetButton, startButton.nextSibling);
}

//'<button type="button" data-reset>Reset</button>');

refs.startButton.disabled = true;
refs.resetButton.disabled = true;

refs.startButton.addEventListener('click', clickStart);
refs.resetButton.addEventListener('click', clickReset);

let period = null;
let timer = null;

function clickStart() {
  refs.startButton.disabled = true;
  refs.datetimePicker.disabled = true;
  refs.resetButton.disabled = false;
  timer = setInterval(() => {
  let convertPeriod = convertMs(period);
  period -= 1000;
  refs.days.textContent = convertPeriod.days;
  refs.hours.textContent = convertPeriod.hours;
  refs.minutes.textContent = convertPeriod.minutes;
  refs.seconds.textContent = convertPeriod.seconds;
  if (period <= 0) {
      clearInterval(timer)
    }    
  }, 1000)
}


function clickReset()
{
  clearInterval(timer)
  refs.days.textContent = "00";
  refs.hours.textContent = "00";
  refs.minutes.textContent = "00";
  refs.seconds.textContent = "00";
  refs.startButton.disabled = false;
  refs.datetimePicker.disabled = false;
  refs.resetButton.disabled = true;
 };


function dateSelection(selectedDate) {
    const  setDate = selectedDate.getTime();
  if (selectedDate <= options.defaultDate.getTime()) {
    Notiflix.Notify.failure('Please choose a date in the future')
  } else {
      refs.startButton.disabled = false;
      period = setDate - options.defaultDate.getTime();
  }
}



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateSelection(selectedDates[0]);
  },
};
flatpickr(refs.datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = zeroAdding(Math.floor(ms / day));
  // Remaining hours
  const hours = zeroAdding(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = zeroAdding(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = zeroAdding(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
  function zeroAdding(v) {
    const paddedString = String(v)
    if (paddedString.length > 2) {
      return paddedString;
    } else {
      return paddedString.padStart(2, '0');
    }
}

const countdown = document.querySelector('.timer')
countdown.style.display = 'flex';
countdown.style.gap = '30px'
const fields = document.querySelectorAll('.field');
for (const field of fields) {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.fontWeight = 'bold';
  field.style.textAlign = 'center';
  
  const spans = document.querySelectorAll('.value');
  for (const span of spans) {
    span.style.fontSize = '24px';
  }
}