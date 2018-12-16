import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Custom Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
    apiKey: "AIzaSyCJ57HvPuG3C-PdAkL7UjmMYJtxBQSwQoY",
    authDomain: "client-account-manager.firebaseapp.com",
    databaseURL: "https://client-account-manager.firebaseio.com",
    projectId: "client-account-manager",
    storageBucket: "client-account-manager.appspot.com",
    messagingSenderId: "589938223588"
};

// react-redux-firebase-config
const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    notify: notifyReducer,
    settings: settingsReducer
});

// Check for settings in local storage
if (localStorage.getItem("settings") === null) {
    // Default settings
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: true
    };

    // Set to local storage
    localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// Create store with reducers and initial state
const initialState = {
    settings: JSON.parse(localStorage.getItem("settings"))
};

const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase)
        // window.__REDUX_DEVTOOLS_EXTENSION__ &&
        //     window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// const devTools =
//     process.env.NODE_ENV === "development"
//         ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//           window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//         : null;

export default store;
