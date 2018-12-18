const functions = require('firebase-functions');

var admin = require("firebase-admin");

var serviceAccount = require("./test.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://fir-tests-37be7.firebaseio.com"
});

var db = admin.database();
exports.touchPost =functions.https.onRequest((request, response) => {
	var ref = db.ref('post/');
	var upData = { check: 'Y' };
	ref.update(upData); response.send("Hello from Firebase!");
});
