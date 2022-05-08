// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

require('flatpickr/dist/themes/dark.css');

//////////////////////////////// TODO

//////////////////////////////////TODO

/*

Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr. Именно в нём стоит обрабатывать дату выбранную пользователем. Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент.

1.Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".


*/
const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysField: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  mins: document.querySelector('span[data-minutes]'),
  secs: document.querySelector('span[data-seconds]'),
};
let inputValue = '';
refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick(event) {
  // inputValue = event.value;
  console.dir(refs.inputDate.value);
  console.log(event.currentTarget);
}

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  disableMobile: 'true',
  defaultDate: ' ',
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr('#datetime-picker', options);
// console.log(fp.now());
console.dir(fp.config.onClose);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
  addLeadingZero;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
