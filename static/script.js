document.addEventListener('DOMContentLoaded', function () {
    // 🎵 Music Setup
    const musicTracks = [
        "/static/music/lofi1.mp3",
        "/static/music/lofi2.mp3",
        "/static/music/lofi3.mp3", 
        "/static/music/lofi4.mp3", 
        "/static/music/lofi5.mp3", 
        "/static/music/lofi6.mp3"

    ];

    let musicIndex = 0;
    const audioPlayer = document.getElementById('bgMusic');
    const nowPlayingLabel = document.getElementById('nowPlaying');
    const changeMusicImg = document.getElementById('changeMusicImg');
    audioPlayer.src = musicTracks[musicIndex];

    let hasStartedMusic = false;

    // ⏱️ Pomodoro Timer
    let timer = null;
    let timeLeft = 25 * 60;
    let isRunning = false;
    let currentState = 'start'; // 'start' | 'pause' | 'resume'

    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const startImg = document.getElementById('startImg');
    const resetImg = document.getElementById('resetImg');

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }

    function startTimer() {
        if (!isRunning) {
            if (!hasStartedMusic) {
                audioPlayer.play().then(() => {
                    nowPlayingLabel.textContent = `🎵 Now playing: ${musicTracks[musicIndex].split('/').pop()}`;
                }).catch(err => console.log("Music autoplay blocked:", err));
                hasStartedMusic = true;
            }

            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                    currentState = 'start';
                    startImg.src = "/static/buttons/start.png";
                    alert("Time's up! 🎉");
                }
            }, 1000);

            isRunning = true;
            currentState = 'pause';
            startImg.src = "/static/buttons/pause.png";
        } else {
            clearInterval(timer);
            isRunning = false;
            currentState = 'resume';
            startImg.src = "/static/buttons/resume.png";
        }
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 25 * 60;
        updateDisplay();
        isRunning = false;
        currentState = 'start';
        startImg.src = "/static/buttons/start.png";
    }

    startBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);
    updateDisplay();

    // 🌟 Button Hover/Click Image Switching
    startBtn.addEventListener('mouseenter', () => {
        startImg.src = `/static/buttons/${currentState}-hover.png`;
    });

    startBtn.addEventListener('mouseleave', () => {
        startImg.src = `/static/buttons/${currentState}.png`;
    });

    startBtn.addEventListener('mousedown', () => {
        startImg.src = `/static/buttons/${currentState}-click.png`;
    });

    startBtn.addEventListener('mouseup', () => {
        startImg.src = `/static/buttons/${currentState}-hover.png`;
    });

    // Hover states
    resetBtn.addEventListener('mouseenter', () => {
        resetImg.src = "/static/buttons/reset-hover.png";
    });
    resetBtn.addEventListener('mouseleave', () => {
        resetImg.src = "/static/buttons/reset.png";
    });
    resetBtn.addEventListener('mousedown', () => {
        resetImg.src = "/static/buttons/reset-click.png";
    });
    resetBtn.addEventListener('mouseup', () => {
        resetImg.src = "/static/buttons/reset-hover.png";
    });


    // Change Background Button Interactions
    changeBgBtn.addEventListener('mouseenter', () => {
        changeBgImg.src = "/static/buttons/change-bg-hover.png";
    });
    changeBgBtn.addEventListener('mouseleave', () => {
        changeBgImg.src = "/static/buttons/change-bg.png";
    });
    changeBgBtn.addEventListener('mousedown', () => {
        changeBgImg.src = "/static/buttons/change-bg-click.png";
    });
    changeBgBtn.addEventListener('mouseup', () => {
        changeBgImg.src = "/static/buttons/change-bg-hover.png";
    });

    // Change Music Button Interactions
    changeMusicBtn.addEventListener('mouseenter', () => {
        changeMusicImg.src = "/static/buttons/change-music-hover.png";
    });
    changeMusicBtn.addEventListener('mouseleave', () => {
        changeMusicImg.src = "/static/buttons/change-music.png";
    });
    changeMusicBtn.addEventListener('mousedown', () => {
        changeMusicImg.src = "/static/buttons/change-music-click.png";
    });
    changeMusicBtn.addEventListener('mouseup', () => {
        changeMusicImg.src = "/static/buttons/change-music-hover.png";
    });

    // 🖼️ Background Switching
    const backgrounds = [
        "/static/backgrounds/cozy1.gif",
        "/static/backgrounds/cozy2.gif",
        "/static/backgrounds/cozy3.gif",
        "/static/backgrounds/cozy4.gif", 
        "/static/backgrounds/cozy5.gif"
    ];

    let bgIndex = 0;
    const changeBgImg = document.getElementById('changeBgImg');

    changeBgBtn.addEventListener('click', function () {
        bgIndex = (bgIndex + 1) % backgrounds.length;
        document.body.style.backgroundImage = `url("${backgrounds[bgIndex]}")`;
    });

    document.body.style.backgroundImage = `url("${backgrounds[0]}")`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';

    // 🎵 Change Music Button
    changeMusicBtn.addEventListener('click', () => {
        musicIndex = (musicIndex + 1) % musicTracks.length;
        audioPlayer.src = musicTracks[musicIndex];
        audioPlayer.play();
        nowPlayingLabel.textContent = `🎵 Now playing: ${musicTracks[musicIndex].split('/').pop()}`;
    });
});
