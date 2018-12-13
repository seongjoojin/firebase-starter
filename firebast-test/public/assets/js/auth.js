// Initialize Firebase
var config = {
	apiKey: "<API_KEY>",
	authDomain: "<PROJECT_ID>.firebaseapp.com",
	databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
	projectId: "<PROJECT_ID>",
	storageBucket: "<BUCKET>.appspot.com",
	messagingSenderId: "<SENDER_ID>",
};
firebase.initializeApp(config);


$(document).ready(function($) {
  firebase.auth().onAuthStateChanged(function(user) {
    var cu = window.location.href
    var n1 = cu.indexOf("auth/login")
    // console.log(user, n1)
    if (user) {
      if (n1 > 1) {
        window.open("../../", "_self", false)
      } else {
      	console.log(user)
				$("#lblemail").text(user.email)
			}
    } else {
      if (n1 < 1) {
        window.open("./auth/login/", "_self", false)
      }
    }
  })
})

function logout() {
	firebase.auth().signOut().then(function () {
		}, function (error) { //DO-NOTHING
	});
}

function signup() {
	firebase.auth().createUserWithEmailAndPassword($("#txtemail").val(), $("#txtpassword").val()).then(function (user) {
	}).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		alert(error.message);
	})
}

function login() {
  firebase
    .auth()
    .signInWithEmailAndPassword($("#txtemail").val(), $("#txtpassword").val())
    .then(function(result) {
      console.log(result)
    })
    .catch(function(error) {
      // Handle Errors here.
      // console.log('err',error);
      const errorCode = error.code
      alert(errorCode)
    })
}

function facebooklogin() {
	var user = firebase.auth().currentUser;
	if (user) {
		//
	} else {

		var provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function (result) {
			// This gives you a Facebook Access Token.
			// var token = result.credential.accessToken;
			// The signed-in user info.
			// var user = result.user;
			console.log("facebook connected");
		}).catch(function (error) {
			console.log(error);
		});
	}
}

function googlelogin() {
	var user = firebase.auth().currentUser;

	if (user) { //
	} else {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/plus.login');
		firebase.auth().signInWithPopup(provider).then(function (result) {
			// This gives you a Google Access Token. You can use it to access the Google API. var token = result.credential.accessToken;
			var user = result.user;
			console.log("connected");
		}).catch(function (error) {
			console.log('error',error);
		});
	}
}
