document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady( event ) {
    
    if(window.MobileAccessibility) {
       window.MobileAccessibility.usePreferredTextZoom(false);
    }
    console.log('Received Event:'+ event );
    
    var login = document.getElementById('login');
    var user = firebase.auth().currentUser;
    if (user) {
        
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


