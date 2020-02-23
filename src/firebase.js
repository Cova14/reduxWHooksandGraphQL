import firebase from 'firebase/app'
import 'firebase/auth'

let firebaseConfig = {
  apiKey: "AIzaSyBv08Kh13lOjNIZJ43HbWv90F5T99pThA0",
  authDomain: "reduxwgraphql.firebaseapp.com",
  databaseURL: "https://reduxwgraphql.firebaseio.com",
  projectId: "reduxwgraphql",
  storageBucket: "reduxwgraphql.appspot.com",
  messagingSenderId: "476895094868",
  appId: "1:476895094868:web:c7c1b4dfda3d256e06e5c1",
  measurementId: "G-704K8MFZGN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export function loginWithGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(provider)
    .then(snap => snap.user)
}