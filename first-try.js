// All selectors
const speedUp = document.querySelector(".fast");
const slowDown = document.querySelector(".slow");
const normalSpeed = document.querySelector(".normal");
const btn = document.querySelector(".start");
const on = document.querySelector(".on");
const off = document.querySelector(".off");
const tryAgain = document.querySelector(".try-again");
// CONSTANTS & variables
x = 920; // center
y = 260; // center
r = 150; // radius
a = 0; // angle (from 0 to Math.PI * 2)
let countdownSpeed = 500;
let catSpeed = 10;
let ss = 500;
let timerRef;
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
let i = 9;
let firstTime = 0;

// Functions
function rotate(a) {
	let px = x + r * Math.cos(a);
	let py = y + r * Math.sin(a);

	document.querySelector("#cat").style.left = px + "px";
	document.querySelector("#cat").style.top = py + "px";
}
// Speed-up/slow-down counter & cat movement

normalSpeed.addEventListener("click", () => {
	countdownSpeed = 1000;
	catSpeed = 10;
	normalSpeed.querySelector(".speed").classList.add("clicked");
	speedUp.querySelector(".speed").classList.remove("clicked");
	slowDown.querySelector(".speed").classList.remove("clicked");
});
slowDown.addEventListener("click", () => {
	countdownSpeed = 2000;
	catSpeed = 20;
	console.log(catSpeed);
	slowDown.querySelector(".speed").classList.add("clicked");
	normalSpeed.querySelector(".speed").classList.remove("clicked");
	speedUp.querySelector(".speed").classList.remove("clicked");
});
speedUp.addEventListener("click", () => {
	countdownSpeed = 500;
	catSpeed = 2;
	console.log(catSpeed);
	speedUp.querySelector(".speed").classList.add("clicked");
	slowDown.querySelector(".speed").classList.remove("clicked");
	normalSpeed.querySelector(".speed").classList.remove("clicked");
});

// Main part of the code
on.addEventListener("click", () => {
	// Starting the first time after the page reload
	on.classList.add("hide"); // Hide the 'Start' button
	off.classList.remove("hide"); // & show the 'Stop' button
	// Get into position for the first time
	function getIntoPosition() {
		// Why is it inside a function? Can I get it out and just call it here?
		const walk = setInterval(() => {
			// First setInterval (1)
			document.querySelector("#cat").style.left = ss + "px";
			ss++;
			if (ss >= 1070 && ss <= 1080) {
				// Condition on getting into position to start rotation movement, 1070 gotten with trial and error, need a value for all screen sizes
				clearInterval(walk); // Stop walking effect for the cat
				clearInterval(floatingEffectCat); // Stop floating effect for the cat
				// Start -> Stop
				if (document.querySelector(".numbers").classList.contains("hide")) {
					// If the numbers still not shown. Is this condition necessary?
					document.querySelector(".numbers").classList.remove("hide"); // Remove hide class to display them
				}
				// Start animation
				if (on.classList.contains("hide")) {
					// If the 'start' button is hidden then the animation is expected to be executing
					let anim = setInterval(function () {
						// Main rotation movement
						a = (a + Math.PI / 360) % (Math.PI * 2); // Add one degree to the angle a
						console.log(i);
						// 1st condition: All numbers are shown 9 -> 0. 2nd condition: cat position angle a is almost equal to 0 (e for the 														   scientific notation of the number)
						if (i <= 0 && a.toString(10).indexOf("e") != -1) {
							clearInterval(anim); // Stop rotation movement of the cat
							clearInterval(count); // Stop the count for the numbers
							// Resume floating
							let floatingEffectCat = setInterval(() => {
								document.querySelector("#cat").style.top = catPos + "px";
								c++;
								catPos += Math.cos(b) * 3;
							}, 200);
							// Resume Walking
							const secondWalk = setInterval(() => {
								document.querySelector("#cat").style.left = ss + "px";
								ss++;
								off.addEventListener("click", () => {
									clearInterval(walk);
									clearInterval(secondWalk);
									on.classList.remove("hide"); // Show 'Start' button
									off.classList.add("hide"); // Hide 'Stop' button
								});
								// cat x coordinate:
								const CAT_POS = cat.getBoundingClientRect().x;
								const BOWL_POS = bowl.getBoundingClientRect().x;
								// Condition on the position of the cat relative to the food bowl, how close should the cat get before stopping
								if (BOWL_POS - CAT_POS < 70) {
									clearInterval(secondWalk); // Stop walk animation
									let floatingEffectCat = setInterval(() => {
										// Start floating animation
										document.querySelector("#cat").style.top = catPos + "px";
										c++;
										catPos += Math.cos(b) * 3;
									}, 200);
									// Animate the bowl disappearing (cat eating it :D)
									let opacity = 1;
									setInterval(() => {
										bowl.style.opacity = opacity;
										opacity -= 0.1;
									}, 100);
									// End of all animations, show 'Try Again' for the user & hide the 'Start'/'Stop' buttons
									setTimeout(() => {
										on.classList.add("hide");
										off.classList.add("hide");
										tryAgain.classList.remove("hide"); // Show 'Try Again' button
									}, 2000);
								}
							}, catSpeed);
						}
						rotate(a); // Call rotate function to generate the appropriate px and py coords from the current value of the angle a
					}, catSpeed);

					// Start the count-down animation
					let count = setInterval(function countdown() {
						document.querySelector(".numbers").style.right = arr[i]; // Change the 'numbers' image position to show the appropriate number from the array
						i--;
					}, countdownSpeed);
					// Stop animation, only works for rotation & countdown animation
					off.addEventListener("click", () => {
						clearInterval(anim);
						clearInterval(count);
						on.classList.remove("hide"); // Show 'Start' button
						off.classList.add("hide"); // Hide 'Stop' button
					});
				}
			}
		}, catSpeed);
	}
	getIntoPosition();
});

// Bowl floating animation
let b = 0;
let c = 0;

let bowlPos = 225;
let catPos = 225;

let floatingEffectBowl = setInterval(() => {
	document.querySelector("#bowl").style.top = bowlPos + "px";
	b++;
	bowlPos += Math.cos(b) * 3;
}, 200);

// Cat floating animation
let floatingEffectCat = setInterval(() => {
	document.querySelector("#cat").style.top = catPos + "px";

	c++;
	catPos += Math.cos(b) * 3;
}, 200);

// 'Try Again' button

tryAgain.addEventListener("click", () => location.reload()); // reload the page



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
