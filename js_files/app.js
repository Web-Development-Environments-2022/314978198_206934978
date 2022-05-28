//bord: 0 -> empty cell, 1 -> 2-> pacman position, 3 -> monsters, 4 -> wall, 5 -> 5 points food, 15 -> 15 points food,
// 		25 -> 25 points food, 30 -> special coin,
var context;
var shape = new Object();
var board;
const rows = 20;
const cols = 18;
			 //[first monster, sec monster, third monster, fourth monster]
var monsters = [new Object(), new Object(), new Object(), new Object()];
var monstersStartPosition = [[1, 1], [1, 16], [18, 1], [18, 16]];
var monstersSteps = [0, 0, 0, 0];
var flagMonsterts = false;
var specialCoin = new Object();
var score = 0;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var previousChar = 5;
let left_key = 37;
let up_key = 38;
let right_key = 39;
let down_key = 40;
var directionPac = "Right";
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

	//Checks if username is already exists
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

$(document).ready(function () {

	//Checks if username exists
	$.validator.addMethod("existsUserName", function(value) {
		return users.some(e => e.username == value);
	});

	$("#login-section-form").validate({
		rules: {
			loginFormUserName: {
				required: true,
				existsUserName: true
			},

			loginFormPassword: {
				required: true,
			}
		},

		messages: {
			registerFormUserName: {
				existsUserName: "This username is not exists",
				required: "Please enter a username"
			},

			registerFormPassword: {
				required: "Please enter a password"
			}
		}
	});
});

$(document).ready(function() {
	$("#play-section").hide();
	$("#register-section").hide();
	$("#login-section").hide();
	$("#about").hide();
	$("#play-menu-btn").hide();
	$("#logout-menu-btn").hide();
	// $("#container_header_loggedin").hide();
	// $("#container_header").show();


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

$(document).ready(function() {
	const rangeBalls = document.getElementById('rangeBalls');
	const rangeValueBalls = document.getElementById('range-value-balls');
	const setValueBalls = () => {
		const newVal = Number((rangeBalls.value - rangeBalls.min) * 100 / (rangeBalls.max - rangeBalls.min));
		const newPosition = 10 - (newVal * 0.2);
		rangeValueBalls.innerHTML = `<span>${rangeBalls.value}</span>`;
		rangeValueBalls.style.left = `calc(${newVal}% + ${newPosition}%)`;
	};
	document.addEventListener("ContactLoaded", setValueBalls);
	rangeBalls.addEventListener('input', setValueBalls);


	const rangeTime = document.getElementById('rangeTime');
	const rangeValueTime = document.getElementById('range-value-time');
	const setValueTime = () => {
		const newVal = Number((rangeTime.value - rangeTime.min) * 100 / (rangeTime.max - rangeTime.min));
		const newPosition = 10 - (newVal * 0.2);
		rangeValueTime.innerHTML = `<span>${rangeTime.value}</span>`;
		rangeValueTime.style.left = `calc(${newVal}% + ${newPosition}%)`;
	};
	document.addEventListener("ContactLoaded", setValueTime);
	rangeTime.addEventListener('input', setValueTime);


	const rangeMonsters = document.getElementById('rangeMonsters');
	const rangeValueMonsters = document.getElementById('range-value-monsters');
	const setValueMonsters = () => {
		const newVal = Number((rangeMonsters.value - rangeMonsters.min) * 100 / (rangeMonsters.max - rangeMonsters.min));
		const newPosition = 10 - (newVal * 0.2);
		rangeValueMonsters.innerHTML = `<span>${rangeMonsters.value}</span>`;
		rangeValueMonsters.style.left = `calc(${newVal}% + ${newPosition}%)`;
	};
	document.addEventListener("ContactLoaded", setValueMonsters);
	rangeMonsters.addEventListener('input', setValueMonsters);

	setValueBalls();
	setValueTime();
	setValueMonsters();
});

$(document).ready(function(){
	let canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
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
	// $("#usernamep").value(loggedInUser.username);
	// $("#container_header_loggedin").show();
	// $("#container_header").hide();
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
	// $("#container_header_loggedin").hide();
	// $("#container_header").show();
	window.clearInterval(interval);
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
					console.log("up");
					break;

				case 'D':
					down_key = e.which;
					$("#key-down").text(e.key);
					console.log("down");
					break;

				case 'R':
					right_key = e.which;
					$("#key-right").text(e.key);
					console.log("right");
					break;

				case 'L':
					left_key = e.which;
					$("#key-left").text(e.key);
					console.log("left");
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


	$("#preferences-selected-key-left").text(String.fromCharCode(left_key));
	$("#preferences-selected-key-up").text(String.fromCharCode(up_key));
	$("#preferences-selected-key-right").text(String.fromCharCode(right_key));
	$("#preferences-selected-key-down").text(String.fromCharCode(down_key));


	$("#pref-game-5-pts").val(ball5color);
	$("#pref-game-15-pts").val(ball15color);
	$("#pref-game-25-pts").val(ball25color);
	$("#balls").val(ballsNum);
	$("#time").val(limitTime);
	$("#monsters").val(monstersNum);
	$("#userInput").val(loggedInUser.username);

	// context = canvas.getContext("2d");
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

function MonstertsReset(){
	for (let i = 0; i < monstersNum; i++){
		monsters[i].i = monstersStartPosition[i][0];
		monsters[i].j = monstersStartPosition[i][1];
	}
}

function MonstertsStart() {
	for ( let i = 0; i < monstersNum; i++){
		board[monstersStartPosition[i][0]][monstersStartPosition[i][1]] = 3;
	}
}

function Start() {
	board = [
	//   1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], //1
		[4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4], //2
		[4, 0, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0, 4], //3
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4], //4
		[4, 0, 4, 4, 4, 4, 0, 4, 4, 0, 4, 0, 4, 4, 4, 4, 0, 4], //5
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4], //6
		[4, 0, 4, 4, 4, 4, 0, 4, 4, 4, 0, 4, 0, 0, 0, 4, 0, 4], //7
		[4, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 4, 4, 4, 0, 0, 0, 4], //8
		[4, 4, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4], //9
		[4, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 4, 4, 4, 0, 0, 0, 4], //10
		[4, 0, 4, 4, 4, 0, 0, 0, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4], //11
		[4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], //12
		[4, 0, 4, 4, 4, 0, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4], //13
		[4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4], //14
		[4, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], //15
		[4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4], //16
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 4], //17
		[4, 0, 4, 4, 0, 4, 4, 0, 4, 0, 4, 4, 4, 0, 0, 0, 0, 4], //18
		[4, 3, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 3, 4], //19
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]  //20
	];

	MonstertsReset();
	MonstertsStart();

	score = 0;
	pac_color = "yellow";
	var cnt = rows * cols;
	var food_remain = 20;
	// var food_remain = ballsNum;
	// var pacman_remain = 1;
	start_time = new Date();


	// let counter = 0;
	// for (var i = 0; i < board.length; i++) {
	// 	for (var j = 0; j < board[0].length; j++) {
	// 		if ((board[i][j] == 4) || (board[i][j] == 3)){
	// 			continue;
	// 		}
	// 		var randomNum = Math.random();
	// 		if (randomNum <= (1.0 * food_remain) / cnt) {
	// 			const random_food = Math.random();
	// 			if (random_food <= 0.6){
	// 				board[i][j] = 5; //food of 5 points
	// 			}
	// 			else if ((random_food > 0.6) && (random_food <= 0.9)){
	// 				board[i][j] = 15; //food of 15 points
	// 			}
	// 			else {
	// 				board[i][j] = 25; //food of 25 points
	// 			}
	// 			food_remain--;
	// 		}
	// 		else {
	// 			board[i][j] = 0;
	// 		}
	// 		cnt--;
	// 	}
	// }

	while (food_remain > 0) {
		const random_food = Math.random();
		var emptyCell = findRandomEmptyCell(board);
		if (random_food <= 0.6){
			board[emptyCell[0]][emptyCell[1]] = 5; //food of 5 points
		}
		else if ((random_food > 0.6) && (random_food <= 0.9)){
			board[emptyCell[0]][emptyCell[1]] = 15; //food of 15 points
		}
		else {
			board[emptyCell[0]][emptyCell[1]] = 25; //food of 25 points
		}
		food_remain--;
	}

	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 2;
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];

	//Special Coin start position
	specialCoin.i = 9;
	specialCoin.j = 10;
	board[9][10] = 30;


	// var img = document.createElement("heart");
	// img.setAttribute("src", "media/images/heart.jpg");
	// img.setAttribute("width", "10px");
	// img.setAttribute("height", "10px");
	//
	// for (let i = 1; i <= life; i++){
	// 	document.getElementById("lifeInput").append(img);
	// 	// document.getElementById("lifeInput").append(`<img src="media/images/heart.jpg">`);
	// }

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
	if (keysDown[up_key]) {
		return 1;
	}
	if (keysDown[down_key]) {
		return 2;
	}
	if (keysDown[left_key]) {
		return 3;
	}
	if (keysDown[right_key]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width;//crlean boad
	$("#scoreInput").val(score);
	$("#timerInput").val(limitTime - time_elapsed);
	$("#lifeInput").val(life);

	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var center = new Object();
			center.x = i * 30 + 30;
			center.y = j * 30 + 30;

			let cell_width = parseInt($("#canvas").css("width"), 10);
			cell_width = Math.floor(cell_width/board.length);
			let cell_height = parseInt($("#canvas").css("height"), 10);
			cell_height = Math.floor(cell_height/board[0].length);

			if (board[i][j] == 2) {
				context.beginPath();
				//TODO:CHECK WHY NOT WORKING
				let pacman_gif = new Image();

				if (directionPac == "Right"){
					pacman_gif.src = "media/images/pacmanGifRight.jpg";
					context.drawImage(pacman_gif, center.x - 10, center.y - 10, 15, 15);
				}
				else if (directionPac == "Down"){
					pacman_gif.src = "media/images/pacmanGifDown.jpg";
					context.drawImage(pacman_gif, center.x - 10, center.y - 10, 15, 15);
					// console.log("here");
				}
				else if (directionPac == "Left"){
					pacman_gif.src = "media/images/pacmanGifLeft.jpg";
					context.drawImage(pacman_gif, center.x - 10, center.y - 10, 15, 15);
					// console.log("here");
				}
				else if (directionPac == "Up"){
					pacman_gif.src = "media/images/pacmanGifUp.jpg";
					context.drawImage(pacman_gif, center.x - 10, center.y - 10, 15, 15);
					// console.log("here");
				}
			}
			else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = ball5color; //color
				context.fill();
			}
			else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				context.fillStyle = ball15color; //color
				context.fill();
			}
			else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = ball25color; //color
				context.fill();
			}
			else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 30,30);
				context.fillStyle = "blue"; //color
				context.fill();
			}
			else if (board[i][j] == 3){
				let img = new Image();

				if ((i == monsters[0].i) && (j == monsters[0].j)){
					img.src = "media/images/yellowGhost.png";
					context.drawImage(img, center.x - 10, center.y - 10, 15, 15);
				}
				else if ((i == monsters[1].i) && (j == monsters[1].j)){
					img.src = "media/images/redGhost.jpg";
					context.drawImage(img, center.x - 10, center.y - 10, 15, 15);
				}
				else if ((i == monsters[2].i) && (j == monsters[2].j)){
					img.src = "media/images/blueGhost.png";
					context.drawImage(img, center.x - 10, center.y - 10, 15, 15);
				}
				else if ((i == monsters[3].i) && (j == monsters[3].j)){
					img.src = "media/images/blueGhost.png";
					context.drawImage(img, center.x - 10, center.y - 10, 15, 15);
				}
			}
			else if (board[i][j] == 30){
				let img = new Image();
				img.src = "media/images/specialCoin.jpg";
				context.drawImage(img, center.x - 10, center.y - 10, 15, 15);
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) { //Up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			console.log("Up");
			directionPac = "Up";
		}
	}
	if (x == 2) { //Down
		if (shape.j < cols && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			console.log("Down");
			directionPac = "Down";
		}
	}
	if (x == 3) { //Left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			console.log("Left");
			directionPac = "Left";
		}
	}
	if (x == 4) { //Right
		if (shape.i < rows && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			console.log("Right");
			directionPac = "Right";
		}
	}

	if (board[shape.i][shape.j] == 5) {
		score += 5;
	}else if (board[shape.i][shape.j] == 15) {
		score += 15;
	}else if (board[shape.i][shape.j] == 25) {
		score += 25;
	}

	if (board[shape.i][shape.j] == 3){
		ResetMonsterPosition();
	}
	else{
		board[shape.i][shape.j] = 2;
		if (flagMonsterts == false){
			UpdatePositionMonsters();
			flagMonsterts = true;
		}
		else {
			flagMonsterts = false;
		}
	}

	UpdatePositionSpecialCoin();

	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

	if (time_elapsed > limitTime){
		//audio
		window.clearInterval(interval);
		window.alert("Game completed"); //TODO:CHANGE TO WINNER OR LOSER
		Draw("Right");
	}

	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw("Right");
	}

	if (life == 0){
		//audio
		window.clearInterval(interval);
		window.alert("Game completed"); //TODO:CHANGE TO WINNER OR LOSER
		Draw("Right");
	}
	else {
		directionPac = "Right";
		Draw(directionPac);
	}
}

function BFS(start, end){
	var next = null;
	let visited = new Set();
	let dist = Array(rows).fill().map(() => Array(cols).fill(-1));
	let q = [];
	q.push(start);

	visited.add(start.toString());

	let moveR = [0, -1, 0, 1];
	let moveC = [-1, 0, 1, 0];

	while (q.length > 0){
		let curr = q.shift();
		let currR = curr[0];
		let currC = curr[1];

		for (let i = 0; i < 4; i++){
			let newR = currR + moveR[i];
			let newC = currC + moveC[i];

			if((!visited.has([newR, newC].toString())) && (newR > 0) && (newC > 0) && (newR < rows) && (newC < cols) && (board[newR][newC] != 4)){
				visited.add([newR, newC].toString());
				dist[newR][newC] = dist[currR][currC] + 1;
				q.push([newR, newC]);
			}
		}
	}

	if (dist[end[0]][end[1]] == -1){
		console.log("Path not exist");
	}
	else{
		let d = dist[end[0]][end[1]];
		next = [0, 0];
		let currR = end[0];
		let currC = end[1];

		for (let i = 0; i < 4; i++) {
			let newR = currR + moveR[i];
			let newC = currC + moveC[i];

			if ((dist[newR][newC] == d - 1) && ( board[newR][newC] != 4)){
				next[0] = newR;
				next[1] = newC;
				break;
			}
		}
	}
	return next;
}

function ResetMonsterPosition(){
	life--;

	let emptyCell = findRandomEmptyCell(board);

	board[shape.i][shape.j] = 0;
	//New position to Pacman
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	board[shape.i][shape.j] = 2;

	score -= 10;

	for (let i = 0; i < monstersNum; i++){
		if (monstersSteps[i] != 2){
			board[monsters[i].i][monsters[i].j] = monstersSteps[i];
		}
		else{
			board[monsters[i].i][monsters[i].j] = 0;
		}
	}

	MonstertsReset();

	for (let i = 0; i < monstersNum; i++){
		monstersSteps[i] = 0;
		board[monsters[i].i][monsters[i].j] = 3;
	}
}

function findMonster(i, j){
	for (let m = 0; m < monstersNum; m++){
		if (monsters[m].i == i && monsters[m].j == j)
			return monstersSteps[m];
	}
}

function UpdatePositionMonsters(){
	let pacmanEaten = false;

	for (let m = 0; m < monstersNum; m++){
		var next = BFS([shape.i, shape.j], [monsters[m].i, monsters[m].j]);
		board[monsters[m].i][monsters[m].j] = monstersSteps[m];
		// console.log(monstersSteps[m]);

		if (board[next[0]][next[1]] == 3){
			monstersSteps[m] = findMonster(next[0], next[1]);
		}
		else{
			monstersSteps[m] = board[next[0]][next[1]];
		}

		if (board[next[0]][next[1]] == 2){
			board[next[0]][next[1]] = 3;
			monsters[m].i = next[0];
			monsters[m].j = next[1];
			pacmanEaten = true;
			break;
		}

		board[next[0]][next[1]] = 3;
		monsters[m].i = next[0];
		monsters[m].j = next[1];
	}

	if (pacmanEaten){
		ResetMonsterPosition();
	}
}

function UpdatePositionSpecialCoin(){
	let destinationCells = [[1, 1], [1, 16], [18, 1], [18, 16]];
	let dest;
	let next = null;

	while (next == null){
		dest  = destinationCells[Math.floor(Math.random() * destinationCells.length)];
		next = BFS(dest, [specialCoin.i, specialCoin.j]);
	}

	board[specialCoin.i][specialCoin.j] = previousChar;
	if (board[next[0]][next[1]] != 3){
		previousChar = board[next[0]][next[1]];
	}
	else{
		previousChar = findMonster(next[0], next[1]);
		console.log(previousChar);
	}

	board[next[0]][next[1]] = 30;
	specialCoin.i = next[0];
	specialCoin.j = next[1];

}


