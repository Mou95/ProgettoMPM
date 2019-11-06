
$.mobile.autoInitializePage = false;

var back = document.getElementsByClassName("backButtonMenu")[0]

back.addEventListener("click", function() {
    window.open("index.html", "_self")
})

var regist = document.getElementsByClassName('formButton')[0]
regist.addEventListener('click', function(e) {
        e.preventDefault();
    
        regist.disabled = true;

        //Take value from form
        var email = document.getElementById("email").value;
		email = email.replace(/\s/g, '');
        let psw = document.getElementById("psw").value;
        let r_psw = document.getElementById("psw-repeat").value;

        //Manage and control password
        if (psw != r_psw) {
            console.log("ERRORE")
            navigator.notification.alert("Le due password inserite non coincidono", function(){
                regist.disabled = false;
            }, "Attenzione")
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, psw)
            .then(function() {
                
                firebase.auth().signInWithEmailAndPassword(email, psw).then(function(user) {
                    
                    navigator.notification.alert("L'utente è stato creato con successo", function(){
                        regist.disabled = false;
                        firebase.auth().onAuthStateChanged(function(user) {
                            if (user) {
                            // User is signed in.
                                user.updateProfile({
                                    displayName: document.getElementById("username").value
                                }).then(function() {
                                    window.open("home.html", "_self")
                                  // Update successful.
                                }).catch(function(error) {
                                    console.log("Errore aggiornamento username")
                                });
                            }
                        });
                    }, "Conferma")
                    
                }).catch(function(error) {
                    //Handle errors
                    
                });
                
                
                
                
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                switch (errorCode) {
                    case "auth/email-already-in-use":
                        navigator.notification.alert("Questa mail è già associata ad un utente", function(){
                            regist.disabled = false;
                        }, "Attenzione")
                        break;
                    case "auth/invalid-email":
                        navigator.notification.alert("L'email inserita non esiste", function(){
                            regist.disabled = false;
                        }, "Attenzione")
                        break;
                    case "auth/weak-password":
                        navigator.notification.alert("La password deve contenere almeno 6 caratteri", function(){
                            regist.disabled = false;
                        }, "Attenzione")
                        break;
                }
            });
        }
    }, false);

