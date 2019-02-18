var access = document.getElementsByClassName('formButton')[0]
var accedi = document.getElementById("email")
$.mobile.autoInitializePage = false;

access.addEventListener('touchend', function(e) {
    e.preventDefault()
    //Take value from form
    var email =document.getElementById("email").value;
    var psw = document.getElementById("psw").value;

    //Manage and control password
    firebase.auth().signInWithEmailAndPassword(email, psw).then(function() {
        console.log("Chiamata a firebase con successo")
        window.open("home.html", "_self")
    }).catch(function(error) {
        //Handle errors
        navigator.notification.alert("Email o Password errate", function(){}, "Attenzione")
    });
}, false);