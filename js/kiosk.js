window.onload = function(){
	var player = {
		state: 'init',
		playPauseBtn: {},
		playPauseIcon: {},
		forwardBtn: {},
		backwardBtn: {},
		rewindBtn: {},
		video: {},

		//get things started
		init: function() {
			var self = this;

			//video element
			self.video = document.getElementById("vid1");

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

			//forward button, moves forward 10 seconds
			self.backwardBtn = document.getElementById("backward");
			self.backwardBtn.onfocus = function(event) {
				self.video.currentTime -= 10;
				setTimeout(function() {
					self.backwardBtn.blur();
				}, 150);
			}

			//forward button, moves forward 10 seconds
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
				console.log('pausing...');
				self.video.pause();
				setTimeout(function() {
					self.playPauseIcon.className = 'fa fa-play fa-4x';
					self.playPauseBtn.blur();
				}, 150);
			} else {
				self.state = 'playing';
				console.log('playing...');
				self.video.play();
				setTimeout(function() {
					self.playPauseIcon.className = 'fa fa-pause fa-4x';
					self.playPauseBtn.blur();
				}, 150);
			}
		}
	};

	var vidPlayer = Object.create(player);
	vidPlayer.init();
};
