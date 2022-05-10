// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

require('flatpickr/dist/themes/dark.css');


const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  mins: document.querySelector('span[data-minutes]'),
  secs: document.querySelector('span[data-seconds]'),
};


const isActive = true;
let userSelectedDate = Date.now();

refs.startBtn.disabled = isActive;
refs.startBtn.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    activeBtn(selectedDates[0]);
  },
};
const fp = flatpickr(refs.inputDate, options);

function activeBtn(date) {
  if (Date.now() > date) {
    Notify.failure('Please choose a date in the future');
  } else {
    Notify.success('The clock is ticking ...');
    refs.startBtn.disabled = !isActive;
    userSelectedDate = date;
  }
}

function onStartBtnClick(event) {
  refs.startBtn.disabled = isActive;
  fp.destroy();
  refs.inputDate.disabled = isActive;
  countTimer();
  console.log(countTimer);
}

function countTimer() {
 setInterval(() => {
    const convertedTime = convertMs(userSelectedDate - Date.now());
    updateTimerValues(convertedTime);
  }, 1000);
}

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

function updateTimerValues({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.mins.textContent = addLeadingZero(minutes);
  refs.secs.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
