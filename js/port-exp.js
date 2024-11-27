// English and japanese headings
const engText = "Welcome to my diary";
const japText = "ようこそ、私の日記へ";

// Element to display heading 
const headingElement = document.getElementById("welcome-heading");

// Time settings
const typingSpeed = 100; // Speed of typing effect
const erasingSpeed = 50; // Speed of erasing effect
const switchDelay = 1000; // Time to wait before switching languages

let currentText = engText; // Start with English text
let currentIndex = 0;

function typeText(text, callback) {
	let typingInterval = setInterval(() => {
		headingElement.textContent += text[currentIndex];
		currentIndex++;

		if (currentIndex === text.length) {
			clearInterval(typingInterval);
			setTimeout(callback, switchDelay); // Wait before erasing
		}
	}, typingSpeed);
}

function eraseText(callback) {
	let erasingInterval = setInterval(() => {
		headingElement.textContent = headingElement.textContent.slice(0, -1);

		if (headingElement.textContent.length === 0) {
			clearInterval(erasingInterval);
			setTimeout(callback, switchDelay); // Wait before typing again
		}
	}, erasingSpeed);
}

function switchLanguage(counter = 0) {
	// Increase loop counter
	counter = counter + 1;
	console.log("> Counter is at " + counter);
	// Switch between English and Japanese texts
	currentText = (currentText === engText) ? japText : engText;
	currentIndex = 0;  // Reset the index for the new text


	// Start the typing effect
	typeText(currentText, () => {
		// After typing, erase the text and then switch language
		if ((counter > 2) && (currentText === japText)){

			// This should exit the switchlanguage function
			// and stop animation at japanese text.
			console.log("We're getting here");
			headingElement.textContent = japText;
			headingElement.style.borderRight = "None";
			return
		};

		eraseText(() => {
			console.log("> Shouldn't appear after we're getting here");
			switchLanguage(counter); // Repeat the cycle
		});
	});
}

// Start the animation
switchLanguage();
