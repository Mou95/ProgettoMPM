$.mobile.autoInitializePage = false;
function onLoad() {
    firebase.auth().onAuthStateChanged(function(user) {
        console.log("check user")
        if (user) {
            
            createStandings()
            loadUser()
            createVariable()
            createCalendar()
            // User is signed in.
            console.log(user)
            console.log(device.platform)
            //navigator.notification.alert(device.platform, function(){})
            
            if(window.MobileAccessibility) {
                window.MobileAccessibility.usePreferredTextZoom(false);
            }
            
            if (device.platform != "iOS") {
                StatusBar.styleBlackTranslucent();
                document.documentElement.style.setProperty('--bottom', '0px');
                document.documentElement.style.setProperty('--top', '90px');
                document.getElementById("navMenu").classList.add("menuBarAndroid")
                console.log("Android")

            } else {
                document.documentElement.style.setProperty('--bottom', '50px');
                document.documentElement.style.setProperty('--top', '40px');
                document.getElementById("navMenu").classList.add("menuBarIos")
                console.log("Not Android")
            }
        } else {
            //user is signed out
            window.open("index.html", "_self")
        }
    });
}



