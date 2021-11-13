window.navigator.geolocation.getCurrentPosition(
	initMap,
	() => initMap({ coords: { latitude: 41, longitude: -87 } }),
	{
		timeout: -1,
	}
);

function initMap({ coords }) {
	let map = L.map('map').setView([coords.latitude, coords.longitude], 9);

	L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png?{foo}', {
		foo: 'bar',
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);

	map.on('click', function (ev) {
		console.log(ev.latlng);
	});
}
