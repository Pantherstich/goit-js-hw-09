import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const
  refs = {
    days: document.querySelector('[data-days]'),
     hours: document.querySelector('[data-hours]'),
     minutes: document.querySelector('[data-minutes]'),
     seconds: document.querySelector('[data-seconds]'),
     startButton: document.querySelector('button[data-start]'),
     datetimePicker: document.querySelector('#datetime-picker'),
  }
refs.startButton.disabled = true;
refs.startButton.addEventListener('click', clickStart);
let period = null;

function clickStart() {
  refs.startButton.disabled = true;
  refs.datetimePicker.disabled = true;

timer = setInterval(() => {
  convertPeriod = convertMs(period);
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



function dateSelection(selectedDate) {
    setDate = selectedDate.getTime();
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
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
