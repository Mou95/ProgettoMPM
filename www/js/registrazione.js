var regist = document.getElementsByClassName('formButton')[0]
regist.addEventListener('touchend', function(e) {
        e.preventDefault();
        //Take value from form
        let email = document.getElementById("email").value;
        let psw = document.getElementById("psw").value;
        let r_psw = document.getElementById("psw-repeat").value;

        //Manage and control password
        if (psw != r_psw) {
            console.log("ERRORE")
            navigator.notification.alert("Le due password inserite non coincidono", function(){}, "Attenzione")
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, psw)
            .then(function() {
                
                window.open("index.html", "_self")
                
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                switch (errorCode) {
                    case "auth/email-already-in-use":
                        navigator.notification.alert("Questa mail è già associata ad un utente", function(){}, "Attenzione")
                        break;
                    case "auth/invalid-email":
                        navigator.notification.alert("L'email inserita non esiste", function(){}, "Attenzione")
                        break;
                    case "auth/weak-password":
                        navigator.notification.alert("La password deve contenere almeno 6 caratteri", function(){}, "Attenzione")
                        break;
                }
            });
        }
    }, false);
