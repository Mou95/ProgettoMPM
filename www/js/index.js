document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady( event ) {
    console.log('Received Event:'+ event );
    var login = document.getElementById('login');
    var user = firebase.auth().currentUser;
    if (user) {
        //logged in
        navigator.notification.alert("logged", function(){})
        console.log('user logged');
        window.open('home.html', "_self"); 
        
    } else {
        //logged out
        login.style.display = "block";
    }
    
    if (device.platform == "Android") {
        StatusBar.overlaysWebView(false);
        StatusBar.styleLightContent();
    }
}


