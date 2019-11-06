
var access = document.getElementsByClassName('formButton')[0]
var accedi = document.getElementById("email")
var forgot = document.getElementsByClassName('forgotButton')[0]

$.mobile.autoInitializePage = false;

var backLogin = document.getElementsByClassName("backButtonMenu")[0]

backLogin.addEventListener("click", function() {
    window.open("index.html", "_self")
})

access.addEventListener('click', function(e) {
    e.preventDefault()
    //Take value from form
    var email = document.getElementById("email").value;
	email = email.replace(/\s/g, '');
    var psw = document.getElementById("psw").value;
    var saveCredential = document.getElementById("keepLogin").checked;

    //Manage and control password
    if (saveCredential) {
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("psw", psw);
    }
    
    firebase.auth().signInWithEmailAndPassword(email, psw).then(function() {
        console.log("Chiamata a firebase con successo")
        window.open("home.html", "_self")
    }).catch(function(error) {
        //Handle errors
        navigator.notification.alert("Email o Password errate", function(){}, "Attenzione")
    });
}, false);

forgot.addEventListener('click', function(e) {
    //Take value from form
    var email = document.getElementById("email").value;
	email = email.replace(/\s/g, '');
    
    if (email != "") {
        firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
            
            navigator.notification.alert("Email inviata, controlla la tua posta", function(){}, "Conferma")
        }).catch(function(error) {
            //Handle errors
            var errorCode = error.code;
            switch (errorCode) {
                case "auth/invalid-email":
                    navigator.notification.alert("L'email inserita non esiste", function(){}, "Attenzione")
                    break;
                case "auth/user-not-found":
                    navigator.notification.alert("Non esiste nessun utente con questa mail", function(){}, "Attenzione")
                    break;
            }
        });
    } else {
        navigator.notification.alert("Inserisci la mail dell'account di cui vuoi resettare la password", function(){}, "Attenzione")
    }
}, false);
