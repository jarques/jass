$(document).ready(function(){var dropbox=document.getElementById("dropbox")
dropbox.addEventListener("dragenter",dragEnter,false);dropbox.addEventListener("dragexit",dragExit,false);dropbox.addEventListener("dragover",dragOver,false);dropbox.addEventListener("drop",drop,false);$("#progressbar").progressbar();});function dragEnter(evt){evt.stopPropagation();evt.preventDefault();}
function dragExit(evt){evt.stopPropagation();evt.preventDefault();}
function dragOver(evt){evt.stopPropagation();evt.preventDefault();}
function drop(evt){evt.stopPropagation();evt.preventDefault();var files=evt.dataTransfer.files;var count=files.length;if(count>0)
handleFiles(files);}
function handleFiles(files){var file=files[0];if(file.type=="text/css"){$('#stats').html('');document.getElementById("droplabel").innerHTML="Processing "+file.name;var size=file.size/1000;$('#stats').append("<span class='pill'>Size: <strong>"+Math.round(size*Math.pow(10,2))/Math.pow(10,2)+"kb</strong></span>");var reader=new FileReader();reader.onprogress=handleReaderProgress;reader.onloadend=handleReaderLoadEnd;reader.onload=function(e){var text=e.target.result;jass.read(text,false);}
reader.readAsText(file);}else{alert("Only CSS files allowed.");}}
function handleReaderProgress(evt){if(evt.lengthComputable){var loaded=(evt.loaded/evt.total);$("#progressbar").progressbar({value:loaded*100});}}
function handleReaderLoadEnd(evt){$("#progressbar").progressbar({value:100});$('#content_jass').fadeIn();document.getElementById("droplabel").innerHTML='Drop file here...';}
