import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "iziToast/dist/css/iziToast.min.css";


const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");


startBtn.addEventListener("click", onStartBtnClick);

let userSelectedDate;
let intervalId;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        

        if (selectedDates[0].getTime() < Date.now()) {
            iziToast.error({
                
                message: 'Please choose a date in the future',
                position: "topRight"
            });
            
            startBtn.disabled = true;
        } else {
            userSelectedDate = selectedDates[0];
            startBtn.disabled = false;
        }
    },
};
  
const dataPicker = flatpickr(input, options);

function onStartBtnClick() {
    input.disabled = true;
    startBtn.disabled = true;
    intervalId = setInterval(() => {
        const diff = userSelectedDate.getTime() - Date.now();
        
        updateDisplayTime(diff);
        if (diff < 1000) {
            clearInterval(intervalId);
            input.disabled = false;
            iziToast.success({message: "Time is over", position: "topRight"});
            return;

        }
        
        

        

    }, 1000)
};

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
};

function updateDisplayTime(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
    
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
    
};

function addLeadingZero(value) {
    return String(value).padStart(2, 0)
};