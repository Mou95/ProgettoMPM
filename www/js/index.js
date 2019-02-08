document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady( event ) {
    console.log('Received Event:'+ event );
    setCSSPlatform()
    var login = document.getElementById('login');
    var user = firebase.auth().currentUser;
    console.log(user)
    if (user) {
        //logged in
        console.log('user logged');
        window.open('home.html', "_self");
        
        
        
    } else {
        //logged out
        login.style.display = "block";
    }
    //console.log("plat"+device.platform)
}

function setCSSPlatform() {
    console.log(device.platform)
    navigator.notification.alert(device.platform, function(){})
    if (device.platform == "Android") {
    
        document.documentElement.style.setProperty('--bottom', '0px');
        document.documentElement.style.setProperty('--top', '100px');
        console.log("Android")
        
    } else {
        console.log("Not Android")
    }
}

/*Login page*/
/*var login = document.getElementById('accedi')
login.addEventListener('touchend', function() {
        console.log("Premuto accedi")
        window.open("home.html", "_self");
    }, false);

var register = document.getElementById('registrati')
register.addEventListener('touchend', function() {
        console.log("Premuto accedi")
        window.open("registrazione.html", "_self");
    }, false);*/
