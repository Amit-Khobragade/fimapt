let invisibleClass = 'invisible';
let form = document.getElementById('ex');
let marker = null;

map.on('click', function (ev) {
	if (marker) marker.remove();
	form.classList.remove(invisibleClass);

	marker = L.marker(ev.latlng);
	marker.addTo(map);
});

form.addEventListener('submit', function (ev) {
	ev.preventDefault();
	form.classList.add(invisibleClass);

	// * Create a new object depending on the type of input and
	// * store it in memory

	// * Add tooltip to the marker

	marker = null;
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
