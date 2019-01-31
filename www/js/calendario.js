var active = 0;
var giornate = document.getElementsByClassName("giornataIntera")
var n = giornate.length;

//apply overrides here
$.mobile.autoInitializePage = false;

function loadTable() {
    console.log("dfs");
    giornate[active].classList.add("show");
    $( ".giornataIntera" ).on( "swiperight", swipeRight );
    $( ".giornataIntera" ).on( "swipeleft", swipeLeft );
}

function swipeRight( event ){
    if (active > 0) {
        console.log("swiped");
        giornate[active].classList.remove("show");
        active -= 1;
        giornate[active].classList.add("show");
    }
}

function swipeLeft( event ){
    if (active < n - 1) {
        console.log("swiped");
        giornate[active].classList.remove("show");
        active += 1;
        giornate[active].classList.add("show");
    }
}