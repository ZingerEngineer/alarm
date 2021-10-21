flatpickr("#date-picker", {
  dateFormat: "Y-m-d",
});

const clockifyNumber = (number) => {
  if (number < 10) {
    return "0" + number;
  } else {
    return String(number);
  }
};

const audio = new Audio("https://firebasestorage.googleapis.com/v0/b/alarm-timify.appspot.com/o/buzzer.wav?alt=media&token=cffedfad-6f55-4ef0-96c0-0f2ba885dffb");
let currentDate = new Date();
let year = clockifyNumber(currentDate.getFullYear());
let month = clockifyNumber(currentDate.getMonth() + 1);
let day = clockifyNumber(currentDate.getDate());
let currentDateHour = clockifyNumber(formatConversion(currentDate.getHours()));
let currentDateMinutes = clockifyNumber(currentDate.getMinutes());

let date = document.querySelector("#date-picker");
let hours = document.querySelector(".slot-hours");
let minutes = document.querySelector(".slot-minutes");
let timeOfDay = document.querySelector(".slot-day-time");
let alarmsBlock = document.querySelector(".alarms");
let alarms = document.querySelector(".alarms");
let alarmsArray = JSON.parse(localStorage.getItem("alarmsArray")) || [];
alarmsRender(alarmsArray);
const buttonCreate = document.querySelector(".button-create");
const hoursArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const minutesArray = [];

function createAlarmCard() {
  //select box get value.
  let alarmHourValue = hours.value;
  let alarmMinutesValue = minutes.value;
  let alarmDayTimeValue = timeOfDay.value;
  //clockify value numbers.
  const newAlarm = {
    hours: clockifyNumber(alarmHourValue),
    minutes: clockifyNumber(alarmMinutesValue),
    dayTimeValue: alarmDayTimeValue,
    date: date.value,
    id: makeid(),
    isActive: true,
  };

  const isExist = alarmsArray.find(
    (item) =>
      item.hours === newAlarm.hours &&
      item.minutes === newAlarm.minutes &&
      item.dayTimeValue === newAlarm.dayTimeValue &&
      item.date === newAlarm.date
  );

  if (!isExist) {
    alarmsArray.unshift(newAlarm);
  }

  alarmsRender(alarmsArray);
}

for (let i = 1; i < 60; i++) {
  minutesArray.push(i);
}

for (let i = 1; i < 13; i++) {
  var option = document.createElement("option");
  const text = clockifyNumber(i);
  option.text = text;
  option.value = i;
  hours.appendChild(option);
} //hour select box fill in.
for (let i = 0; i < 60; i++) {
  var option = document.createElement("option");
  const text = clockifyNumber(i);
  option.text = text;
  option.value = i;
  minutes.appendChild(option);
} //minute select box fill in.

function formatConversion(hours, dayTimeValue) {
  const usedHours = Number(hours)
  if (dayTimeValue == "PM" && usedHours < 12) {
    return usedHours + 12;
  }

  if (dayTimeValue == "AM" && usedHours == 12) {
    return usedHours - 12;
  }
}

function makeid() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 9; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function alarmsRender(alarmsArray) {
  alarms.innerHTML = "";
  for (let index = 0; index < alarmsArray.length; index++) {
    const alarm = alarmsArray[index];
    let alarmCard = document.createElement("DIV");
    let cardButtons = document.createElement("DIV");
    let buttonDelete = document.createElement("BUTTON");
    let buttonTurnOnOf = document.createElement("BUTTON");
    let iconCross = document.createElement("I");
    let iconCheck = document.createElement("I");
    let clockSet = document.createElement("DIV");
    let alarmNumbers = document.createElement("DIV");
    let dateDiv = document.createElement("DIV");
    alarmCard.className = "alarm-card";
    cardButtons.className = "card-buttons";
    buttonDelete.className = "button-delete";
    buttonTurnOnOf.value = "not-checked";
    buttonTurnOnOf.className = "turn-on-of";
    iconCross.className = "fas fa-times-circle";
    iconCheck.className = "fas fa-check-circle";
    clockSet.className = "clock-set";
    alarmNumbers.className = "alarm-numbers";
    dateDiv.className = "date";
    clockSet.innerHTML =
      alarm.hours + ":" + alarm.minutes + "&nbsp" + alarm.dayTimeValue;
    dateDiv.innerHTML = alarm.date;
    buttonDelete.appendChild(iconCross);
    buttonTurnOnOf.appendChild(iconCheck);
    cardButtons.appendChild(buttonDelete);
    cardButtons.appendChild(buttonTurnOnOf);
    alarmCard.appendChild(cardButtons);
    alarmCard.appendChild(clockSet);
    alarms.appendChild(alarmCard);
    clockSet.appendChild(alarmNumbers);
    clockSet.appendChild(dateDiv);

    if (alarm.isActive === true) {
      buttonTurnOnOf.style.color = "rgb(162, 0, 255)";
    } else {
      buttonTurnOnOf.style.removeProperty("color");
    }

    buttonDelete.addEventListener("click", () => {
      const foundIndex = alarmsArray.findIndex((item) => item.id === alarm.id);
      alarmsArray.splice(foundIndex, 1);
      alarmsRender(alarmsArray);
    });

    buttonTurnOnOf.addEventListener("click", () => {
      const foundIndex = alarmsArray.findIndex((item) => item.id === alarm.id);
      alarmsArray[foundIndex].isActive = !alarmsArray[foundIndex].isActive;
      alarmsRender(alarmsArray);
      alarmAudio();
    });
  }

  localStorage.setItem("alarmsArray", JSON.stringify(alarmsArray));
}

buttonCreate.addEventListener("click", createAlarmCard);

function findAlarm() {

  return alarmsArray.find(
    (item) => {
      console.log({
        item,
        expectedHours: clockifyNumber(formatConversion(item.hours, item.dayTimeValue)),
        currentDateHour,
        expectedDate: year + "-" + month + "-" + day,
        currentDateMinutes
      })
      return item.isActive === true &&
      item.date === year + "-" + month + "-" + day &&
      clockifyNumber(formatConversion(item.hours, item.dayTimeValue)) == currentDateHour &&
      item.minutes === currentDateMinutes
    }
      
  );
}

function alarmAudio(alarm) {
  if (alarm) {
    audio.play();
  }
}

setInterval(() => {
  currentDate = new Date();
  year = clockifyNumber(currentDate.getFullYear());
  month = clockifyNumber(currentDate.getMonth() + 1);
  day = clockifyNumber(currentDate.getDate());
  currentDateHour = clockifyNumber(currentDate.getHours());
  currentDateMinutes = clockifyNumber(currentDate.getMinutes());
  const alarm = findAlarm();
  alarmAudio(alarm);
}, 10000);
