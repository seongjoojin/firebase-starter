function newpost() {
	var user = firebase.auth().currentUser; if (user) {
		var d = new Date();
		var newPostKey = firebase.database().ref().child("post/").push().key; firebase.database().ref("post/" + newPostKey)
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

function update() {
	var _key = $("#message").attr('key')
	var user = firebase.auth().currentUser;
	if (user) {
		var ref = firebase.database().ref('post/' + _key + "/");
		var udata = {
			contents: $("#message").val(), newvalue: ''
		};
		ref.update(udata);
	}
}