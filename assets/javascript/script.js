//Declaring variables
var currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
var currentHour = moment().format('h a');
var currentDateEl = document.createElement("p");
var dateElSelector = document.querySelector(".lead");
var workHours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
var saveButtonEl = document.querySelector('#saveCalendar');
//load these defaults so page doesnt jitter when loading
currentDateEl.innerHTML = currentDate;
dateElSelector.appendChild(currentDateEl);

//loads any data from the local storage into the value of the Calendar input
function loadToCalendar() {
    for (var i = 0; i < 9; i++) {
        var loadRowSelector;
        loadCalEvent = localStorage.getItem("Activity " + workHours[i] + "AM");
        if (loadCalEvent) {
            loadRowSelector = document.getElementById('Cal' + workHours[i]).value = localStorage.getItem("Activity " + workHours[i] + "AM");
            console.log("This is a load test")
        } else {
            loadCalEvent = localStorage.getItem("Activity " + workHours[i] + "PM");
            loadRowSelector = document.getElementById('Cal' + workHours[i]).value = localStorage.getItem("Activity " + workHours[i] + "PM");
        }
        //console.log(localStorage.getItem("Activity 9AM"));
        console.log(i)
    }
}

//Update the input forms color
var currentTimeUpdater = setInterval(function () {
    //Declare current time into the currentDate variable
    var rowSelector;

    currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    currentHour = moment().format('h a');

    for (var i = 0; i < 9; i++) {
        //console.log(currentHour);
        if (currentHour == workHours[i] + " am" || currentHour == workHours[i] + " pm") {
            rowSelector = document.getElementById("Cal" + workHours[i]).style.backgroundColor = "#ff6961";
            i++;
            for (i; i < 9; i++) {
                rowSelector = document.getElementById("Cal" + workHours[i]).style.backgroundColor = "#77dd77";
            }
        } else {
            rowSelector = document.getElementById("Cal" + workHours[i]).style.backgroundColor = "#d3d3d3";
        }
    }
    //update the DOM
    currentDateEl.innerHTML = currentDate;
    dateElSelector.appendChild(currentDateEl);
}, 1000);

//Writes data from the Calendar input to the local storage
function saveLocalData(event) {
    event.preventDefault();
    var activityInput = event.target.querySelector('.col-10').value;
    var timeInput = event.target.querySelector('p').innerHTML;

    localStorage.setItem("Time " + timeInput, timeInput)
    localStorage.setItem("Activity " + timeInput, activityInput)

    //console.log("Save Button pressed " + event.target.value);
    //console.log(event.target.querySelector('.col-10').value)
    //console.log(event.target.querySelector('p').innerHTML);
}

//console.log(saveButtonEl);
$(document).on('submit', saveButtonEl, saveLocalData);
loadToCalendar();