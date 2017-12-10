let kanvas = null
$(document).ready(function() {
    console.log("doc ready")
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