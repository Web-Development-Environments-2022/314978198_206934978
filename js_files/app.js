var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
//TODO: Set the keys!!
let left_key = 37;
let up_key = 38;
let right_key = 39;
let down_key = 40;
let ballsNum = 70;
let monstersNum = 3;
let limitTime = 60;
let ball5color = "#FFFFCC";
let ball15color = "#CCFFE5";
let ball25color = "#CCE5FF";
let life = 5;
var users = [{username: 'k', password: 'k', firstname:'k', lastname: 'k', email: 'kk@gmail.com', birthdate: '01/01/1995'}];
let loggedInUser = null;


$(document).ready(function () {
	//Checks password
	$.validator.addMethod("validPassword", function (value) {
		return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value);
	});

	//Checks no numbers first and last name
	$.validator.addMethod("noNumbers", function(value){
		return /^[a-zA-Z]+$/.test(value);
	});

	//Checks if username ia already exists
	$.validator.addMethod("validUserName", function(value){
		let is_valid = users.some(e => e.username == value);
		if (is_valid == true){
			return false;
		}
		else{
			return true;
		}
	});

	$("#registration-section-form").validate({
		rules: {
			registerFormUserName: {
				required: true,
				validUserName: true
			},

			registerFormPassword: {
				required: true,
				validPassword: true,
				minlength: 6
			},

			registerFormConfirmPassword : {
				required: true,
				equalTo: "#registerFormPassword"
			},

			registerFormFirstName: {
				required: true,
				noNumbers: true
			},

			registerFormLastName: {
				required: true,
				noNumbers: true
			},

			registerFormEmail: {
				required: true,
				email: true
			},

			registerFormBirthDate: {
				required: true,
			}
		},

		messages: {
			registerFormUserName: {
				validUserName: "This username is already exists",
				required: "Please enter a username"
			},

			registerFormPassword: {
				minlength: "Password must be at least 6 characters long.",
				validPassword: "Password must contain at least one character and one number",
				required: "Please enter a password"
			},

			registerFormConfirmPassword: {
				equalTo: "Password and Confirm Password must match.",
				required: "Please enter a confirm password"
			},

			registerFormFirstName: {
				noNumbers: "Letters allowed only.",
				required: "Please enter a first name"
			},

			registerFormLastName: {
				noNumbers: "Letters allowed only.",
				required: "Please enter a last name"
			},

			registerFormEmail: {
				required: "Please enter an email"
			},

			registerFormBirthDate: {
				required: "Please choose your birth date"
			}
		},

		// submitHandler: function(){
		// 	registrationUser();
		// 	alert(users.length);
		// }
	});
});


$(document).ready(function() {
	$("#play-section").hide();
	$("#register-section").hide();
	$("#login-section").hide();
	$("#about").hide();
	$("#play-menu-btn").hide();
	$("#logout-menu-btn").hide();


	if (loggedInUser != null){
		// $("#welcome-section-loggedIn").hide();
		$("#welcome-section-notLoggedIn").hide();
		$("#preference-section").show();
	}
	else {
		// $("#welcome-section-loggedIn").hide();
		$("#welcome-section-notLoggedIn").show();
		$("#preference-section").hide();
	}


	$("#home-menu-btn").click(function(){
		window.clearInterval(interval);
		$("#welcome-section-notLoggedIn").show();
		$("#play-section").hide();
		$("#register-section").hide();
		$("#login-section").hide();
		$("#preference-section").hide();
	});

	$("#register-menu-btn").click(function(){
		window.clearInterval(interval);
		$("#welcome-section-notLoggedIn").hide();
		// $("#welcome-section-loggedIn").hide();
		$("#play-section").hide();
		$("#register-section").show();
		$("#login-section").hide();
		$("#preference-section").hide();
	});

	$("#login-menu-btn").click(function(){
		window.clearInterval(interval);
		$("#welcome-section-notLoggedIn").hide();
		// $("#welcome-section-loggedIn").hide();
		$("#play-section").hide();
		$("#register-section").hide();
		$("#login-section").show();
		$("#preference-section").hide();
	});

	$("#welcome-login-btn").click(function(){
		window.clearInterval(interval);
		$("#welcome-section-notLoggedIn").hide();
		// $("#welcome-section-loggedIn").hide();
		$("#play-section").hide();
		$("#register-section").hide();
		$("#login-section").show();
		$("#preference-section").hide();
	});

	$("#welcome-registration-btn").click(function(){
		window.clearInterval(interval);
		$("#welcome-section-notLoggedIn").hide();
		// $("#welcome-section-loggedIn").hide();
		$("#play-section").hide();
		$("#register-section").show();
		$("#login-section").hide();
		$("#preference-section").hide();
	});

	$("#welcome-play-btn").click(function(){
		window.clearInterval(interval);
		$("#welcome-section-notLoggedIn").hide();
		// $("#welcome-section-loggedIn").hide();
		$("#play-section").hide();
		$("#register-section").hide();
		$("#login-section").hide();
		$("#preference-section").show();
	});
	// context = canvas.getContext("2d");
	// Start();
});

function registrationUser(){
	const un = document.getElementById("registerFormUserName").value;
	const pass = document.getElementById("registerFormPassword").value;
	const fn = document.getElementById("registerFormFirstName").value;
	const ln = document.getElementById("registerFormLastName").value;
	const em = document.getElementById("registerFormEmail").value;
	const bD = document.getElementById("registerFormBirthDate").value;

	const newUser = {username: un, password: pass, firstname: fn, lastname: ln, email: em, birthdate: bD};

	users.push(newUser);

	alert('Registration completed successfully');

	let form = $("#registration-section-form");
	form[0].reset();

	$("#register-section").hide();
	$("#login-section").show();

	return false;
}

function logIn(){
	let userName = document.getElementById("loginFormUserName").value;
	let password = document.getElementById("loginFormPassword").value;

	let user = null;

	for (let i = 0; i < users.length; i++){
		if (users[i]['username'] == userName){
			user = users[i];
		}
	}

	if (user != null){
		if (user['password'] == password){
			loggedInUser = user;
			alert("Welcome " + userName + "!");
			setLogIn();
			let form = $("#login-section-form");
			form[0].reset();
			return false;
		}
		else{
			alert("Password is incorrect");
			return false;
		}
	}
	else {
		alert(userName + " is not a registered user, please register")

		let form = $("#login-section-form");
		form[0].reset();

		$("#register-section").show();
		$("#login-section").hide();

		return false;
	}
}

function setLogIn() {
	// $("#welcome-section-loggedIn").show();
	$("#preference-section").show();
	$("#welcome-section-notLoggedIn").hide();
	$("#play-section").hide();
	$("#register-section").hide();
	$("#login-section").hide();
	$("#play-menu-btn").show();
	$("#logout-menu-btn").show();
	$("#register-menu-btn").hide();
	$("#login-menu-btn").hide();
}

function logout(){
	loggedInUser = null;
	setLogOut();
}

function setLogOut(){
	// $("#welcome-section-loggedIn").hide();
	$("#welcome-section-notLoggedIn").show();
	$("#play-section").hide();
	$("#register-section").hide();
	$("#login-section").hide();
	$("#preference-section").hide();
	$("#play-menu-btn").hide();
	$("#logout-menu-btn").hide();
	$("#register-menu-btn").show();
	$("#login-menu-btn").show();
}

async function setKey(keyToSet){
	return new Promise((resolve) => {
		document.addEventListener("keydown", onKeyHandler);
		function onKeyHandler(e){
			document.removeEventListener("keydown", onKeyHandler);
			resolve();
			switch (keyToSet){
				case 'U':
					up_key = e.which;
					$("#key-up").text(e.key);
					break;

				case 'D':
					down_key = e.which;
					$("#key-down").text(e.key);
					break;

				case 'R':
					right_key = e.which;
					$("#key-right").text(e.key);
					break;

				case 'L':
					left_key = e.which;
					$("#key-left").text(e.key);
					break;
				default:
					break;
			}

		}
	});
}

function setUserPreferences(){
	ballsNum = parseInt($("#rangeBalls").val(), 10);
	monstersNum = parseInt($("#rangeMonsters").val(), 10);
	limitTime = parseInt($("#rangeTime").val(), 10);
	ball5color = $("#pref-5-pts").val();
	ball15color = $("#pref-15-pts").val();
	ball25color = $("#pref-25-pts").val();
	life = 5;

	$("#preferences-selected-balls").html("Number of balls: " + ballsNum);
	$("#preferences-selected-monsters").html("Number of monsters: " + monstersNum);
	$("#preferences-selected-time").html("Time limit: " + limitTime);
	$("#preferences-selected-username").html("User: " + loggedInUser["username"]);

	Start();

	$("#play-section").show();
	$("#preference-section").hide();

	return false;
}

function setRandomPreferences(){
	$("#pref-5-pts").val(getRandomColor());
	$("#pref-15-pts").val(getRandomColor());
	$("#pref-25-pts").val(getRandomColor());

	let newBallsValue = getRandomInt(50, 90);
	$("#rangeBalls").val(newBallsValue);

	let newMonstersValue = getRandomInt(1, 4);
	$("#rangeMonsters").val(newMonstersValue);

	let newTimeValue = getRandomInt(60, 100);
	$("#rangeTime").val(newTimeValue);

	return false;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

$(document).ready(function(){
	let canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

