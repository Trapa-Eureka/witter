import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB83-dHoTld0CVXd8a2xk0A2HIpJMMi-1A",
    authDomain: "witter-a2b5a.firebaseapp.com",
    projectId: "witter-a2b5a",
    storageBucket: "witter-a2b5a.appspot.com",
    messagingSenderId: "539750756356",
    appId: "1:539750756356:web:015ed3d89f0f0db9c14551"
};

export default firebase.initializeApp(firebaseConfig);