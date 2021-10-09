let hours = document.querySelector(".slot-hours");
let minutes = document.querySelector(".slot-minutes");
let timeOfDay = document.querySelector(".slot-day-time");
let alarmsBlock = document.querySelector(".alarms");
let alarms = document.querySelector(".alarms");
let alarmsArray = JSON.parse(localStorage.getItem("alarmsArray")) || [];
alarmsRender(alarmsArray)
const buttonCreate = document.querySelector(".button-create");
const clockifyNumber = (number) => {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
};
const hoursArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const minutesArray = [];
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
    alarmCard.className = "alarm-card";
    cardButtons.className = "card-buttons";
    buttonDelete.className = "button-delete";
    buttonTurnOnOf.className = "turn-on-of";
    iconCross.className = "fas fa-times-circle";
    iconCheck.className = "fas fa-check-circle";
    clockSet.className = "clock-set";
    clockSet.innerHTML = alarm.hours + ":" + alarm.minutes + alarm.dayTimeValue;
    buttonDelete.appendChild(iconCross);
    buttonTurnOnOf.appendChild(iconCheck);
    cardButtons.appendChild(buttonDelete);
    cardButtons.appendChild(buttonTurnOnOf);
    alarmCard.appendChild(cardButtons);
    alarmCard.appendChild(clockSet);
    alarms.appendChild(alarmCard);
    buttonDelete.addEventListener("click", () => {
      const foundIndex = alarmsArray.findIndex((item) => item.id === alarm.id);
      alarmsArray.splice(foundIndex, 1);
      alarmsRender(alarmsArray);
    });
    buttonTurnOnOf.addEventListener("click", () => {
      buttonTurnOnOf.style.color = "rgb(162, 0, 255)";
    });
  }

  localStorage.setItem("alarmsArray", JSON.stringify(alarmsArray))
  console.log(alarmsArray);
}

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
    id: makeid(),
  };

  const isExist = alarmsArray.find(
    (item) =>
      item.hours === newAlarm.hours &&
      item.minutes === newAlarm.minutes &&
      item.dayTimeValue === newAlarm.dayTimeValue
  );

  if (!isExist) {
    alarmsArray.unshift(newAlarm);
  }

  alarmsRender(alarmsArray);
}

buttonCreate.addEventListener("click", createAlarmCard);
