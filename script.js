$(document).ready(function() {
    // Initialize Cycle plugin for both sides with fade effect
    $('#leftSide').cycle({
        fx: 'fade',
        speed: 800,
        timeout: 0, // No auto-advance
        paused: true
    });

    $('#rightSide').cycle({
        fx: 'fade',
        speed: 800,
        timeout: 0, // No auto-advance
        paused: true
    });

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
