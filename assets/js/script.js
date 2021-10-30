// set variable for current day
var day = moment().format("dddd MMMM Do, YYYY");

// display the current day on "currentDay"
$("#currentDay").text(day);

// set variable for current time/hour
var currentHour = moment().format("H A");
console.log(currentHour);

// set variable for each hour of the work day
var workHours = [
    {time: "9 AM", todo: ""},
    {time: "10 AM", todo: ""},
    {time: "11 AM", todo: ""},
    {time: "12 PM", todo: ""},
    {time: "1 PM", todo: ""},
    {time: "2 PM", todo: ""},
    {time: "3 PM", todo: ""},
    {time: "4 PM", todo: ""},
    {time: "5 PM", todo: ""}
];

// load stored todos
var storedTodos = JSON.parse(localStorage.getItem("plannedTodos"));
if (storedTodos !== null) {
    workHours = storedTodos
};
// function to build rows for each time block
workHours.forEach(function(hourBlock, index) {
    var hourLabel = hourBlock.time;
    var todoColor = colorBlock(hourLabel);

    // make a row with different columns: time, todo, save button
    var slot = '<div class="timeSlot" id="' + 
    index + '><div class="row input-group"><div class="HourA row col-sm-2 col-md-2 col-lg-1 input-group-prepend justify-content-center pt-4">' + 
    hourLabel + '</div><textarea class="form-control ' +
    todoColor + '">' + 
    hourBlock.todo +
    '</textarea><button class="saveBtn row col-sm-2 col-md-2 col-lg-1 justify-content-center pt-4" type="submit">SAVE</button></div>';
    // append rows
    $(".container").append(slot);
})

// function to add color to todo blocks
function colorBlock(time) {
    var now = moment(currentHour, "H A");
    var hours = moment(time, "H A");
    // return different classes in based on time
    if (now.isBefore(hours) === true) {
        return "future";
    } else if (now.isAfter(hours) === true) {
        return "past";
    } else {
        return "present";
    }
}

// function to have save button save todos when clicked
$(".saveBtn").on("click", function(todo) {
    // Index the time slots
    var todoIndex = parseInt(
        $(this).closest(".timeSlot").attr("id")
    );
    
    // Identify user todo text's value
    var userText = $.trim($(this).siblings("textarea").val());
    // Plug the user todo into the workHours array
    workHours[todoIndex].todo = userText;
    // Store todos into local storage
    localStorage.setItem("plannedTodos", JSON.stringify(workHours));
})

