var access = document.getElementsByClassName('formButton')[0]
var errore = document.getElementsByClassName('errori')[0]
access.addEventListener('touchend', function() {
        //Take value from form
        var email =document.getElementById("email").value;
        var psw = document.getElementById("psw").value;

        //Manage and control password
        firebase.auth().signInWithEmailAndPassword(email, psw).then(function() {
            console.log("Chiamata a firebase con successo")
            window.open("home.html", "_self")
        }).catch(function(error) {
            //Handle errors
            errore.innerHTML = "L'email o la password inseriti non sono corretti"
        });
    }, false);
