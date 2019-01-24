firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        
    } else {
        //user is signed out
        window.open("index.html")
    }
});
