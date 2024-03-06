// CHALLENGE: add full screen button, volume and speed icons to sliders

// 1. get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]'); // anything that has this property
const ranges = player.querySelectorAll('.player__slider');

// 2. build our functions

function togglePlay() {
    // call .play or .pause on the video
    if (video.paused) {
        // a video element only has a paused property, nothing for playing
        video.play(); // inherent methods of a video element
    } else {
        video.pause();
    }
}

function updateButton() {
    // update play/pause button depending on if video is paused or not
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    // advance video based on the skip value of each element's data object
    video.currentTime += parseFloat(this.dataset.skip); // convert string to number
}

function handleRangeUpdate() {
    // names of slider elements are conveniently the same name as the corresponding video properties
    video[this.name] = this.value; // need to use bracket notation because of the variable
}

function handleProgress() {
    // update flex-basis percentage value - 0% not started, 100% finished
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; // relative mouse position / element width 
    video.currentTime = scrubTime;
}

// 3. hook up event listeners

// video plays when the play button is clicked or the video itself is clicked on
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton); 
video.addEventListener("timeupdate", handleProgress); // rather than setting an interval or time, listen to video emitting an event
toggle.addEventListener("click", togglePlay);
skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
progress.addEventListener("click", scrub);

let mousedown = false;
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
