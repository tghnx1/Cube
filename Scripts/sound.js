window.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('vimeo-player');
    const player = new Vimeo.Player(iframe);
    const soundToggle = document.getElementById('sound-toggle');


    // Function to attempt video playback
    const attemptPlay = (volume) => {
        player.setVolume(volume).then(() => {
            return player.play();
        }).then(() => {
            console.log(`Video is playing with volume: ${volume}`);
        }).catch(error => {
            console.error(`Failed to play video with volume ${volume}:`, error);
        });
    };

// Autoplay muted
    player.setVolume(0).then(() => {
        return player.play();
    }).catch(error => {
        console.error('Autoplay failed in Firefox:', error);
        console.warn('Ensure autoplay is allowed in browser settings.');
    });
    // Sound toggle button


    soundToggle.addEventListener('click', () => {
        player.getVolume().then(currentVolume => {
            if (currentVolume === 0) {
                // Just unmute
                player.setVolume(1).then(() => {
                    soundToggle.textContent = '🔊';
                }).catch(error => {
                    console.error('Error unmuting the video:', error);
                });
            } else {
                // Mute
                player.setVolume(0).then(() => {
                    soundToggle.textContent = '🔇';
                }).catch(error => {
                    console.error('Error muting the video:', error);
                    attemptPlay(0);
                });
            }
        }).catch(error => {
            console.error('Error getting volume:', error);
        });
    });
});
