// Main orchestration
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Load configuration
    loadConfig();
});

async function loadConfig() {
    try {
        const response = await fetch('data/bouquet-config.json');
        const config = await response.json();

        // Apply configuration to DOM
        applyConfig(config);
    } catch (error) {
        console.log('Using default configuration');
    }
}

function applyConfig(config) {
    // Update names
    const senderEls = document.querySelectorAll('.sender-name, .sender');
    const recipientEls = document.querySelectorAll('.recipient-name, .recipient');

    senderEls.forEach(el => el.textContent = config.sender?.name || 'Zoey');
    recipientEls.forEach(el => el.textContent = config.recipient?.name || 'Jim');

    // Update PIN
    if (window.pinValidator && config.recipient?.pin) {
        window.pinValidator.correctPin = config.recipient.pin;
    }

    // Update letter message
    const messageEl = document.querySelector('.message');
    if (messageEl && config.letter?.message) {
        messageEl.textContent = config.letter.message;
    }

    // Update Spotify track
    const spotifyFrame = document.querySelector('.spotify-widget iframe');
    if (spotifyFrame && config.media?.spotifyTrack) {
        spotifyFrame.src = config.media.spotifyTrack.replace(
            'open.spotify.com/track/',
            'open.spotify.com/embed/track/'
        ) + '?utm_source=generator&theme=0';
    }

    // Update YouTube video
    const youtubeFrame = document.getElementById('youtubePlayer');
    if (youtubeFrame && config.media?.youtubeVideo) {
        youtubeFrame.src = `https://www.youtube-nocookie.com/embed/${config.media.youtubeVideo}?rel=0&modestbranding=1&enablejsapi=1`;
    }

    // Update voice note
    if (window.voicePlayer && config.media?.voiceNote) {
        window.voicePlayer.audio.src = config.media.voiceNote;
    }
}