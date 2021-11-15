let invisibleClass = 'invisible';
let form = document.getElementById('ex');
let workouts = document.querySelector('.workouts');
let marker = null;
let activities = [];

// * 			FUNCTION  'to add new markers'
// ! Marker MUST be preset before calling the function

function addToMap({ date, distance, duration, type, spm, elev }) {
	let activity = null;
	if (type === 'walking') {
		activity = new Walking(date, distance, duration, marker, spm);
	} else if (type === 'cycling') {
		activity = new Cycling(date, distance, duration, marker, elev);
	}

	activity
		.getPrompt()
		.addEventListener('click', () => map.panTo(activity.getLatLng()));

	// * Add the activity to the workouts
	workouts.append(activity.getPrompt());

	// * Add the activity to activities
	activities.push(activity);

	marker = null;
}

map.on('click', function (ev) {
	if (marker) marker.remove();
	form.classList.remove(invisibleClass);

	marker = L.marker(ev.latlng);
	marker.addTo(map);
});

form.addEventListener('submit', function (ev) {
	ev.preventDefault();
	form.classList.add(invisibleClass);

	addToMap({
		date: form.date.value,
		distance: form.dist.value,
		duration: form.time.value,
		type: form.dataset.type,
		spm: form.cadence.value,
		elev: form.elevGain.value,
	});

	form.reset();
	if (form.dataset.type === 'walking')
		form.type.dispatchEvent(new Event('change'));
});

form.type.addEventListener('change', function () {
	form.dataset.type = form.type.value;
	let cadence = form.cadence;
	let elevGain = form.elevGain;

	elevGain.classList.toggle(invisibleClass);
	cadence.classList.toggle(invisibleClass);
	// * toggling labels
	elevGain.previousElementSibling.classList.toggle(invisibleClass);
	cadence.previousElementSibling.classList.toggle(invisibleClass);

	cadence.required = !cadence.required;
	elevGain.required = !elevGain.required;
});

// * Store the given items on local storage when the page closes
window.addEventListener('beforeunload', function () {
	this.localStorage.setItem('user', JSON.stringify(activities));
});

// * retrive the already stored items
window.addEventListener('load', function () {
	JSON.parse(this.localStorage.getItem('user')).forEach(elem => {
		if (Date.parse(elem.date) < Date.now()) return;
		marker = L.marker(elem.latlng);
		marker.addTo(map);
		addToMap(elem);
	});
});

// !!!!! WARNING TEST FUNCTION ONLY
function clear() {
	console.warn('test function used');
	activities = [];
}
