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
		return;
	}
	if (isNaN(month) || month < 1 || month > 12) {
		resultDiv.textContent = "Month must be between 1 and 12.";
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

	// Use JS Date to get day of week
	const dayOfWeek = date.getDay(); // 0=Sunday, 6=Saturday
	let akanName = "";
	let dayName = dayNames[dayOfWeek];
	if (gender === "male") {
		akanName = akanNames.male[dayOfWeek];
	} else if (gender === "female") {
		akanName = akanNames.female[dayOfWeek];
	} else {
		resultDiv.textContent = "Invalid gender selected.";
		return;
	}
	resultDiv.innerHTML = `<div style="padding:18px 12px;background:#e6f7ff;border-radius:10px;box-shadow:0 2px 8px #0078d420;max-width:350px;margin:auto;">
		<h2>Your Akan Name: <span style='color:#0078d4'>${akanName}</span></h2>
		<p>You were born on a <strong>${dayName}</strong>.</p>
	</div>`;
	akanInfo.style.display = "block";
});
// Reset button functionality
document.getElementById('resetBtn').addEventListener('click', function() {
	document.getElementById('akanForm').reset();
	document.getElementById('result').textContent = "";
	document.getElementById('akanInfo').style.display = "none";
});
