function onLoad() {
    firebase.auth().onAuthStateChanged(function(user) {
        console.log("check user")
        if (user) {
            // User is signed in.
            console.log(user)
        } else {
            //user is signed out
            window.open("index.html", "_self")
        }
    });
}
