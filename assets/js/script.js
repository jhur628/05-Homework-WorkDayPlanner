// set variable for current day
var day = moment().format("dddd, MMMM Do, YYYY");
console.log(day);

// display the current day on "currentDay"
$("#currentDay").text(day);

// set variable for current time/hour
var currentHour = moment().format("H A");
console.log(currentHour);

// set variable for each hour of the work day
var workHours = [
    {time: "9 AM", event: ""},
    {time: "10 AM", event: ""},
    {time: "11 AM", event: ""},
    {time: "12 AM", event: ""},
    {time: "1 PM", event: ""},
    {time: "2 PM", event: ""},
    {time: "3 PM", event: ""},
    {time: "4 PM", event: ""},
    {time: "5 PM", event: ""}
]

workHours.forEach(function(hourBlock, index) {
    var hourLabel = hourBlock.time;
    var todoColor = colorBlock(hourLabel);

    var slot = '<div class="timeSlot" id="' + 
    index + '><div class="row input-group"><div class="HourA row col-sm-2 col-md-2 col-lg-1 input-group-prepend hour justify-content-center pt-4">' + 
    hourLabel + '</div><textarea class="todoArea  form-control ' +
    todoColor + '">' + 
    hourBlock.event +
    '</textarea><button class="saveBtn row col-sm-2 col-md-2 col-lg-1 justify-content-center pt-4" type="submit">SAVE</button></div>';
    $(".container").append(slot);
})

function colorBlock(time) {
    var now = moment(currentHour, "H A");
    var hours = moment(time, "H A");
    if (now.isBefore(hours) === true) {
        return "future";
    } else if (now.isAfter(hours) === true) {
        return "past";
    } else {
        return "present";
    }
}