import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const secondsInterface = document.querySelector('[data-seconds]');
const minutesInterface = document.querySelector('[data-minutes]');
const hoursInterface = document.querySelector('[data-hours]');
const daysInterface = document.querySelector('[data-days]');
startBtn.disabled = true;

let selectedUserDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedUserDate = selectedDates[0];
    if (options.defaultDate > selectedUserDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      startBtn.disabled = false;
      
      
    }
  },
};

flatpickr('#datetime-picker', options);

//  if (options.defaultDate > options.onClose.selectedDates){
//     console.log("Please choose a date in the future");
// }
function updateTimer() {
    
    const currentTime = new Date();
    const timeDiff = selectedUserDate - currentTime;
    const timeRemaining = convertMs(timeDiff);
    secondsInterface.textContent = `${addLeadingZero(timeRemaining.seconds)}`;
    minutesInterface.textContent = `${addLeadingZero(timeRemaining.minutes)}`;
    hoursInterface.textContent = `${addLeadingZero(timeRemaining.hours)}`;
    daysInterface.textContent = `${addLeadingZero(timeRemaining.days)}`;
    
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }


  startBtn.addEventListener("click", () => {
    setInterval(updateTimer, 1000);
  });




// console.log(selectedDates[0]);
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



    
