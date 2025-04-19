document.addEventListener('DOMContentLoaded', function () {
    // Music Setup
    const musicTracks = [
        "/static/music/lofi1.mp3",
        "/static/music/lofi2.mp3",
        "/static/music/lofi3.mp3"
    ];

    let musicIndex = 0;
    const audioPlayer = document.getElementById('bgMusic');
    const nowPlayingLabel = document.getElementById('nowPlaying');
    const changeMusicBtn = document.getElementById('changeMusicBtn');
    audioPlayer.src = musicTracks[musicIndex];

    // Only play music once
    let hasStartedMusic = false;

    // Pomodoro Timer
    let timer = null;
    let timeLeft = 25 * 60;
    let isRunning = false;

    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }

    function startTimer() {
        if (!isRunning) {
            if (!hasStartedMusic) {
                audioPlayer.play().then(() => {
                    if (nowPlayingLabel) {
                        nowPlayingLabel.textContent = `🎵 Now playing: ${musicTracks[musicIndex].split('/').pop()}`;
                    }
                }).catch(err => {
                    console.log("Music autoplay blocked:", err);
                });
                hasStartedMusic = true;
            }

            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                    startBtn.textContent = 'Start';
                    alert("Time's up! 🎉");
                }
            }, 1000);
            isRunning = true;
            startBtn.textContent = 'Pause';
        } else {
            clearInterval(timer);
            isRunning = false;
            startBtn.textContent = 'Resume';
        }
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 25 * 60;
        updateDisplay();
        isRunning = false;
        startBtn.textContent = 'Start';
    }

    startBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);
    updateDisplay();

    // Background Switching
    const backgrounds = [
        "/static/backgrounds/cozy1.gif",
        "/static/backgrounds/cozy2.gif",
        "/static/backgrounds/cozy3.gif"
    ];

    let bgIndex = 0;
    const changeBgBtn = document.getElementById('changeBgBtn');

    changeBgBtn.addEventListener('click', function () {
        bgIndex = (bgIndex + 1) % backgrounds.length;
        document.body.style.backgroundImage = `url("${backgrounds[bgIndex]}")`;
    });

    document.body.style.backgroundImage = `url("${backgrounds[0]}")`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';

    // Change Music Button
    changeMusicBtn.addEventListener('click', () => {
        musicIndex = (musicIndex + 1) % musicTracks.length;
        audioPlayer.src = musicTracks[musicIndex];
        audioPlayer.play();
        if (nowPlayingLabel) {
            nowPlayingLabel.textContent = `🎵 Now playing: ${musicTracks[musicIndex].split('/').pop()}`;
        }
    });
});
