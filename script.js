let hours = document.querySelector(".slot-hours")
let minutes = document.querySelector(".slot-minutes")
let timeOfDay = document.querySelector(".slot-day-time")
const buttonCreate = document.querySelector("button-create")
const hoursArray = [1,2,3,4,5,6,7,8,9,10,11,12]
const minutesArray = []
for (let i = 1 ;i < 60 ; i++) {
    minutesArray.push(i)
}

const clockifyNumber = (number) => {
    if (number < 10){
        return "0" + number
    } else {
        return number
    }
}

for (let i = 1; i < 13; i++){
    var option = document.createElement("option");
    const text = clockifyNumber(i);
    option.text = text;
    option.value = i;
    hours.appendChild(option);
}
for (let i = 0; i < 60; i++){
    var option = document.createElement("option");
    const text = clockifyNumber(i);
    option.text = text;
    option.value = i;
    minutes.appendChild(option);
}
buttonCreate.addEventListener("click", ()=>{

})
