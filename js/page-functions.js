
window.kanvas = null

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
    kanvas = document.getElementById('kanvas')
    kanvas.width = window.innerWidth;
    kanvas.height = window.innerHeight - 41;

    window.addEventListener('resize', function(event){
        kanvas.width = window.innerWidth;
        kanvas.height = window.innerHeight - 41;
    });
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
}

$(function() {
    $( "#slider-vertical-zoom" ).slider({
        orientation: "vertical",
        range: "min",
        min: 800,
        max: 4000,
        value: 2000,
        slide: function( event, ui ) {
            $( "#amount" ).val( ui.value );
        }
    });
});

$(function() {
    $( "#slider-vertical-height, #slider-vertical-pin" ).slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        animate: true,
        value: 50,
        slide: function( event, ui ) {
            $( "#amount" ).val( ui.value );
        }
    });
});

window.csvData = null;


function parseCSV() {
    document.getElementById('load').style.display = "inline-block";
    setTimeout(function(){ 
        $('#csv').parse({
            config: {
                delimiter: "",  // auto-detect
                newline: "",    // auto-detect
                quoteChar: '"',
                header: false,
                dynamicTyping: false,
                preview: 0,
                encoding: "",
                worker: false,
                comments: false,
                step: undefined,
                complete:   function(results, file) {
                                console.log("Parsing complete:", results.data);
                                csvData = results.data;
                                document.getElementById('load').style.display = "none"
                                document.getElementById('pass').style.display = "inline-block"
                            },
                error: undefined,
                download: false,
                skipEmptyLines: false,
                chunk: undefined,
                fastMode: undefined,
                beforeFirstChunk: undefined,
                withCredentials: undefined
            },
            error: function(err, file, inputElem, reason) {
                console.log("The Error: " + err)
                console.log("The Reason: " + reason)
                document.getElementById('load').style.display = "none"
                document.getElementById('fail').style.display = "inline-block"
            },
        });
    },50);
}