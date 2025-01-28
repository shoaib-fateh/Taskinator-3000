document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('.checkbox');
    const progressBar = document.getElementById('custom-progress-bar');
    const progressBarText = document.getElementById('progress-bar-text');
    const totalDaysElement = document.getElementById('remaining-days');
    const resultText = document.getElementById('result');
    
    // Local Storage for task completion state
    checkboxes.forEach((checkbox, index) => {
        // Restore checkbox state from localStorage
        if (localStorage.getItem(`task-${index}-completed`) === 'true') {
            checkbox.checked = true;
        }
        
        // Event listener to save state
        checkbox.addEventListener('change', () => {
            localStorage.setItem(`task-${index}-completed`, checkbox.checked);
            updateProgress();
        });
    });

    function updateProgress() {
        let completedTasks = 0;
        let totalTasks = checkboxes.length;
        
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) completedTasks++;
        });

        // Update custom progress bar width
        let progress = (completedTasks / totalTasks) * 100;
        progressBar.style.width = `${progress}%`;
        progressBarText.textContent = `${Math.round(progress)}%`;

        // Update result section
        resultText.textContent = `${Math.round(progress)}%`;

        // Calculate remaining days based on 14 days (Phase 1 and 2 completion)
        const remainingDays = 14; // 14 days to completion

        // Display the remaining days
        totalDaysElement.textContent = remainingDays > 0 ? remainingDays : 0;  // Ensure it doesn't show negative days
    }

    // Initial call to update progress
    updateProgress();
});
