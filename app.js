/*
    Construct in phases:
    Phase 1: Walk into  the position to start rotating
    Phase 2: Start rotation & count-down
    Phase 3: Follow-up walk & stop near the bowl + Bowl disappearing
    -> All three phases, we must be able to pause/resume animation
    -> In second phase count-down also pauses/starts in accordance with the cat movement
    -> In phase 1 & 3 the cat resumes the floating animation when paused
*/

/* --------------------------BUTTONS------------------------------------- */

// Speed-up/slow-down counter & cat movement

let animationSpeed = 1;

const speedUp = document.querySelector(".fast");
const slowDown = document.querySelector(".slow");
const normalSpeed = document.querySelector(".normal");

// ->
normalSpeed.addEventListener("click", () => {
	normalSpeed.querySelector(".speed").classList.add("clicked");
	speedUp.querySelector(".speed").classList.remove("clicked");
	slowDown.querySelector(".speed").classList.remove("clicked");
	// Animation speed
	animationSpeed = 1;
});
slowDown.addEventListener("click", () => {
	slowDown.querySelector(".speed").classList.add("clicked");
	normalSpeed.querySelector(".speed").classList.remove("clicked");
	speedUp.querySelector(".speed").classList.remove("clicked");
	// Animation speed
	animationSpeed = 2;
});
speedUp.addEventListener("click", () => {
	speedUp.querySelector(".speed").classList.add("clicked");
	slowDown.querySelector(".speed").classList.remove("clicked");
	normalSpeed.querySelector(".speed").classList.remove("clicked");
	// Animation speed
	animationSpeed = 0.5;
});

// Show message on hover
const message = document.querySelector(".message-container");

setTimeout(() => {
	normalSpeed.addEventListener("mouseover", () => {
		// Only show message when not paused
		if (clicked == false) {
			message.classList.remove("hide");
		}
	});
	normalSpeed.addEventListener("mouseout", () => {
		message.classList.add("hide");
	});
	slowDown.addEventListener("mouseover", () => {
		if (clicked == false) {
			message.classList.remove("hide");
		}
	});
	slowDown.addEventListener("mouseout", () => {
		message.classList.add("hide");
	});
	speedUp.addEventListener("mouseover", () => {
		if (clicked == false) {
			message.classList.remove("hide");
		}
	});
	speedUp.addEventListener("mouseout", () => {
		message.classList.add("hide");
	});
}, 1);

// Control buttons switch between and selection
// Select the buttons
startButton = document.querySelector(".start-btn");
pauseButton = document.querySelector(".pause-btn");
resumeButton = document.querySelector(".resume-btn");
tryAgainButton = document.querySelector(".try-again-btn");

// Toggle between the buttons

startButton.addEventListener("click", () => {
	startButton.classList.add("hide");
	pauseButton.classList.remove("hide");
});
pauseButton.addEventListener("click", () => {
	pauseButton.classList.add("hide");
	resumeButton.classList.remove("hide");
});
resumeButton.addEventListener("click", () => {
	resumeButton.classList.add("hide");
	pauseButton.classList.remove("hide");
});

// 'Try Again' button
tryAgainButton.addEventListener("click", () => {
	location.reload();
});
/* ---------------------------------------------------------------------- */

// Phase 1: walking animation

// Walking animation
let walking = false;
function isWalking() {
	walking = true;
	let c = cat.getBoundingClientRect().x;
	globalThis.walk = setInterval(() => {
		cat.style.left = c + "px";
		c++;
	}, 10 * animationSpeed);
}

// Pause walking animation
function pauseWalking() {
	clearInterval(walk);
	walking = false;
}

// Pause floating animation
function pauseFloating() {
	clearInterval(catFloat);
}

// Hooking it up with the buttons

startButton.addEventListener("click", () => {
	isWalking();
});
let clicked = false;
pauseButton.addEventListener("click", () => {
	clicked = true;
	if (rotatedOnce == 0) {
		pauseWalking();
	} else {
		pauseRotating();
	}
	if (counting == true) {
		pauseCounting();
	}
	if (secondWalk > 0) {
		pauseWalking();
	}
});

resumeButton.addEventListener("click", () => {
	clicked = false;
	if (rotatedOnce == 0 && walking == false) {
		isWalking();
	} else if (rotatedOnce > 0 && rotating == false && secondWalk == 0) {
		isRotating();
	}
	if (counting == false && rotatedOnce > 0) {
		isCounting();
	}
});

/* ---------------------------------------------------------------------- */

// Phase 2: rotation movement/ detect appropriate place to start animation

const SCREEN_CENTER_X = isCurrentPosition(
	document.querySelector(".container")
).x;
const SCREEN_CENTER_Y = isCurrentPosition(
	document.querySelector(".container")
).y;

// Stop walking animation when near by 50px of the center of screen

setInterval(() => {
	if (
		cat.getBoundingClientRect().x - countRect.getBoundingClientRect().x >= 75 &&
		secondWalk == 0
	) {
		pauseWalking();
		if (rotating == false && counting == false && clicked == false) {
			isRotating();
			isCounting();

			// clicked = true;
		}
	}
}, 100);

// Rotation animation
let rotatedOnce = 0;
let rotating = false;
let a = 0;

function isRotating() {
	pauseFloating();
	floating = false;
	rotating = true;
	rotatedOnce++;
	let x = countRect.getBoundingClientRect().x;
	let y = countRect.getBoundingClientRect().y - 50; // 50 is half of #count-down height
	let r = 150;
	globalThis.rotate = setInterval(() => {
		let px = x + r * Math.cos(a);
		let py = y + r * Math.sin(a);
		a = (a + Math.PI / 360) % (Math.PI * 2);
		cat.style.left = px + "px";
		cat.style.top = py + "px";
	}, 10 * animationSpeed);
}
// Pause rotation animation
function pauseRotating() {
	clearInterval(rotate);
	rotating = false;
}
// Function to know current position

function isCurrentPosition(element) {
	let left = element.getBoundingClientRect().left;
	let right = element.getBoundingClientRect().right;
	let top = element.getBoundingClientRect().top;
	let bottom = element.getBoundingClientRect().bottom;
	let CurrentPositionX = (left + right) / 2;
	let CurrentPositionY = (top + bottom) / 2;
	let isCurrentPosition = { x: CurrentPositionX, y: CurrentPositionY };
	return isCurrentPosition;
}
/* ---------------------------------------------------------------------- */

// Count-down

const numbers = document.querySelector(".numbers");
const countRect = document.querySelector("#count-down");
const arr = [
	"0px",
	"96px",
	"192px",
	"292px",
	"393px",
	"493px",
	"593px",
	"694px",
	"794px",
	"894px",
];

let counting = false;
let i = 10;

function isCounting() {
	counting = true;
	numbers.classList.remove("hide");
	// Start the count-down animation
	globalThis.count = setInterval(function countdown() {
		numbers.style.right = arr[i]; // Change the 'numbers' image position to show the appropriate number from the array
		i--;
	}, 1250 * animationSpeed);
}

// Function to pause counting-down

function pauseCounting() {
	clearInterval(count);
	counting = false;
}
/* ---------------------------------------------------------------------- */
// Getting out of the rotating animation
let secondWalk = 0;
setInterval(() => {
	if (
		i < 0 &&
		Math.abs(isCurrentPosition(cat).y - isCurrentPosition(bowl).y) < 10 &&
		isCurrentPosition(cat).x > countRect.getBoundingClientRect().x
	) {
		pauseCounting();
		pauseRotating();
		if (floating == false) {
			catFloating();
		}
		if (walking == false && clicked == false) {
			isWalking();
		}
		secondWalk++;
	}
}, 10);

// Stopping at the bowl; eating :D

let opacity = 1; // Opacity of the bowl

setInterval(() => {
	if (isCurrentPosition(bowl).x - isCurrentPosition(cat).x <= 60) {
		if (walking == true) {
			pauseWalking();
		}
		// Slowly make the bowl disappear

		setInterval(() => {
			bowl.style.opacity = opacity;
			opacity -= 0.1;
		}, 1000);

		// The end, show 'Try Again' button
		setTimeout(() => {
			resumeButton.classList.add("hide");
			pauseButton.classList.add("hide");
			tryAgainButton.classList.remove("hide");
		}, 2000);
	}
}, 10);

/* ---------------------------------------------------------------------- */
// General state: Bowl & cat floating

// Select bowl & cat
const cat = document.querySelector("#cat");
const bowl = document.querySelector("#bowl");
let position = countRect.getBoundingClientRect().y - 50;
let floating = false;
function catFloating() {
	let c = 0;
	floating = true;
	globalThis.catFloat = setInterval(() => {
		position += Math.cos(c) * 3;
		cat.style.top = position + "px";
		c++;
	}, 250);
}
function bowlFloating() {
	let b = 0;
	globalThis.bowlFloat = setInterval(() => {
		position += Math.cos(b) * 3;
		bowl.style.top = position + "px";
		b++;
	}, 250);
}

catFloating();
bowlFloating();
