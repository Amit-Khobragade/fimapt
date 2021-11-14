let map = L.map('map', {
	center: [41, -87],
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

// * 			To Get Current Location

window.navigator.geolocation.getCurrentPosition(
	// *		ON SUCCESS
	({ coords }) => map.panTo([coords.latitude, coords.longitude]),

	// *		ON FALIURE
	() => console.warn('Location not found. Switching to default location'),

	// *		TIMEOUT IN 1s
	{
		timeout: 1000,
	}
);
