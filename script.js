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

    // Function to randomly advance either left or right side
    function randomAdvance() {
        // Randomly choose left (0) or right (1)
        var side = Math.random() < 0.5 ? '#leftSide' : '#rightSide';
        $(side).cycle('next');
    }

    // Start random advancing every 10 seconds
    setInterval(randomAdvance, 10000);

    // Click handlers to advance to next image
    $('#leftSide').on('click', function() {
        $(this).cycle('next');
    });

    $('#rightSide').on('click', function() {
        $(this).cycle('next');
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
