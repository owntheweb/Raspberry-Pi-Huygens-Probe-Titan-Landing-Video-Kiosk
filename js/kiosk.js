window.onload = function(){
	var player = {
		volume: 0.1, //It's LOUD on tested USB speaker. Edit to taste.
		state: 'init',
		playPauseBtn: {},
		playPauseIcon: {},
		forwardBtn: {},
		backwardBtn: {},
		rewindBtn: {},
		video: {},
		screensaverCover: {},
		screensaverText: {},
		screensaverDelay: 300000,
		screensaverTimer: {},
		screensaverTextTimer: {},
		screensaverTimerActive: false,

		//get things started
		init: function() {
			var self = this;

			//screensaver elements
			self.screensaverCover = document.getElementById("screensaver");
			self.screensaverText = document.getElementById("screensaverText");

			//stop screensaver
			self.screensaverCover.onclick = function(event) {
				self.screensaverCover.className = '';
				self.video.currentTime = 3;
				clearInterval(self.screensaverTextTimer);
				self.togglePlayPause();
			};

			//video element
			self.video = document.getElementById("vid1");
            self.video.volume = self.volume;
			self.video.onclick = function(event) {
				self.togglePlayPause();
			};

			//when video has ended
			self.video.addEventListener('ended', function(event) {
				//rewind video
				self.video.currentTime = 3;
				self.togglePlayPause();
			}, false);

			//play/pause button
			self.playPauseBtn = document.getElementById("playpause");
			self.playPauseIcon = document.getElementById("playpauseicon");
			self.playPauseBtn.onfocus = function(event) {
				self.togglePlayPause();
			}

			//forward button, moves forward 10 seconds
			self.forwardBtn = document.getElementById("forward");
			self.forwardBtn.onfocus = function(event) {
				self.video.currentTime += 10;
				setTimeout(function() {
					self.forwardBtn.blur();
				}, 150);
			}

			//backward button, moves backward 10 seconds
			self.backwardBtn = document.getElementById("backward");
			self.backwardBtn.onfocus = function(event) {
				self.video.currentTime -= 10;
				setTimeout(function() {
					self.backwardBtn.blur();
				}, 150);
			}

			//rewind button, moves to the beginning
			self.rewindBtn = document.getElementById("rewind");
			self.rewindBtn.onfocus = function(event) {
				self.video.currentTime = 3;
				if(self.state != 'playing') {
					self.togglePlayPause();
				}
				setTimeout(function() {
					self.rewindBtn.blur();
				}, 150);
			}

			//start the video loop
			self.playPauseBtn.focus();
		},

		//toggle between video play and pause
		togglePlayPause: function() {
			var self = this;
			if(self.state == 'playing') {
				self.state = 'paused';
				self.toggleScreensaverTimer();
				console.log('pausing...');
				self.video.pause();
				setTimeout(function() {
					self.playPauseIcon.className = 'fa fa-play fa-4x';
					self.playPauseBtn.blur();
				}, 150);
			} else {
				self.state = 'playing';
				self.toggleScreensaverTimer();
				console.log('playing...');
				self.video.play();
				setTimeout(function() {
					self.playPauseIcon.className = 'fa fa-pause fa-4x';
					self.playPauseBtn.blur();
				}, 150);
			}
		},

		//timed screensaver
		toggleScreensaverTimer: function() {
			var self = this;
			if(self.screensaverTimerActive == false && self.state != 'playing') {
				//start timer
				self.screensaverTimer = setTimeout(function(){
					self.screensaverCover.className = 'visible';
				}, self.screensaverDelay);

				//start random positioning of start text so not to burn still text into the screen over time
				self.screensaverTextTimer = setInterval(function(){
					self.screensaverText.style.top = (Math.random() * 60 + 20).toString() + "%";
					self.screensaverText.style.left = (Math.random() * 60 + 20).toString() + "%";
				}, 3000);

			} else {
				//cancel timer
				clearTimeout(self.screensaverTimer);
			}
		}
	};

	var vidPlayer = Object.create(player);
	vidPlayer.init();
};
