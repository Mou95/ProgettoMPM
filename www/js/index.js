function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    console.log("createlistenter")
}

function onDeviceReady() {
    console.log('Received Event:');

    var login = document.getElementById('login');
    var user = firebase.auth().currentUser;
    console.log(user)
    if (user) {
        //logged in
        console.log('user logged');
        window.open('home.html');
    } else {
        //logged out
        login.style.display = "block";
    }
    //console.log("plat"+device.platform)
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
