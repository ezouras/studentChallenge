$(document).ready(function(){

    let url = document.location.href;
    let yearObj=jQuery.deparam(decodeURIComponent(url.split('?')[1]));
    console.log(yearObj);


});
