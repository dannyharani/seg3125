let params = new URLSearchParams(document.location.search);
let expertParam = params.get("expert");
let packageParam = params.get("package");

let selectedPackage, selectedExpert, numberOfPeople, totalCost;

/* Expert booking section */
if (expertParam != null)
{
    if (expertParam == "beatrix")
    {
        selectBeatrix();
    }
    if (expertParam == "ruby")
    {
        selectRuby();
    }
    if (expertParam == "casper")
    {
        selectCasper();
    }
}

function selectBeatrix()
{
    if (!document.getElementById("beatrix-text").classList.contains("expert-name-unavail")) {
        document.getElementById("beatrix-text").classList.add("expert-name-selected");
        document.getElementById("ruby-text").classList.remove("expert-name-selected");
        document.getElementById("casper-text").classList.remove("expert-name-selected");

        selectedExpert = "beatrix";
        updateConfirm();
    }
}

function selectRuby()
{
    if (!document.getElementById("ruby-text").classList.contains("expert-name-unavail")) {
        document.getElementById("beatrix-text").classList.remove("expert-name-selected");
        document.getElementById("ruby-text").classList.add("expert-name-selected");
        document.getElementById("casper-text").classList.remove("expert-name-selected");
    
        selectedExpert = "ruby";
        updateConfirm();
    }
}

function selectCasper()
{
    if (!document.getElementById("casper-text").classList.contains("expert-name-unavail")) {
        document.getElementById("beatrix-text").classList.remove("expert-name-selected");
        document.getElementById("ruby-text").classList.remove("expert-name-selected");
        document.getElementById("casper-text").classList.add("expert-name-selected");

        selectedExpert = "casper";
        updateConfirm();
    }
}

/* Package booking section */
const selectBtnBasic = document.getElementById("btn-select-basic");
const selectBtnEssential = document.getElementById("btn-select-essential");
const selectBtnComplete = document.getElementById("btn-select-complete");

if (packageParam != null)
{
    if (packageParam == "basic") {
        selectBasic();
    }
    if (packageParam == "essential") {
        selectEssential();
    }
    if (packageParam == "complete") {
        selectComplete();
    }
}

function selectBasic() {
    selectBtnBasic.classList.add("btn-package-selected");
    selectBtnEssential.classList.remove("btn-package-selected");
    selectBtnComplete.classList.remove("btn-package-selected");

    selectedPackage = "basic";
    updateConfirm();
}

function selectEssential() {
    selectBtnBasic.classList.remove("btn-package-selected");
    selectBtnEssential.classList.add("btn-package-selected");
    selectBtnComplete.classList.remove("btn-package-selected");

    selectedPackage = "essential";
    updateConfirm();
}

function selectComplete() {
    selectBtnBasic.classList.remove("btn-package-selected");
    selectBtnEssential.classList.remove("btn-package-selected");
    selectBtnComplete.classList.add("btn-package-selected");

    selectedPackage = "complete";
    updateConfirm();
}

// Number of bookings

function peopleMore()
{
    if (numberOfPeople < 5)
    {
        document.getElementById("people-select-prev").classList.remove("arrow-btn-unavail");

        numberOfPeople++;
        document.getElementById("peopleCount").innerHTML = numberOfPeople;
        if (numberOfPeople == 5)
        {
            document.getElementById("people-select-next").classList.add("arrow-btn-unavail");
        }

    }
}

function peopleLess()
{
    if (numberOfPeople > 1)
    {
        document.getElementById("people-select-next").classList.remove("arrow-btn-unavail");

        numberOfPeople--;
        document.getElementById("peopleCount").innerHTML = numberOfPeople;
        if (numberOfPeople == 1)
        {
            document.getElementById("people-select-prev").classList.add("arrow-btn-unavail");
        }
    }
}

/* Bottom Form section and Confirmations */
var firstName, lastName, email, tel;

const firstNameField = document.getElementById("first-name-field");
const lastNameField = document.getElementById("last-name-field");
const emailField = document.getElementById("email-field");
const telField = document.getElementById("tel-field");

function firstNameFunc() {
  firstName = firstNameField.value;
  firstNameConfirm();
}

function firstNameConfirm() {
    if (firstName == null || !firstName.match(/^[a-zA-Z\-]+$/))
    {
        firstNameField.classList.add("error");
        return false;
    }
    else
    {
        firstNameField.classList.remove("error");
        return true;
    }
}

function lastNameFunc() {
  lastName = lastNameField.value;
  lastNameConfirm();
}

function lastNameConfirm() {
    if (lastName == null || !lastName.match(/^[a-zA-Z\-]+$/))
    {
        lastNameField.classList.add("error");
        return false;
    }
    else
    {
        lastNameField.classList.remove("error");
        return true;
    }
}

function emailFunc() {
  email = emailField.value;
  emailConfirm();
}

function emailConfirm() {
    if (email == null || !email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/))
    {
        emailField.classList.add("error");
        return false;
    }
    else
    {
        emailField.classList.remove("error");
        return true;
    }
}

function telFunc() {
  tel = telField.value;
  telConfirm();
}

function telConfirm() {
    if (tel == null || !tel.match(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/))
    {
        telField.classList.add("error");
        return false;
    }
    else
    {
        telField.classList.remove("error");
        return true;
    }
}

function confirmAll() {
    // for visual update
    firstNameConfirm();
    lastNameConfirm();
    emailConfirm();
    telConfirm();
    dateConfirm();
    // for visual update

    let isOkay = true;

    if (!firstNameConfirm()) {
        isOkay = false;
    }
    if (!lastNameConfirm()) {
        isOkay = false;
    }
    if (!emailConfirm()) {
        isOkay = false;
    }
    if (!telConfirm()) {
        isOkay = false;
    }
    if (!dateConfirm()) {
        isOkay = false;
    }
    if (selectedPackage == undefined) {
        document.getElementById("package-picker").classList.add("error");
        isOkay = false;
    } else {
        document.getElementById("package-picker").classList.remove("error");
    }
    if (selectedExpert == undefined) {
        document.getElementById("expert-picker-holder").classList.add("error");
        isOkay = false;
    } else {
        document.getElementById("expert-picker-holder").classList.remove("error");
    }

    return isOkay && selectedPackage != undefined && selectedExpert != undefined;
}

function setTotalCost()
{
    if (selectedPackage == "basic") {
        totalCost = 38 * numberOfPeople;
    } else if (selectedPackage == "essential") {
        totalCost = 58 * numberOfPeople;
    } else if (selectedPackage == "complete") {
        totalCost = 78 * numberOfPeople;
    }
}

function confirm() {
    if (!confirmAll())
    {
        return false;
    }

    setTotalCost();

    document.getElementById("confirmation-popup").classList.toggle("show");

    while (document.getElementById("confirmation-popup").firstChild) {
        document.getElementById("confirmation-popup").removeChild(document.getElementById("confirmation-popup").firstChild);
    }

    let h1Confirm = document.createElement("h1");
    h1Confirm.innerHTML = "Booking Made! Reference: " + Math.floor(Math.random()*100000);

    let h2Confirm = document.createElement("h2");
    h2Confirm.innerHTML = "Booking made for " + firstName + "'s appointment on " + months[month] + " " + day + ", with " + selectedExpert + " for the " + selectedPackage + " package. <br> Your total will be: $" + totalCost;

    let goHome = document.createElement("a");
    goHome.classList.add("btn");
    goHome.classList.add("btn-outline-secondary");
    goHome.classList.add("btn-lg");
    goHome.innerHTML = "go home";
    goHome.href = "./index.html";

    document.getElementById("confirmation-popup").appendChild(h1Confirm);
    document.getElementById("confirmation-popup").appendChild(h2Confirm);
    document.getElementById("confirmation-popup").appendChild(goHome);
}

function updateConfirm()
{
    if (confirmAll() && selectedPackage != undefined && selectedExpert != undefined) {
        setTotalCost();
        document.getElementById("confirmation-msg").innerHTML = "Confirm " + firstName + "'s appointment on " + months[month] + " " + day + ", with " + selectedExpert + " for the " + selectedPackage + " package.<br>Your total will be: $" + totalCost;
    }
    else {
        document.getElementById("confirmation-msg").innerHTML = "Please complete the form above";
    }
}

/* Date selection section */

let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
let daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
let validHours = ["9pm", "10pm", "12am", "1am", "2am", "3am"];
let date = new Date;

let hour = "9pm";
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let dayOfWeek = date.getDay();

let monthDiff = 0;

init();

function init()
{
    day++; // book for tmr earliest
    document.getElementById("day-of-week").innerHTML = daysOfWeek[dayOfWeek];
    document.getElementById("month").innerHTML = months[month];
    document.getElementById("date-of-month").innerHTML = day;
    document.getElementById("hour").innerHTML = validHours[0];
    numberOfPeople = 1;

    let hourDropDown = document.getElementById("hour-dropdown");
    validHours.forEach((validHour) => {
        let newHourItem = document.createElement("a");
        newHourItem.innerHTML = validHour;
        newHourItem.onclick = function(){selectHour(validHour)};
        hourDropDown.appendChild(newHourItem);
    });

    updateDayDropdown();
    updateConfirm();
}

function updateDayOfWeek ()
{
    let userDate = new Date(year, month, day);
    document.getElementById("day-of-week").innerHTML = daysOfWeek[userDate.getDay()];
}

function monthBack()
{
    month = (month-1);

    if (month < 0)
    {
        month = 11; // Can be changed with modulo opperation, did not seem to work with negatives
        year--; // looped back
    }

    document.getElementById("month").innerHTML = months[month];
    updateDayDropdown();
    updateDayOfWeek();
    monthDiff--;
    dateConfirm();
}

function monthForward()
{
    month = (month + 1)%12;
    document.getElementById("month").innerHTML = months[month];

    // looped
    if (month == 0)
    {
        year++;
    }

    updateDayDropdown();
    updateDayOfWeek();
    monthDiff++;
    dateConfirm();
}

function getDayCount()
{
    return new Date(year, month, 0).getDate();
}

function updateDayDropdown()
{
    let dayCount = getDayCount();
    let divDateDropdown = document.getElementById("date-dropdown");

    while (divDateDropdown.firstChild)
    {
        divDateDropdown.removeChild(divDateDropdown.firstChild);
    }

    for (let i = 1; i <= dayCount; i++)
    {
        let newDayItem = document.createElement("a");
        newDayItem.innerHTML = i;
        newDayItem.onclick = function(){selectDay(i)};
        divDateDropdown.appendChild(newDayItem);
    }
}

function toggleDayDropdown()
{
    document.getElementById("date-dropdown").classList.toggle("show");
}

function toggleHourDropdown()
{
    document.getElementById("hour-dropdown").classList.toggle("show");
}

function selectDay(selectedDay)
{
    day = selectedDay;
    document.getElementById("date-of-month").innerHTML = day;
    updateDayOfWeek();
}

function selectHour(selectedHour) {
    hour = selectedHour;
    document.getElementById("hour").innerHTML = selectedHour;
}

function dateConfirm() {
    let userDate = new Date(year, month, day);
    if (userDate >= date && Math.abs(monthDiff) <= 5) {
        if (document.getElementById("errorMsg"))
        {
            document.getElementById("date-subsection").classList.remove("error");
            document.getElementById("date-subsection").removeChild(document.getElementById("errorMsg"));
        }
        return true;
    }
    else {
        if (!document.getElementById("errorMsg"))
        {
            document.getElementById("date-subsection").classList.add("error");
            let errorMsg = document.createElement("h2");
            errorMsg.id = "errorMsg";
    
            if (date == userDate)
            {
                errorMsg.innerHTML = "Cannot book same day";
            }
            else if (monthDiff > 0)
            {
                errorMsg.innerHTML = "Select a date within 5 months";
            }
            else
            {
                errorMsg.innerHTML = "Select a date in the future";
            }
    
            document.getElementById("date-subsection").appendChild(errorMsg);
        }
        return false;
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdownBtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
    updateConfirm();
}