
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCx_7Y55pW4Y7qZBpvtEzlfCQdZYWh3WGU",
  authDomain: "professional-freerider-fyp.firebaseapp.com",
  databaseURL: "https://professional-freerider-fyp.firebaseio.com",
  projectId: "professional-freerider-fyp",
  storageBucket: "professional-freerider-fyp.appspot.com",
  messagingSenderId: "670715693298",
  appId: "1:670715693298:web:9d89ef206f8fc50b7fe86b",
  measurementId: "G-TZJ6T2HHZ2"
};
const db =  firebase.initializeApp(config);;

  export default  db ;


  