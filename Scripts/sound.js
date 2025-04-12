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

    // Autoplay with sound initially
    player.setVolume(1).then(() => {
        return player.play();
    }).then(() => {
        // Check if the video is actually playing
        return player.getPaused();
    }).then(isPaused => {
        if (isPaused) {
            console.warn('Autoplay with sound failed, retrying muted...');
            attemptPlay(0); // Fallback to muted playback
        } else {
            console.log('Autoplay with sound succeeded.');
        }
    }).catch(error => {
        console.error('Error during autoplay attempt:', error);
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
