"use strict";

// api link without location
const api =
  "https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=c3cdfa5da5270e01f1eb83a4d417a2cf&query=";
// format for date object
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};
let error;
// get elements from html page
const div = document.getElementById("result");
const submit = document.getElementById("submit");
const input = document.querySelector("input");
// create elements
const divIcon = document.createElement("div");
const divInfo = document.createElement("div");
const iconImage = document.createElement("img");
const loc = document.createElement("p");
const temp = document.createElement("p");
const feelsLike = document.createElement("p");
const wind = document.createElement("p");
const dateNow = document.createElement("p");
const timeNow = document.createElement("p");
divIcon.id = "icon";
divInfo.id = "info";
iconImage.id = "img";

// Execute a function when the user releases a enter key on the keyboard
input.addEventListener("keyup", e => {
  // Cancel the default action, if needed
  e.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (e.keyCode === 13) {
    // Trigger the button element with a click
    submit.click();
  }
});

// Execute a function when the user clicks on button
submit.addEventListener("click", () => {
  // clear result div after clicking on button or pressing enter in input field
  div.innerHTML = "";
  let city = document.getElementById("city").value;
  // check if input field value is empty
  if (city == "") {
    error = document.createElement("p");
    error.textContent = `You didn't enter anything, try again.`;
    div.appendChild(error);
    return;
  }
  // full api link with location
  let url = api + city;
  // fetch url
  fetch(url)
    .then(response => response.json())
    .then(data => {
      addInfo(data);
      appendElements();
    })
    .catch(err => {
      console.log(err);
      error = document.createElement("p");
      error.textContent = `Can't find ${city}, try again.`;
      div.appendChild(error);
    });
});

//
const addInfo = data => {
  // icon
  iconImage.src = "" + data.current.weather_icons[0];
  // temperature
  temp.innerHTML = `Temperature: ${Math.round(
    data.current.temperature
  )}<span id="celsius">&deg;</span>C.`;
  // feels like
  feelsLike.innerHTML = `Feels like: ${Math.round(
    data.current.feelslike
  )}<span id="celsius">&deg;</span>C.`;
  // location
  loc.textContent = `Location: ${data.location.country}, ${data.location.name}.`;
  // date and time
  let dateTime = data.location.localtime.split(" ");
  let date = new Date(dateTime[0]);
  let time = dateTime[1];
  dateNow.textContent = `Current date: ${date.toLocaleDateString(
    "en-US",
    options
  )}.`;
  timeNow.textContent = `Current time: ${time}.`;
  // wind speed
  wind.textContent = `Wind speed: ${data.current.wind_speed} km/h.`;
};

// append elements to document
const appendElements = () => {
  div.appendChild(divIcon);
  div.appendChild(divInfo);
  divIcon.appendChild(iconImage);
  divInfo.appendChild(loc);
  divInfo.appendChild(temp);
  divInfo.appendChild(feelsLike);
  divInfo.appendChild(wind);
  divInfo.appendChild(timeNow);
  divInfo.appendChild(dateNow);
}