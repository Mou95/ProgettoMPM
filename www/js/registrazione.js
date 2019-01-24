var regist = document.getElementsByClassName('formButton')[0]
var errore = document.getElementsByClassName('errori')[0]
regist.addEventListener('touchend', function() {
        //Take value from form
        let email = document.getElementById("email").value;
        let psw = document.getElementById("psw").value;
        let r_psw = document.getElementById("psw-repeat").value;

        //Manage and control password
        if (psw != r_psw) {
            console.log("ERRORE")
            errore.innerHTML = "ATTENZIONE: Le due password inserite non coincidono"
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, psw).then(function() {
                console.log("Chiamata a firebase con successo")
                window.open("index.html", "_self")
            }).catch(function(error) {
                console.log("Chiamata a firebase")
                // Handle Errors here.
                var errorCode = error.code;
                switch (errorCode) {
                    case "auth/email-already-in-use":
                        errore.innerHTML = "ATTENZIONE: Questa mail è già associata ad un utente"
                        break;
                    case "auth/invalid-email":
                        errore.innerHTML = "ATTENZIONE: L'email inserita non esiste"
                        break;
                    case "auth/weak-password":
                        errore.innerHTML = "ATTENZIONE: La password deve contenere almeno 6 caratteri"
                        break;
                }
            });
        }
    }, false);
