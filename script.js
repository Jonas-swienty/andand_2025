$(document).ready(function() {
    // Function to initialize or reinitialize cycle
    function initCycle() {
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
    }

    // Function to recenter all images
    function recenterImages() {
        $('#leftSide img, #leftSide video, #rightSide img, #rightSide video').each(function() {
            var $elem = $(this);
            // Force complete recalculation of positioning
            $elem.css({
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'object-fit': 'cover',
                'object-position': 'center center',
                'max-width': '100%',
                'max-height': '100%'
            });
        });
    }

    // Initialize on load
    initCycle();

    // Recenter all images on initial load
    recenterImages();

    // Variable to store the interval ID
    var autoAdvanceInterval;

    // Function to randomly advance either left or right side
    function randomAdvance() {
        // Randomly choose left (0) or right (1)
        var side = Math.random() < 0.5 ? '#leftSide' : '#rightSide';
        $(side).cycle('next');
        // Delay recenter to let cycle plugin finish
        setTimeout(function() {
            recenterImages();
        }, 50);
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
        // Delay recenter to let cycle plugin finish
        setTimeout(function() {
            recenterImages();
        }, 50);
        startAutoAdvance(); // Reset the timer
    });

    $('#rightSide').on('click', function() {
        $(this).cycle('next');
        // Delay recenter to let cycle plugin finish
        setTimeout(function() {
            recenterImages();
        }, 50);
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

    // Handle window resize to reposition images
    var resizeTimer;
    var lastWidth = $(window).width();

    $(window).on('resize', function() {
        var currentWidth = $(window).width();

        // Only act if width actually changed (not just height on mobile scroll)
        if (currentWidth !== lastWidth) {
            lastWidth = currentWidth;

            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Recenter all images on resize
                recenterImages();

                // Force reflow by temporarily changing opacity
                $('#leftSide img, #leftSide video, #rightSide img, #rightSide video').each(function() {
                    var $elem = $(this);
                    $elem.css('opacity', 0.9999);
                    setTimeout(function() {
                        $elem.css('opacity', '');
                    }, 10);
                });
            }, 150);
        }
    });
});
