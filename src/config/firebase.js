import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";

firebase.initializeApp(FirebaseConfig);

var starCountRef = firebase.database().ref('movie1/');
starCountRef.on('value', function(snapshot) {
    console.log("snapshot.val()");
    snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        var id=childData.id;
        console.log(childData);
    });
});

const databaseRef = firebase.database().ref("/");
console.log("databaseRef");
console.log(databaseRef);
export const moviesRef = databaseRef; //.child("iduniquemovie0");
console.log("moviesRef");
console.log(moviesRef);