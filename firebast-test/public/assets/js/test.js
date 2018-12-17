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
				onLoadMain()
			}
		} else {
			if (n1 < 1) {
				window.open("./auth/login/", "_self", false)
			}
		}
	})
})

function onLoadMain() {
	var user = firebase.auth().currentUser;
	if (user) {
		var ref = firebase.database().ref("user/");
		ref.orderByChild('uid').equalTo(user.uid).limitToLast(1).once('value', function (data) {
			data.forEach(function (sdata) {
				$("#myimg").attr('src',sdata.val().img)
			})
		});
	}
}

function newpost() {
	var user = firebase.auth().currentUser;
	if (user) {
		var d = new Date();
		var newPostKey = firebase.database().ref().child("post/").push().key;
		firebase.database().ref("post/" + newPostKey)
				.set({
					uid: user.uid,
					createdAt: d.getTime(),
					reverseCreatedAt: -d.getTime(),
					contents: $("#message").val()
				})
				.then(function (result) {
					alert("Sucess")
				});
	}
}

function loadpost() {
	var user = firebase.auth().currentUser;
	if (user) {
		var ref = firebase.database().ref("post/");
		ref.orderByChild('uid').equalTo(user.uid).limitToLast(1).once('value', function (data) {
			data.forEach(function (sdata) {
				$("#message").val(sdata.val().contents)
				$("#message").attr('key',sdata.key)
			})
		});
	}
}

function uploadimage() {
	$("#fileinput").click();
}

$('#fileinput').on('change', function () { onLoadImage(this); });

function onLoadImage(input) {
	if (input.files && input.files[0]) {
		var items = input.files[0];
		var _size = items.size;
		var _itemsize = Math.round(items.size / 1024 / 1024);
		console.log(_size);
		if (_size > 5000000) {
			alert("Allowed file size exceeded. (Max. 5 MB), Current file size is [" + _itemsize + " MB]", 'error'); }
		else {
			var reader = new FileReader();
			reader.onload = function (e) {
				$('#myimg').attr('src',e.target.result);
				savestorage(items);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
	else { alert("Sorry - you're browser doesn't support the FileReader API"); }
}

function savestorage(items) {
	var user = firebase.auth().currentUser;
	if (user) {
		var storageRef = firebase.storage().ref();
		var _name = items.name.replace(/[~`!#$%\^&*+=\-\[\]\\';,/{}()|\\":<>\?]/g, "");
		var uploadTask = storageRef.child('data/' + user.uid + "/" + _name).put(items);
		uploadTask.on('state_changed', function (snapshot) {
		},
		function (error) {
			console.log(error);
		},
		function () {
			uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
				var newPostKey = firebase.database().ref().child("user/").push().key;
				firebase.database().ref("user/" + newPostKey)
						.set({
							uid: user.uid,
							img: downloadURL
						})
						.then(function (result) {
							alert("Sucess")
						});
			});
		});
	}
}

function update() {
	// var _key = $("#message").attr('key')
	// var user = firebase.auth().currentUser;
	// if (user) {
	// 	var ref = firebase.database().ref('post/' + _key + "/");
	// 	var udata = {
	// 		contents: $("#message").val(), newvalue: ''
	// 	};
	// 	ref.update(udata);
	// }
	var user = firebase.auth().currentUser;
	if (user) {
		var d = new Date();
		// var newPostKey = firebase.database().ref().child("post/").push().key;
		var _key = $("#message").attr('key')
		firebase.database().ref("post/" + _key)
				.set({
					uid: user.uid,
					createdAt: d.getTime(),
					reverseCreatedAt: -d.getTime(),
					contents: $("#message").val()
				})
				.then(function (result) {
					alert("Sucess")
				});
	}
}

function deletepost() {
	var user = firebase.auth().currentUser;
	if (user) {
		var _key = $("#message").attr('key')
		var ref = firebase.database().ref("post/" + _key + "/");
		ref.remove()
				.then(function () {
					alert('Success');
				})
				.catch(function (error) {
					console.log("Remove failed: " + error.message); });
	}
}