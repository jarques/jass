$(document).ready(function() {
    dropbox = document.getElementById("body-box")

    // init event handlers
    dropbox.addEventListener("dragenter", dragEnter, false);
    dropbox.addEventListener("dragexit", dragExit, false);
    dropbox.addEventListener("dragover", dragOver, false);
    dropbox.addEventListener("drop", drop, false);

    // init the widgets
    $("#progressbar").progressbar();
});
function dragEnter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}
function dragExit(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}
function dragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}
function drop(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    var count = files.length;

    // Only call the handler if 1 or more files was dropped.
    if (count > 0)
    handleFiles(files);
}
function handleFiles(files) {
    var file = files[0];
    var extension = file.name.substring(file.name.length - 5);
    if (file.type == "text/css" || extension == '.scss') {
        $('#bad_upload').hide();
        $('#stats').html('');

        document.getElementById("droplabel").innerHTML = "Processing " + file.name;
        document.title = "jass - " + file.name;

        var size = file.size / 1000;
        var size_class = '';
        if (size > 288) {
            size_class = 'warning';
            $('#problems ul').append("<li>IE has an unofficial file size limit of 288kb. Minifying and gzipping may help.</li>");
            $('.problems').show();
        }
        $('#stats').append("<span class='pill " + size_class + "'>Size: <strong>" + Math.round(size * Math.pow(10, 2)) / Math.pow(10, 2) + "kb</strong></span>");
        
        var last_modified = file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a';
        
        var reader = new FileReader();

        // init the reader event handlers
        reader.onprogress = handleReaderProgress;
        reader.onloadend = handleReaderLoadEnd;

        reader.onload = function(e) {
            var text = e.target.result;
            jass.read(text, false);
        }
        reader.readAsText(file);
    } else {
        $('#bad_upload').show();
    }
}
function handleReaderProgress(evt) {
    if (evt.lengthComputable) {
        var loaded = (evt.loaded / evt.total);
        $("#progressbar").progressbar({
            value: loaded * 100
        });
    }
}
function handleReaderLoadEnd(evt) {
    $("#progressbar").progressbar({
        value: 100
    });
    document.getElementById("droplabel").innerHTML = 'Drop file here...';
}