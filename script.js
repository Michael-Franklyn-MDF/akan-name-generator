// Akan names by day of week
const akanNames = {
	male: ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"],
	female: ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"]
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

document.getElementById('akanForm').addEventListener('submit', function(e) {
	e.preventDefault();
	const dobInput = document.getElementById('dob').value;
	const gender = document.getElementById('gender').value;
	const resultDiv = document.getElementById('result');
	const akanInfo = document.getElementById('akanInfo');

	// Clear previous result
	resultDiv.textContent = "";
	akanInfo.style.display = "none";

	if (!dobInput) {
		resultDiv.textContent = "Please enter your birthdate.";
		return;
	}
	if (!gender) {
		resultDiv.textContent = "Please select your gender.";
		return;
	}

	const date = new Date(dobInput);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	// Validation
	if (isNaN(day) || day < 1 || day > 31) {
		resultDiv.textContent = "Day must be between 1 and 31.";
		const [yearStr, monthStr, dayStr] = dobInput.split('-');
		const year = parseInt(yearStr, 10);
		const month = parseInt(monthStr, 10);
		const day = parseInt(dayStr, 10);
		return;
	}
	if (!/^\d{4}$/.test(year.toString())) {
		resultDiv.textContent = "Year must be exactly 4 digits.";
		return;
	}

	// Calculate day of week using provided formula
	const CC = Math.floor(year / 100);
	const YY = year % 100;
	const MM = month;
	const DD = day;

	
	let d = ((4 * CC - 2 * CC - 1) + (45 * YY) + (1026 * (MM + 1)) + DD) % 7;
	d = ((d % 7) + 7) % 7; // Ensure positive mod
	let akanName = "";
	let dayName = dayNames[d];
	if (gender === "male") {
		akanName = akanNames.male[d];
	} else if (gender === "female") {
		akanName = akanNames.female[d];
	} else {
		resultDiv.textContent = "Invalid gender selected.";
		return;
	}
	resultDiv.innerHTML = `<div class="result-card">
		<h2>Your Akan Name: <span class='akan-name'>${akanName}</span></h2>
		<p>You were born on a <strong>${dayName}</strong>.</p>
	</div>`;
	akanInfo.style.display = "block";
});

document.getElementById('resetBtn').addEventListener('click', function() {
	document.getElementById('akanForm').reset();
	document.getElementById('result').textContent = "";
	document.getElementById('akanInfo').style.display = "none";
});
