$.mobile.autoInitializePage = false;
function onLoad() {
    firebase.auth().onAuthStateChanged(function(user) {
        console.log("check user")
        if (user) {
            // User is signed in.
            console.log(user)
            console.log(device.platform)
            //navigator.notification.alert(device.platform, function(){})
            if (device.platform == "Android") {

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
            //createStandings()
            //loadUser()
            //createVariable()
            createCalendar()
        } else {
            //user is signed out
            window.open("index.html", "_self")
        }
    });
}

/*function loadClassifiche() {
    document.getElementById("home").style.display = "none";
    document.getElementById("classifiche").style.display = "block";
    
}*/


