
window.kanvas = null
window.heightPercent = 50;

var mie = (navigator.appName == "Microsoft Internet Explorer") ? true : false;
if (!mie) {
     document.captureEvents(Event.MOUSEMOVE);
}
document.captureEvents(Event.MOUSEMOVE);
document.onmousemove = function (e) {
    if (!mie) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }
    else {
        mouse.x = event.clientX + document.body.scrollLeft;
        mouse.y = event.clientY + document.body.scrollTop;
    }
    return true;
};
window.mouse = {
    x : 0,
    y : 0
}
window.addEventListener("click", function(){
    if (mouse.x > 300 && sidebar.style.width == "300px") {
        sidebar.style.width = "0px";
    }
});


$(document).ready(function() {
    document.getElementById('btn-menu').addEventListener("click", function(){
        if (document.getElementById('sidebar').style.width == "0px") {
            document.getElementById('sidebar').style.width = "300px";
            document.getElementById('sidebar').style.opacity = "1";
        }
        else if (document.getElementById('sidebar').style.width == "300px") {
            document.getElementById('sidebar').style.width = "0px";
            document.getElementById('sidebar').style.opacity = "0";
        }
    });

    kanvas = document.getElementById('canvas')
    kanvas.width = window.innerWidth;
    kanvas.height = window.innerHeight - 41;

    window.addEventListener('resize', function(event){
        kanvas.width = window.innerWidth;
        kanvas.height = window.innerHeight - 41;
        gameWheel.centerX = window.innerWidth / 2;
        gameWheel.draw();
    });

    $("#dialog-winner").dialog({
        autoOpen: false,
    });
    $("#dialog-error").dialog({
        autoOpen: false,
    })
    getBrowserInfo()
    document.getElementById('browser-type').innerText = browserType;
    document.getElementById('browser-version').innerText = browserVersion;
    if (browserType == "Firefox" || browserType == "firefox") {
        document.getElementById('browser-info').innerText = "The game should work with firefox however thay may be errors."
    }
    else if (browserType == "Chrome" || browserType == "chrome") {
        document.getElementById('browser-info').innerText = "Fantastic this browser will give you good preformance."
    }
});

function toggleContent(button, contentId, size) {
    let content = document.getElementById(contentId);
    if (button.innerText == "+") {
        button.innerText = "-";
        content.style.height = size;
    }
    else if (button.innerText == "-") {
        button.innerText = "+";
        content.style.height = "0px";
    }
}

function resizeCanvas() {
    kanvas.width = window.innerWidth;
    kanvas.height = window.innerHeight - 41;
    document.getElementById('game-pin').style.left = "50%"
    gameWheel.draw();
}

$(function() {
    $( "#slider-vertical-zoom" ).slider({
        orientation: "vertical",
        range: "min",
        min: 800,
        max: 10000,
        value: 900,
        step: 10,
        slide: function( event, ui ) {
            gameWheel.outerRadius = ui.value;
            gameWheel.centerY = ((( (-1 * heightPercent) * window.innerHeight) / 100) + window.innerHeight + gameWheel.outerRadius);
            gameWheel.draw();
        }
    });
});

$(function() {
    $( "#slider-vertical-pin" ).slider({
        orientation: "vertical",
        range: "min",
        min: 10,
        max: 95,
        animate: true,
        value: 50,
        slide: function( event, ui ) {
            document.getElementById('game-pin').style.top = ((( (-1 *ui.value) * window.innerHeight) / 100) + (window.innerHeight - 7)) + "px";
        }
    });
});

$(function() {
    $( "#slider-vertical-height" ).slider({
        orientation: "vertical",
        range: "min",
        min: 5,
        max: 95,
        animate: true,
        value: 50,
        slide: function( event, ui ) {
            heightPercent = ui.value;
            gameWheel.centerY = ((( (-1 *ui.value) * window.innerHeight) / 100) + window.innerHeight + gameWheel.outerRadius);
            gameWheel.draw();
        }
    });
});

window.csvData = new Array();
window.fullCSVlengh = 0;
window.entries = 0;
window.blank = 0;

function parseCSV() {
    document.getElementById('load').style.display = "inline-block";
    setTimeout(function(){ 
        $('#csv').parse({
            config: {
                delimiter: "",
                newline: "",
                quoteChar: '"',
                header: false,
                dynamicTyping: false,
                preview: 0,
                encoding: "",
                worker: false,
                comments: false,
                step: function(results, parser) {
                  let row = results.data[0];
                  if (row.length == 2) {
                    fullCSVlengh += 1
                    if (row[1] != "BLANK") {
                        entries += 1
                        csvData.push(row)
                    }
                  }
                },
                complete:   function() {
                    blank = fullCSVlengh - entries
                    document.getElementById('load').style.display = "none"
                    document.getElementById('pass').style.display = "inline-block"
                    document.getElementById('entries').innerText = entries
                    document.getElementById('blanks').innerText = blank
                    document.getElementById('total').innerText = fullCSVlengh
                },
                download: false,
                skipEmptyLines: false,
                chunk: undefined,
                fastMode: undefined,
                beforeFirstChunk: undefined,
                withCredentials: undefined
            },
            error: function(err, file, inputElem, reason) {
                document.getElementById('error-code').innerText = err;
                document.getElementById('error-detail').innerText = reason
                document.getElementById('load').style.display = "none"
                document.getElementById('fail').style.display = "inline-block"
                $("#dialog-error").dialog("open");
            },
        });
    },50);
}

function getBrowserInfo()
{
    var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1]))
    {
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome')
    {
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) 
        M.splice(1, 1, tem[1]);
    window.browserType = M[0]
    window.browserVersion = M[1]
}

function setColor(element) {
    let oldValue = element.getAttribute("data-previous-value")
    if (element.value == "#000000") {
        removeValue(colors, oldValue)
    }
    else {
        colors.push(element.value)
    }
    element.setAttribute("data-previous-value", element.value)
}

function removeValue(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}