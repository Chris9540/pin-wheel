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
        'animation' :
            {
                'type'          : 'spinToStop',
                'duration'      : 5,
                'spins'         : 8,
                'easing'        : 'Power5.easeInOut',
                'callbackFinished' : '',
            }
    });
gameWheel.draw()
});

function addSegment(text) {
    gameWheel.addSegment({
        'text' : text,
        'fillStyle' : getNextColor()
    }, 1);
    gameWheel.rotationAngle = ((360/gameWheel.numSegments)/2) * -1
    gameWheel.draw();
}
window.colors = new Array("#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#FF7F00", "#7E00FF");
window.currentColor = 0
window.randomColor = false
function getNextColor() {
    let colorAmount = colors.length -1
    if (randomColor == true) {
        currentColor = Math.floor((Math.random() * colorAmount));
    }
    else if (randomColor == false){
        currentColor += 1
        if (currentColor > colorAmount) {
            currentColor = 0;
        }
    }
    return colors[currentColor];
}
