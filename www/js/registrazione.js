var regist = document.getElementByClassName('registerButton')
regist.addEventListener('touchend', function() {
        //Take value from form
        let email = document.getElementById("email").value;
        let psw = document.getElementById("psw").value;
        let r_psw = document.getElementById("psw-repeat").value;

        //Manage and control password
        if (psw != r_psw) {
            //gestire password sbagliata
            alert("Password errata")
            console.log("ERRORE")
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, psw).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/weak-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
            });
            window.open("index.html", "_self");
        }


    }, false);
