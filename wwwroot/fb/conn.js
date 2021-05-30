var firebaseConfig = {
    apiKey: "AIzaSyDkHR3J8gg7ER7rUSm73nJgGN1vIKDdJLI",
    authDomain: "assign-gamble-web-cloud.firebaseapp.com",
    projectId: "assign-gamble-web-cloud",
    storageBucket: "assign-gamble-web-cloud.appspot.com",
    databaseURL: "https://assign-gamble-web-cloud-default-rtdb.firebaseio.com/",
    messagingSenderId: "285912167841",
    appId: "1:285912167841:web:9f0713758fae33b672c7e0",
    measurementId: "G-274ERT67VV"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();
