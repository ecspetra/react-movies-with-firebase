import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCdEwk5zrUqvL9z4d7-umzVyhfh6MYMSRA",
    authDomain: "movie-base-3f941.firebaseapp.com",
    projectId: "movie-base-3f941",
    storageBucket: "movie-base-3f941.appspot.com",
    messagingSenderId: "240355948",
    appId: "1:240355948:web:ca952cbd9fcd1fb08f6649"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;