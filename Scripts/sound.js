window.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hero-video');
    const soundToggle = document.getElementById('sound-toggle');

    // Initially mute the video
        video.muted = true;


    // Add click event listener to the sound toggle button
    soundToggle.addEventListener('click', () => {
        if (video.muted) {
            video.muted = false; // Unmute the video
            soundToggle.textContent = '🔊'; // Update button icon to "Mute"
        } else {
            video.muted = true; // Mute the video
            soundToggle.textContent = '🔇'; // Update button icon to "Sound ON"
        }
    });

    // Retrieve last playback position from localStorage
    const savedTime = localStorage.getItem('videoPlaybackTime');
    if (savedTime) {
        video.currentTime = parseFloat(savedTime); // Restore playback position
    }

    // Save current playback position to localStorage when video time updates
    video.addEventListener('timeupdate', () => {
        localStorage.setItem('videoPlaybackTime', video.currentTime);
        localStorage.setItem('videoMuted', video.muted);
    });

    // Optional: Clear playback position from localStorage on video end
    video.addEventListener('ended', () => {
        localStorage.removeItem('videoPlaybackTime');
        localStorage.removeItem('videoMuted');
    });
});