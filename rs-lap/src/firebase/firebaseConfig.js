import { firebase } from '@firebase/app';
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyBviMPpTk73p83yhE6hW7swWQ7YZNOYGC8",
    authDomain: "find-your-coach-d614f.firebaseapp.com",
    databaseURL: "https://find-your-coach-d614f-default-rtdb.firebaseio.com",
    projectId: "find-your-coach-d614f",
    storageBucket: "find-your-coach-d614f.appspot.com",
    messagingSenderId: "198971150193",
    appId: "1:198971150193:web:b26280d2ea767c1065f0d0"
}

firebase.initializeApp(firebaseConfig)

export default firebase.database()
