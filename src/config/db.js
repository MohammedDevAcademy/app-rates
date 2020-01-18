// libs
import Firebase from 'firebase'

/// init DB
const firebaseConfig = {
    apiKey: "AIzaSyCiXcsPJwjMzwVmCbRY6sPgnbZBuKTbubc",
    authDomain: "app-myrates.firebaseapp.com",
    databaseURL: "https://app-myrates.firebaseio.com",
    projectId: "app-myrates",
    storageBucket: "app-myrates.appspot.com",
    messagingSenderId: "1085857795436",
    appId: "1:1085857795436:web:ec15e8aadf77240cbf3749",
    measurementId: "G-SP9RMXQ0RJ"
};

/// init the app
let app = Firebase.initializeApp(firebaseConfig)
export const database = app.firestore()