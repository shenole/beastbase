//////////// INITIALIZE FIREBASE ////////////
var config = {
  apiKey: "AIzaSyBAxKjMZtJYfYvExZC3Kz-I7W-whTDfwQQ",
  authDomain: "beastbase-578d4.firebaseapp.com",
  databaseURL: "https://beastbase-578d4.firebaseio.com",
  projectId: "beastbase-578d4",
  storageBucket: "",
  messagingSenderId: "306152775383"
};

firebase.initializeApp(config);
var database = firebase.database();



//////////// INITIALIZE GOOGLEMAP ////////////
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: 'satellite',
    center: {lat: 20, lng: 0},
    zoom: 2
  });
}




//Reference messages collection
var messagesRef = database.ref('messages');

//Listen for form submit
document.querySelector('#entry-form').addEventListener('submit', submitForm);

//Submit form
function submitForm(e) {
  e.preventDefault();

  //Get values
  var animal = getInputVal('animal-name');
  var date = getInputVal('observation-date');
  var lat = getInputVal('latitude');
  var lng = getInputVal('longitude');
  var file = getInputVal('customFile');
  var notes = getInputVal('obs-notes');

  //Save message
  saveMessage(animal, date, lat, lng, file, notes);

  //Show alert
  document.querySelector('#submit-success').style.display = 'block';

  //Clear Form
  setTimeout(function() {
    document.querySelector('#entry-form').reset();
  }, 0001);

  //Hide alert after 3 secnds
  setTimeout(function() {
    document.querySelector('#submit-success').style.display = 'none';
  }, 3000);
}

//Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

//Save messages to firebase
function saveMessage(animal, date, lat, lng, file, notes) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    animal: animal,
    date: date,
    lat: lat,
    lng: lng,
    file: file,
    notes: notes
  });
}

/////////////////////////////////////
//Code to retrieve data
/////////////////////////////////////
function receiveUpdate(received) {
  var data = received.val();
  //document.getElementById('test').innerHTML = '';

  // Code for new entry elements
  var animalEntries = document.getElementById('animal-entries');

  // Create listing variables
  var newLi = document.createElement('li');
  var newLink = document.createElement('a');
  var newTable = document.createElement('table');
  var newTrOne = document.createElement('tr');
  var newThOne = document.createElement('th');
  var newThTwo = document.createElement('th');
  var newThThree = document.createElement('th');
  var newTrTwo = document.createElement('tr');
  var newTdOne = document.createElement('td');
  var newTdTwo = document.createElement('td');
  var newTdThree = document.createElement('td');

  for(var key in data) {
    var subject = data[key];

    // Create listing elements
    animalEntries.appendChild(newLi);
    newLi.appendChild(newLink);
    newLink.appendChild(newTable);
    newTable.appendChild(newTrOne);
    newTrOne.appendChild(newThOne);
    newTrOne.appendChild(newThTwo);
    newTrOne.appendChild(newThThree);
    newTable.appendChild(newTrTwo);
    newTrTwo.appendChild(newTdOne);
    newTrTwo.appendChild(newTdTwo);
    newTrTwo.appendChild(newTdThree);

    // Insuring new listing elements are empty
    newThOne.innerHTML = '';
    newThTwo.innerHTML = '';
    newThThree.innerHTML = '';

    newTdOne.innerHTML = '';
    newTdTwo.innerHTML = '';
    newTdThree.innerHTML = '';

    // Listing elemnts are populated
    var hFourOne = '<h4>' + 'Rec#: ' + '</h4>';
    var hFourTwo = '<h4>' + 'Animal: ' + '</h4>';
    var hFourThree = '<h4>' + 'DofO: ' + '</h4>';

    newThOne.innerHTML += hFourOne;
    newThTwo.innerHTML += hFourTwo;
    newThThree.innerHTML += hFourThree;

    // Record number is calculated
    var recNo = Object.keys(data);

    newTdOne.innerHTML += recNo.length;
    newTdTwo.innerHTML += subject.animal;
    newTdThree.innerHTML += subject.date;
  }
}

messagesRef.on('value', receiveUpdate);
