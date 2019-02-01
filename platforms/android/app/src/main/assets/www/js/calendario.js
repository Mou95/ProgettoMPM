var active = 0;
var giornate = document.getElementsByClassName("giornataIntera")
var n_giornate = document.getElementsByClassName("NumeroGiornata")
var n = giornate.length;

//apply overrides here
$.mobile.autoInitializePage = false;

function loadTable() {
    console.log("dfs");
    giornate[active].classList.add("show");
    $( ".giornataIntera" ).on( "swiperight", swipeRight );
    $( ".giornataIntera" ).on( "swipeleft", swipeLeft );
    $( ".NumeroGiornata" ).on( "tap", selectTable );
}

function swipeRight( event ){
    if (active > 0) {
        console.log("swiped");
        giornate[active].classList.remove("show");
        n_giornate[active].classList.remove("selected");
        active -= 1;
        giornate[active].classList.add("show");
        n_giornate[active].classList.add("selected");
    }
}

function swipeLeft( event ){
    if (active < n - 1) {
        console.log("swiped");
        giornate[active].classList.remove("show");
        n_giornate[active].classList.remove("selected");
        active += 1;
        giornate[active].classList.add("show");
        n_giornate[active].classList.add("selected");
    }
}

function selectTable( event ) {
    var new_active = Array.prototype.indexOf.call(n_giornate, event.target);
    
    if (new_active != active) {
        giornate[active].classList.remove("show");
        n_giornate[active].classList.remove("selected");
        active = new_active;
        giornate[active].classList.add("show");
        n_giornate[active].classList.add("selected");
    } 
}



