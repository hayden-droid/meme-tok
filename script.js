document.addEventListener("DOMContentLoaded", function () {
    const videoPlayer = document.getElementById("video-player");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const progressBar = document.getElementById("progress-bar");
    const playButton = document.getElementById("play-button");
    const videoSources = [
        "videos/video1.mp4",
        "videos/video2.mp4",
        "videos/video3.mp4",
        "videos/video4.mp4",
    ];
    let currentVideoIndex = 0;

    function loadVideo(index) {
        if (index >= 0 && index < videoSources.length) {
            videoPlayer.src = videoSources[index];
            currentVideoIndex = index;
        }
    }

    prevButton.addEventListener("click", function () {
        loadVideo(currentVideoIndex - 1);
    });

    nextButton.addEventListener("click", function () {
        loadVideo(currentVideoIndex + 1);
    });

    videoPlayer.addEventListener("timeupdate", updateProgressBar);

    function updateProgressBar() {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;
        const percentage = (currentTime / duration) * 100;
        progressBar.style.width = percentage + "%";
    }

    function togglePlay() {
        if (videoPlayer.paused || videoPlayer.ended) {
            videoPlayer.play();
            playButton.innerHTML = '<img src="icons/pause.svg" alt="Pause">';
        } else {
            videoPlayer.pause();
            playButton.innerHTML = '<img src="icons/play.svg" alt="Play">';
        }
    }

    playButton.addEventListener("click", togglePlay);

    // Handle arrow key navigation
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp") {
            loadVideo(currentVideoIndex - 1);
        } else if (event.key === "ArrowDown") {
            loadVideo(currentVideoIndex + 1);
        }
    });

    // Load the first video
    loadVideo(currentVideoIndex);
});