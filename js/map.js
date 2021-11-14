let map = null;
window.navigator.geolocation.getCurrentPosition(
	initMap,
	() => initMap({ coords: { latitude: 41, longitude: -87 } }),
	{
		timeout: -1,
	}
);

function initMap({ coords }) {
	map = L.map('map', {
		center: [coords.latitude, coords.longitude],
		zoom: 9,
		minZoom: 4,
		maxZoom: 14,
	});

	L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png?{foo}', {
		foo: 'bar',
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);

	map.zoomControl.setPosition('bottomright');
	map.on('click', function (ev) {
		console.log(ev.latlng);
	});
}
