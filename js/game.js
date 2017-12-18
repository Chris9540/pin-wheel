window.gameWheel = null;
$(document).ready(function() {
gameWheel = new Winwheel({
        'textAlignment'         : 'outer',
        'textOrientation'       : 'vertical',
        'textOrientation'       : 'curved',
        'lineWidth'             : 1,
        'pointerAngle'          : 0, 
        'outerRadius'           : 900,
        'centerY'               : (window.innerHeight -41),
        'textFontSize'          : 10,
        'rotationAngle'         : -1,
        'animation' :                   // Note animation properties passed in constructor parameters.
            {
                'type'          : 'spinToStop',  // Type of animation.
                'duration'      : 5,             // How long the animation is to take in seconds.
                'spins'         : 8,              // The number of complete 360 degree rotations the wheel is to do.
                'easing'        : 'Power5.easeInOut',
                'callbackFinished' : '',
            }
    });
gameWheel.draw()
});