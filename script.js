document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen Tugas ---
    const taskInput = document.getElementById('taskInput');
    const setTaskButton = document.getElementById('setTaskButton');
    const currentTaskDisplay = document.getElementById('currentTask');

    // --- Elemen Timer ---
    const timerDisplay = document.getElementById('timerDisplay');
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const resetButton = document.getElementById('resetButton');

    // --- Variabel Timer ---
    let totalSeconds = 25 * 60; // 25 menit
    let secondsRemaining = totalSeconds;
    let timerInterval = null;
    let isPaused = true;

    // --- Fungsi Tugas ---
    setTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            currentTaskDisplay.textContent = task;
            taskInput.value = ''; // Kosongkan input setelah ditetapkan
            alert(`Tugas Fokus Anda: "${task}". Mulai Pomodoro!`);
        } else {
            alert('Tolong masukkan tugas terlebih dahulu!');
        }
    });

    // --- Fungsi Timer ---

    function updateTimerDisplay() {
        const minutes = Math.floor(secondsRemaining / 60);
        const seconds = secondsRemaining % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timerDisplay.textContent = formattedTime;
    }

    function startTimer() {
        if (!isPaused || secondsRemaining === 0) return;

        isPaused = false;
        startButton.disabled = true;
        pauseButton.disabled = false;

        timerInterval = setInterval(() => {
            secondsRemaining--;
            updateTimerDisplay();

            if (secondsRemaining <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                isPaused = true;
                startButton.disabled = false;
                pauseButton.disabled = true;
                timerDisplay.textContent = "00:00";
                
                // Notifikasi Tugas Selesai
                alert('Waktu Pomodoro Selesai! Saatnya istirahat sebentar. Tugas: ' + currentTaskDisplay.textContent);
            }
        }, 1000);
    }

    function pauseTimer() {
        if (!isPaused && timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
            isPaused = true;
            startButton.disabled = false;
            pauseButton.disabled = true;
        }
    }

    function resetTimer() {
        pauseTimer(); // Pastikan timer berhenti dulu
        secondsRemaining = totalSeconds;
        updateTimerDisplay();
        startButton.disabled = false;
        pauseButton.disabled = true;
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    // Inisialisasi tampilan awal
    updateTimerDisplay();
});