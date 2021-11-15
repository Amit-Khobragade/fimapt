function Activity(date, distance, duration, marker, type) {
	this.date = date;
	this.distance = distance;
	this.duration = duration;
	this.type = type;
	this.latlng = marker.getLatLng();

	this.speed = (distance * 1000) / (duration * 60);
	this.speed = Math.round(this.speed * 100) / 100;

	this.prompt = document.createElement('div');
	this.prompt.classList.add('task');
	this.prompt.dataset.type = this.type;
	this.prompt.innerHTML = `
    <h2 class="verbose">
      <span class="type"></span>
      on
      <span class="date"></span>
    </h2>
    <div class="details">
      <span class="dist"></span>
      <span class="time"></span>
      <span class="speed"></span>
      <span class="spec"></span>
    </div>
  `;
	this.prompt.querySelector('.type').innerText = this.type;
	this.prompt.querySelector('.date').innerText = this.date;
	this.prompt.querySelector('.dist').innerText = `${distance} KM`;
	this.prompt.querySelector('.time').innerText = `⌚${duration} min`;
	this.prompt.querySelector('.speed').innerText = `⚡${this.speed} m/s`;

	marker.bindTooltip(`${this.type} On ${this.date}`);
}

Activity.prototype.getPrompt = function () {
	return this.prompt;
};
Activity.prototype.getLatLng = function () {
	return this.latlng;
};

function Walking(date, distance, duration, marker, spm) {
	Activity.call(this, date, distance, duration, marker, 'walking');
	this.spm = spm;
	this.prompt.querySelector('.spec').innerText = `👟 ${spm} spm`;
	this.prompt.querySelector('.dist').innerText =
		'🏃' + this.prompt.querySelector('.dist').innerText;
}

Walking.prototype = Object.create(Activity.prototype);
Walking.prototype.constructor = Walking;

function Cycling(date, distance, duration, marker, elev) {
	Activity.call(this, date, distance, duration, marker, 'cycling');
	this.elev = elev;
	this.prompt.querySelector('.spec').innerText = `🗻 ${elev} meters`;
	this.prompt.querySelector('.dist').innerText =
		'🚴' + this.prompt.querySelector('.dist').innerText;
}

Cycling.prototype = Object.create(Activity.prototype);
Cycling.prototype.constructor = Cycling;
