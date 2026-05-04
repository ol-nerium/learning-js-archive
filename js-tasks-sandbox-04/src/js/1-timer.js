import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.getElementById('datetime-picker');
const valuesArr = document.querySelectorAll('.value');
const button = document.querySelector('button');

const keyMap = ['days', 'hours', 'minutes', 'seconds'];
button.disabled = true;

// dateTimePicker.addEventListener('input', getInputTime);
let intervalId = 0;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function validateFutureTime(inputTime) {
  const currentTime = new Date();
  if (inputTime < currentTime.getTime()) {
    window.alert('Please choose a date in the future');
    return (button.disabled = true);
  }
  return (button.disabled = false);
}

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    button.addEventListener('click', markupUpdate);
    function markupUpdate() {
      console.log(intervalId);
      clearInterval(intervalId);
      button.removeEventListener('click', markupUpdate);
      intervalId = setInterval(() => {
        const diff = getTimeDifference(Date.now());
        if (diff <= 0) {
          clearInterval(intervalId);
          valuesArr.forEach(el => (el.textContent = 0));
          return;
        }
        const diffTimeObj = convertMs(getTimeDifference(Date.now()));
        valuesArr.forEach(element => {
          keyMap
            .filter(key => element.dataset[key] !== undefined)
            .forEach(key => (element.textContent = diffTimeObj[key]));
        });
      }, 1000);
      return intervalId;
    }

    validateFutureTime(selectedDates[0].getTime());
    // console.log(selectedDates[0]);

    function getTimeDifference(current) {
      return selectedDates[0].getTime() - current; // ms
    }
  },
});
