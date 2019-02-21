$.mobile.autoInitializePage = false;
    
/*document.addEventListener("offline", function() {
    navigator.notification.alert("Alcune funzionalità potrebbero essere non utilizzabili", function(){
        window.open("error.html", "_self")
    }, "SEI OFFLINE!")
})*/

/*document.addEventListener("online", function() {
    navigator.notification.alert("ONLINE", loadAll, "ONLINE!")
})*/

function onLoad() {
    firebase.auth().onAuthStateChanged(function(user) {
        console.log("check user")
        if (user) {
            
            var $content = $('#homeContent');

            var height = $(window).height() - 90;
            $content.height(height);
            
            createStandings()
            loadUser()
            createStats()
            createCalendar()
            // User is signed in.
            console.log(user)
            console.log(device.platform)
            
            document.addEventListener("backbutton", returnIndex, false)
            
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





