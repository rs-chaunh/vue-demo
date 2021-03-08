import firebase from "firebase/app";
import "firebase";
// import * as firebase_API from '../src/env'

const firebaeConfig = {
    apiKey: `${process.env.VUE_APP_API_KEY}`,
    authDomain: `${process.env.VUE_APP_API_DOMAIN}`,
    databaseURL: `${process.env.VUE_APP_API_DATA_JSON}`,
    projectId: `${process.env.VUE_APP_PROJECT_ID}`,
    storageBucket: `${process.env.VUE_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.VUE_APP_MESS_ID_SENDER}`,
    appId: `${process.env.VUE_APP_API_ID}`,
    measurementId: `${process.env.VUE_APP_MEAS_ID}`,
};

firebase.initializeApp(firebaeConfig)

export default firebase;