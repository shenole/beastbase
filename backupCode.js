// Initialize Firebase
var config = {
  apiKey: "AIzaSyBAxKjMZtJYfYvExZC3Kz-I7W-whTDfwQQ",
  authDomain: "beastbase-578d4.firebaseapp.com",
  databaseURL: "https://beastbase-578d4.firebaseio.com",
  projectId: "beastbase-578d4",
  storageBucket: "",
  messagingSenderId: "306152775383"
};

firebase.initializeApp(config);
database = firebase.database();

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
  /////////////////////////////////////
  //Code to retrieve data
  /////////////////////////////////////
  function receiveUpdate(received) {
    var data = received.val();
    console.log(data);
    document.getElementById('test').innerHTML = '';
    for(var key in data) {
      var subject = data[key];
      var p = '<p>' + subject.animal + '' + subject.notes + '</p>';
      document.getElementById('test').innerHTML += p;
    }

  }

  messagesRef.on('value', receiveUpdate);
  */
