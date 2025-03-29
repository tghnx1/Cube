window.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('vimeo-player');
    const player = new Vimeo.Player(iframe);
    const soundToggle = document.getElementById('sound-toggle');

    // Initially mute the video
    player.setVolume(0);


    // Add click event listener to the sound toggle button
    soundToggle.addEventListener('click', () => {
        if (volume === 0) {
            player.setVolume(1); // Unmute the video
            soundToggle.textContent = '🔊'; // Update button icon to "Mute"
        } else {
            player.setVolume(0);; // Mute the video
            soundToggle.textContent = '🔇'; // Update button icon to "Sound ON"
        }
    }).catch(error => {
        console.error('Error getting the volume:', error);
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
