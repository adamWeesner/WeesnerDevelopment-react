var firebase = require("firebase/app")
require("firebase/auth")
require("firebase/firestore")

const config = {
    apiKey: "AIzaSyCFZHXhzqW9puTVc_FhaD2wJRvgbvYO2Xk",
    authDomain: "taxation-650c9.firebaseapp.com",
    databaseURL: "https://taxation-650c9.firebaseio.com",
    projectId: "taxation-650c9",
    storageBucket: "taxation-650c9.appspot.com",
    messagingSenderId: "373098846858",
    appId: "1:373098846858:web:c0c20cbb5ccf717f7fab73"
}

firebase.initializeApp(config)

export const db = firebase.firestore() 