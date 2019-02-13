$.mobile.autoInitializePage = false;
function onLoad() {
    firebase.auth().onAuthStateChanged(function(user) {
        console.log("check user")
        //if (user) {
            // User is signed in.
            console.log(user)
            createStandings()
            loadUser()
            createVariable()
        /*} else {
            //user is signed out
            window.open("index.html", "_self")
        }*/
    });
}

function loadClassifiche() {
    document.getElementById("home").style.display = "none";
    document.getElementById("classifiche").style.display = "block";
    
}