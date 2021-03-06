document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady( event ) {
    
    if(window.MobileAccessibility) {
       window.MobileAccessibility.usePreferredTextZoom(false);
    }
    if (device.platform != "iOS") {
        StatusBar.overlaysWebView(false);
        StatusBar.styleLightContent();
    }
    console.log('Received Event:'+ event );

    var login = document.getElementById('login');
    var user = firebase.auth().currentUser;

    //logged out
    if (window.localStorage.getItem("email") != null) {
        var email = window.localStorage.getItem("email");
        var psw = window.localStorage.getItem("psw");

        firebase.auth().signInWithEmailAndPassword(email, psw)
        .then(function() {
            console.log("Chiamata a firebase con successo")
            window.open("home.html", "_self")
        }).catch(function(error) {
            //Handle errors
            login.style.display = "block";
        });

    } else {
        login.style.display = "block";
    } 
}

