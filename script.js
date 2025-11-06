$(document).ready(function() {
    // Initialize Cycle plugin for both sides with fade effect, but paused
    $('#leftSide').cycle({
        fx: 'fade',
        speed: 800,
        timeout: 0,
        paused: true
    });

    $('#rightSide').cycle({
        fx: 'fade',
        speed: 800,
        timeout: 0,
        paused: true
    });

    // Variable to store the interval ID
    var autoAdvanceInterval;

    // Function to randomly advance either left or right side
    function randomAdvance() {
        // Randomly choose left (0) or right (1)
        var side = Math.random() < 0.5 ? '#leftSide' : '#rightSide';
        $(side).cycle('next');
    }

    // Function to start/restart the auto-advance timer
    function startAutoAdvance() {
        // Clear existing interval if any
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
        }
        // Start new interval
        autoAdvanceInterval = setInterval(randomAdvance, 10000);
    }

    // Start random advancing every 10 seconds
    startAutoAdvance();

    // Click handlers to advance to next image and reset timer
    $('#leftSide').on('click', function() {
        $(this).cycle('next');
        startAutoAdvance(); // Reset the timer
    });

    $('#rightSide').on('click', function() {
        $(this).cycle('next');
        startAutoAdvance(); // Reset the timer
    });

    // About overlay handlers
    $('#aboutBtn').on('click', function(e) {
        e.preventDefault();
        $('#aboutOverlay').addClass('active');
    });

    $('#closeBtn').on('click', function(e) {
        e.preventDefault();
        $('#aboutOverlay').removeClass('active');
    });

    // Close overlay when clicking outside the column container
    $('.overlay-content').on('click', function(e) {
        if (e.target === this) {
            $('#aboutOverlay').removeClass('active');
        }
    });

    // Prevent clicks inside the column container from closing the overlay
    $('.column-container').on('click', function(e) {
        e.stopPropagation();
    });
});
