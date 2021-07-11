import firebase from "firebase";

let firebaseConfig = {
  apiKey: "AIzaSyAyyTDaOpHlLqma2_b-jdbwx4ucUAjxt3s",
  authDomain: "to-do-app-reactjs.firebaseapp.com",
  projectId: "to-do-app-reactjs",
  storageBucket: "to-do-app-reactjs.appspot.com",
  messagingSenderId: "724482723090",
  appId: "1:724482723090:web:086475d105bfffe89677cb"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
export let firebaseAuth = firebaseApp.auth();

