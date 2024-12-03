document.getElementById("bulb").addEventListener('click', function() {
	var link = document.getElementById('theme-style');
	console.log("Cick detected");

	// Check if the current stylesheet is the default one
	if (link.getAttribute('href') === '../css/colorschemes/dark.css') {
		link.setAttribute('href', '../css/colorschemes/light.css');  // Switch to dark.css
	} else {
		link.setAttribute('href', '../css/colorschemes/dark.css');  // Switch back to light.css
	}
});
