import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const startButton = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('#datetime-picker')

startButton.disabled = true;
startButton.addEventListener('click', clickStart);
let period = null;
let dateSelectionInSec;

function clickStart() {
  startButton.disabled = true;
  let timeComponents = convertMs(period);
  let timeComponentsInMilliseconds = timeToMilliseconds(timeComponents);

  updateDate(timeComponents);
  interval = setInterval(() => {
    timeComponentsInMilliseconds -= 1000;
    const dateUpdate = convertMs(timeComponentsInMilliseconds);
    updateDate(dateUpdate);
    if (timeComponentsInMilliseconds <= 0) {
      clearInterval(interval)
    }

    
  }, 1000)
}
function dateSelection(selectedDate) {
  if (selectedDate <= options.defaultDate.getTime()) {
    Notiflix.Notify.failure('Please choose a date in the future')
  } else {
      startButton.disabled = false;
      period = selectedDate - options.defaultDate.getTime();
      console.log(period);
  }
}



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateSelection(selectedDates[0]);
    dateSelectionInSec = dateSelection.getTime();  
  },
};
flatpickr(datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
