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
let database = firebase.database();

//////////// INITIALIZE GOOGLEMAP ////////////
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: 'satellite',
    center: {lat: 20, lng: 0},
    zoom: 2
  });
}



//Reference messages collection
let messagesRef = database.ref('messages');

//Listen for form submit
document.querySelector('#entry-form').addEventListener('submit', submitForm);

//Submit form
function submitForm(e) {
  e.preventDefault();

  //Get values
  let animal = getInputVal('animal-name');
  let date = getInputVal('observation-date');
  let lng = getInputVal('longitude');
  let lat = getInputVal('latitude');
  let file = getInputVal('customFile');
  let notes = getInputVal('obs-notes');

  //Save message
  saveMessage(animal, date, lng, lat, file, notes);

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
function saveMessage(animal, date, lng, lat, file, notes) {
  let newMessageRef = messagesRef.push();
  newMessageRef.set({
    animal: animal,
    date: date,
    lng: lng,
    lat: lat,
    file: file,
    notes: notes
  });

/*
//Code to add a marker to the google map display
  var Latlng = new google.maps.LatLng(latitude.value,longitude.value);
    var marker = new google.maps.Marker({
    position: Latlng,
    map: map
  });
*/



//Code to receive data from firebase
function receiveUpdate(newMessageRef) {
  let data = newMessageRef.val();
  document.querySelector('#test').innerHTML = '';
  for(var key in data) {
    let subject = data[key];
    document.querySelector('#test').innerHTML += data.animal;
  }
  //document.querySelector('#test').innerHTML = '';
  //document.querySelector('#test').innerHTML = data.animal;
}



messagesRef.on('value', receiveUpdate);

/*
  console.log(snapshot.val());
}, function (errorObject) {
  alert("The submission failed: " + errorObject.code);
});
*/

/*
//New Entry List Object Created
let AnimalListItem = function(animal, date, lng, lat, file, notes) {
  this.animal = animal;
  this.date = date;
  this.lng = lng;
  this.lat = lat;
  this.file = file;
  this.notes = notes;


ListElement = function() {
  //Entry List is populated
  let newLi = document.createElement('li');
  let newTable = document.createElement('table');
  let newTrOne = document.createElement('tr');
  let newTrTwo = document.createElement('tr');
  let newThOne = document.createElement('th');
  let newThTwo = document.createElement('th');
  let newThThree = document.createElement('th');
  let newH4One = document.createElement('h4');
  let newH4Two = document.createElement('h4');
  let newH4Three = document.createElement('h4');
  let newTdOne = document.createElement('td');
  let newTdTwo = document.createElement('td');
  let newTdThree = document.createElement('td');

  //Entry List is populated........... Table is generated
  document.getElementById('animal-entries').appendChild(newLi);
  newLi.appendChild(newTable).appendChild(newTrOne).appendChild(newThOne).appendChild(newH4One);
  newTrOne.appendChild(newThTwo).appendChild(newH4Two);
  newTrOne.appendChild(newThThree).appendChild(newH4Three);

  //Entry List is populated........... Row headings are generated
  newH4One.innerHTML = 'Rec#:';
  newH4Two.innerHTML = 'Animal:';
  newH4Three.innerHTML = 'DofO:';

  newTable.appendChild(newTrTwo);
  newTrTwo.appendChild(newTdOne);
  newTrTwo.appendChild(newTdTwo);
  newTrTwo.appendChild(newTdThree);

  newTdTwo.innerHTML = animal;
  newTdThree.innerHTML = date;

};
*/
  //Entry Display is populated */

}
