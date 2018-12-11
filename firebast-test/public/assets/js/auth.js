var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  projectId: "<PROJECT_ID>",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>"
}
firebase.initializeApp(config)

$(document).ready(function($) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("log", user)
    } else {
      console.log("err", "not yet")
    }
  })
})

function login() {
  firebase
    .auth()
    .signInWithEmailAndPassword($("#txtemail").val(), $("#txtpassword").val())
    .then(function(result) {
      //DO-NOTHING
    })
    .catch(function(error) {
      // Handle Errors here.
      // console.log('err',error);
      var errorCode = error.code
      alert(errorCode)
    })
}
